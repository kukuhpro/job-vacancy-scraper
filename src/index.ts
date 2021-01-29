import CommandLineRun from './transport/cli'

async function main(): Promise<void> {
    await CommandLineRun()
    return Promise.resolve()
}

main().then(() => {
    console.log("Here we Go ~!")
})