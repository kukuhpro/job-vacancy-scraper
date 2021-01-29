import { GatherVacancy } from '../../action'

export default async function run(): Promise<any> {
    let request: object = {
        keyword: "engineer"
    }
    GatherVacancy.handle(request)
    return Promise.resolve(1)
}