import CommandLineRun from './transport/cli'


/**
 * This function is to called all transport, 
 * if there is any new transport like http, grpc, cron, etc
 * put the trigger in here
 */
async function main(): Promise<void> {
    await CommandLineRun()
    return Promise.resolve()
}


main().then(() => {
    console.log("Here we Go ~!")
})