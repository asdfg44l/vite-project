export function createConnect(url) {
  const ws = new WebSocket(url)

  ws.onopen = (e) => {
    console.log('open', e)
  }
  ws.onmessage = (e) => {
    console.log(e.data)
  }
  ws.onerror = (e) => {
    console.error(e)
  }
  ws.onclose = (e) => {
    console.log(e)
  }
  return ws
}
