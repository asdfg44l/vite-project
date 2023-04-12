self.onmessage = (e) => {
  self.postMessage("multiply get message: " + e.data);
};
