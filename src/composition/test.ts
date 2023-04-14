// import { ref } from "vue";

export interface DUCK_TYPE {
  [key: string]: any
}

export interface UserStrict {
  name: string
  age: number
  auth: string[]
}
export type User = DUCK_TYPE & UserStrict

export function useTs() {
  enum Color {
    red = 0x000101,
    green,
    black,
  }

  enum CMD {
    GET_WINLOSE_DETAIL = 'GET_WINLOSE_DETAIL',
  }

  return { Color, CMD }
}

type UserStrictOrEmpty = {
  [key in keyof UserStrict]?: UserStrict[key]
}

const person: UserStrictOrEmpty = {}

const info: UserStrictOrEmpty = {
  name: 'hi',
  age: 13,
  auth: ['dawad'],
}
