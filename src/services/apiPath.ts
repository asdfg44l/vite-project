const API_V1 = ''

/**
 * key 命名規則為
 * 1. 把 api path 轉成大寫，並把'/' or '-' 改為'_'分隔
 * 2. camelCase 轉成 snake_case
 */
const api = {
  GAME_SEARCH: `${API_V1}/game/search`,
}

export default api
