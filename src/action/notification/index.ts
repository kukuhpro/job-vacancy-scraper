import Cli from './cli'

interface Notification {
    send(val: string)
}

export async function SendNotif(vacancies: string[]): Promise<void> {
    return new Promise((res) => {
        let listNotification: Array<Notification> = [
            new Cli
        ]
        let text: string = vacancies.join(" and ")
        listNotification.forEach((v) => {
            v.send(text)
        })
        res()
    })
}



