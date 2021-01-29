import Vacancy from "./vacancy"

export const vacancy: VacancyContract = new Vacancy()

export interface VacancyContract {
    getList(): Promise<Array<string>>
}