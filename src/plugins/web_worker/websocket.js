export const createConnect = (url) => {
  let ws = new WebSocket(url);

  ws.onopen = (e) => {
    console.log("open", e);
  };
  ws.onmessage = (e) => {
    console.log(e.data);
  };
  ws.onerror = (e) => {
    console.error(e);
  };
  return ws;
};
