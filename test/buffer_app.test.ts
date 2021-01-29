import { createMock } from 'ts-auto-mock'
import { On, method } from 'ts-auto-mock/extension'
import faker from 'faker'

import { BrowserType, Browser, BrowserContext, Page } from 'playwright'
import cheerio from 'cheerio'
import BufferApp from '../src/repo/scraper/buffer_app'
import { create } from 'ts-node'

const urlFack: string = faker.internet.url()

test("Build function should work fine", () => {
    const browserTypeMock: BrowserType<Browser> = createMock<BrowserType<Browser>>()
    const browserLaunchMethod: jest.Mock = On(browserTypeMock).get(method(mock => mock.launch))
    BufferApp.build(browserTypeMock, urlFack)
    expect(browserLaunchMethod).toHaveBeenCalled()
})

test("getVacancy function should work fine", async () => {
    const pageMock: Page = createMock<Page>()
    const cheerioMock: cheerio.CheerioAPI = createMock<cheerio.CheerioAPI>()
    const bfa: BufferApp = new BufferApp(pageMock, urlFack)
    bfa.cheerio = cheerioMock


    const pageGotoMethod: jest.Mock = On(pageMock).get(method(mock => mock.goto))
    const page$Method: jest.Mock = On(pageMock).get(method(mock => mock.$))
    const cheerioLoadMethod: jest.Mock = On(cheerioMock).get(method(mock => mock.load))

    await bfa.getVacancy()

    expect(pageGotoMethod).toHaveBeenCalled()
    expect(cheerioLoadMethod).toHaveBeenCalled()
    expect(page$Method).toHaveBeenCalled()
})