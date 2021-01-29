import gv from './gather_vacancy'

export interface ActionContract {
    handle(request?: any): Promise<any>
}

export const GatherVacancy: ActionContract = new gv()
