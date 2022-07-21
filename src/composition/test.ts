// import { ref } from "vue";

import { Computed } from "vuex"

export type DUCK_TYPE = {
  [key: string]: any
}

export type UserStrict = {
  name: string,
  age: number,
  auth: string[]
}
export type User = DUCK_TYPE & UserStrict

export function useTs() {
  enum Color {
    red = 0x000101,
    green,
    black
  }

  enum CMD {
    GET_WINLOSE_DETAIL = 'GET_WINLOSE_DETAIL'
  }
  
  return { Color, CMD }
}

type UserStrictOrEmpty = {
  [key in keyof UserStrict]?: UserStrict[key];
};

let person: UserStrictOrEmpty = {};

let info: UserStrictOrEmpty = {
  name: 'hi',
  age: 13,
  auth: ["dawad"]
}