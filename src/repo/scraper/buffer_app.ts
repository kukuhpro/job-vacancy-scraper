import { BrowserType, Browser, BrowserContext, Page } from 'playwright'
import cheerio from 'cheerio'

class BufferApp {
    public page: Page
    public url: string
    public cheerio: cheerio.CheerioAPI
    private _browser: Browser
    public constructor(browser: Browser, page: Page, url: string) {
        this.page = page
        this.url = url
        this.cheerio = cheerio
        this._browser = browser
    }

    public static async build(chromium: BrowserType<Browser>, url: string): Promise<BufferApp> {
        const browser: Browser = await chromium.launch()
        const context: BrowserContext = await browser.newContext()
        const page: Page = await context.newPage()
        return Promise.resolve(new BufferApp(browser, page, url))
    }

    public async closeConnection(): Promise<void> {
        await this._browser.close()
    }

    public async getVacancy(): Promise<Array<string>> {
        const page: Page = this.page
        await page.goto(this.url)
        const handleVacansies = await page.$('#vacancies')
        const innerHtml = await handleVacansies.innerHTML()
        const $ = this.cheerio.load(innerHtml)
        const aHrefElements = $("div[data-job-list-items]").find("a")
        let result: Array<string> = []
        aHrefElements.each((i, item) => {
            const txtVal = $(item).find("p").html().trim()
            result.push(txtVal)
        })
        return new Promise((resolve) => {
            resolve(result)
        })
    }

}

export default BufferApp