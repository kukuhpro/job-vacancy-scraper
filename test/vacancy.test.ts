import { createMock } from 'ts-auto-mock'
import { On, method } from 'ts-auto-mock/extension'
import faker from 'faker'


import { ScraperContract } from '../src/repo/scraper'
import Vacancy from '../src/repo/vacancy'

const scraperMock: ScraperContract = createMock<ScraperContract>()

test("setter getter should work properly", () => {
    const vcn: Vacancy = new Vacancy()
    vcn.bufferAppScraper = scraperMock

    expect(vcn.bufferAppScraper).toEqual(scraperMock)
})


test('Should get list from vacancy', () => {
    const vacancyGetListMethod: jest.Mock<Promise<string[]>> = On(scraperMock).get(method(mock => mock.getVacancy))
    const expectedResult: Array<string> = [
        faker.name.jobTitle(),
        faker.name.jobTitle(),
        faker.name.jobTitle()
    ]
    const rsPromise: Promise<string[]> = new Promise((resolve) => {
        resolve(expectedResult)
    })
    vacancyGetListMethod.mockReturnValue(rsPromise)
    const vcn: Vacancy = new Vacancy(scraperMock)
    vcn.getList()
        .then((actualResult) => {
            expect(vacancyGetListMethod).toHaveBeenCalled()
            expect(actualResult).toEqual(expectedResult)
        })
        .catch(err => {
            throw err
        })
})