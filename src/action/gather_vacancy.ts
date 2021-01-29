import { GatherVacancyRequest } from '../entity/gather_vacancy'
import { vacancy, VacancyContract } from '../repo'
import { SendNotif } from './notification'

export default class GatherVacancy {
    private _vacancyRepo: VacancyContract
    constructor() {
        this._vacancyRepo = vacancy
    }

    /**
     * Every class on action must have this function
     * because this function will get called from transport to trigger
     * @param request: any entity object
     * @returns Promise<any>
     */
    async handle(request?: any): Promise<any> {
        // we mapping into our entity interface based on action request
        let gatherVacancyRequest: GatherVacancyRequest = request
        const vacancies: string[] = await this._vacancyRepo.getList()
        vacancies.find((v => {
            return v.includes(gatherVacancyRequest.keyword)
        }))
        await SendNotif(vacancies)
        return Promise.resolve(1)
    }
}

