// 取得 class中不是 Function的 key，並將他組成聯合型別
type noFunctionType<T> = {
  [key in keyof T]: T[key] extends Function ? never : key
}[keyof T]

/**
 * 所有要傳去給 server的 payload都必須要繼承這個 class
 * initPayload 是使用 arguments將物件屬性做初始化
 * 並且每個 payload都必須要實作 convertToAPIVariables，將物件屬性轉換成 server可接受的格式
 * */
export abstract class Payload<T> {
  initPayload(args?: any) {
    for (const key in args) {
      const typedKey: noFunctionType<T> = key as any
      if (Object.prototype.hasOwnProperty.call(this, typedKey)) {
        Object.assign(this, { [typedKey]: args[typedKey] })
      }
    }
  }

  abstract convertToAPIVariables(): T
}
