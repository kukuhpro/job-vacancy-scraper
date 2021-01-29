import { GatherVacancyRequest } from '../entity/gather_vacancy'
import { vacancy, VacancyContract } from '../repo'
import { SendNotif } from './notification'

export default class GatherVacancy {
    private _vacancyRepo: VacancyContract
    constructor() {
        this._vacancyRepo = vacancy
    }

    async handle(request?: any): Promise<any> {
        let gatherVacancyRequest: GatherVacancyRequest = request
        const vacancies: string[] = await this._vacancyRepo.getList()
        vacancies.find((v => {
            return v.includes(gatherVacancyRequest.keyword)
        }))
        await SendNotif(vacancies)
        return Promise.resolve(1)
    }
}

