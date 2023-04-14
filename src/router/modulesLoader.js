const moduleList = import.meta.globEager('./modules/*.js')
let modules = []

modules = Object.values(moduleList).reduce((acc, cur) => {
  acc = [...acc, ...cur.default]
  return acc
}, modules)

export default modules
