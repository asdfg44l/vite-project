const requestModules = import.meta.globEager('./modules/**/*.(js|ts)')

let modules = {}

Object.keys(requestModules).forEach((path) => {
  const routePath = path.replace(/(\.\/modules\/|\.js|\.ts)/g, '').split('/')

  const haveSubDir = routePath.length > 1

  if (haveSubDir) {
    const createModules = (obj, index = 0) => {
      const pathName = routePath[index]
      //   const isAt
      if (index === routePath.length - 1) {
        obj.modules = {
          ...obj.modules,
          [pathName]: {
            ...obj.modules,
            ...requestModules[path].default,
            namespaced: true,
          },
        }
        return
      }
      obj.modules = obj.modules[pathName]
        ? { ...obj.modules }
        : { ...obj.modules, [pathName]: { modules: {} } }

      createModules(obj.modules[pathName], index + 1)
    }
    createModules(modules)
    return
  }

  const fileName = routePath[routePath.length - 1]
  modules.modules = modules.modules ?? {}
  modules.modules[fileName] = {
    ...requestModules[path].default,
    namespaced: true,
  }
})
modules = { ...modules.modules }

export default modules
