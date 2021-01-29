import BufferApp from './buffer_app'

export interface ScraperContract {
    getVacancy(): Promise<Array<string>>
    closeConnection(): Promise<void>
}

export {
    BufferApp
}