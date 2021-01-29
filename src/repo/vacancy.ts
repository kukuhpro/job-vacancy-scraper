import { chromium } from 'playwright'

import { BufferApp, ScraperContract } from './scraper'

class Vacancy {
    private _bufferAppScraper: ScraperContract

    public get bufferAppScraper(): ScraperContract {
        return this._bufferAppScraper
    }

    public set bufferAppScraper(value: ScraperContract) {
        this._bufferAppScraper = value
    }

    constructor(scraper?: ScraperContract) {
        if (scraper) {
            this._bufferAppScraper = scraper
        } else {
            BufferApp.build(chromium, "https://journey.buffer.com")
                .then(val => {
                    this._bufferAppScraper = val
                })
        }
    }

    public async getList(): Promise<Array<string>> {
        if (!this._bufferAppScraper) {
            this._bufferAppScraper = await BufferApp.build(chromium, "https://journey.buffer.com")
        }
        let vacancies: Array<string> = await this._bufferAppScraper.getVacancy()
        await this._bufferAppScraper.closeConnection()
        return new Promise((resolve) => {
            resolve(vacancies)
        })
    }

    public close() {
        this._bufferAppScraper.closeConnection()
    }
}

export default Vacancy