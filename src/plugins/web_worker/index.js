const workerModules = import.meta.glob('../web_worker/*.js')

//listing all workerName in dir
let workerList = Object.keys(workerModules).reduce((acc, cur) => {
    // ../web_worker/name.js  =>  name / but exclude index
    let workerName = cur.match(/\/(?!index)(?<name>\w+)\.js/)?.groups.name
    
    if(workerName) acc.push(workerName)
    return acc
}, [])

//Get worker instance by name
export function useWorker(workerName) {
    if(workerList.indexOf(workerName) === -1) {
        console.error(`Can't find worker "${workerName}" in dir`)
        return
    }
    const path = `src/plugins/web_worker/${workerName}.js`
    return new Worker(path)
}