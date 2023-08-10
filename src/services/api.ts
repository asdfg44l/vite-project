import api from './apipath'
import http from '@/plugins/axios'

/** GAME */
// 這只是範例不能打
export function POST_GAME_SEARCH(payload: POST_GAME_SEARCH_PAYLOAD) {
  return http.post(api.GAME_SEARCH, payload)
}
