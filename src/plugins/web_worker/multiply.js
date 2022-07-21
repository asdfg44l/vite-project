self.onmessage = (e) => {
    console.log('multiply get message: ', e.data)
    self.postMessage('This is a data from multiply.js')
}