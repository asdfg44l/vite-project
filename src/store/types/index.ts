interface ModalObject {
  key: Symbol
}
interface ModalCallback {
  [key: string]: Function
}
export interface Dialogs {
  [key: string]: ModalObject | ModalCallback
}

export interface Profile {}
