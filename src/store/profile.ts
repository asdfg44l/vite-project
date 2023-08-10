import { defineStore } from 'pinia'
import { Payload } from '@/classes'

class SearchFormPayload extends Payload<POST_GAME_SEARCH_PAYLOAD> {
  type = ''
  name = ''
  constructor(args?: any) {
    super()
    super.initPayload(args)
  }

  // 用於在送出 payload給 server前做 keyName的對應
  convertToAPIVariables() {
    return {
      gameType: this.type,
      gameName: this.name,
    }
  }
}

class SearchFormData {
  gameType = ''
  gameName = ''
  createDate = ''
  updateDate = ''
  constructor(args?: any) {
    this.gameType = args.type
    this.gameName = args.name
    this.createDate = args.createDate
    this.updateDate = args.updateDate
  }
}
// 接收 server回傳的資料
class SearchFormResponse {
  data: SearchFormData[]
  constructor(args?: any) {
    this.data = args?.data?.map((item: any) => new SearchFormData(item))
  }
}

interface PROFILE_STATE {
  SearchForm: SearchFormPayload
  GameList: SearchFormResponse
}

function _initState(): PROFILE_STATE {
  return {
    SearchForm: new SearchFormPayload(),
    GameList: new SearchFormResponse(),
  }
}

export default defineStore('profile', {
  state: (): PROFILE_STATE => _initState(),
  actions: {
    async POST_GAME_SEARCH(payload: SearchFormPayload) {
      payload = new SearchFormPayload(payload)

      const params = payload.convertToAPIVariables()
      console.log(params)

      // const response = await POST_GAME_SEARCH(params)

      // this.GameList = new SearchFormResponse(response)
    },
    RESET_SEARCH_FORM() {
      Object.assign(this.SearchForm, new SearchFormPayload())
    },
  },
})
