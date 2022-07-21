import { inject } from 'vue'
import axios from 'axios'

const instance = axios.create({
    // baseUrl: ""
    timeout: 8000,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-type': 'application/json'
    }
})

async function HTTP_GET(url, params = {}) {
    try {
        if(params) params = { params }
        const res = await instance.get(url, params)
        return res
    } catch(e) {
        return Promise.reject(e)
    }
}

const isValidArray = (array) => {
    return array && Array.isArray(array) && array.length > 0
}

const isValidBlob = (blob) => {
    return blob && blob instanceof Blob
}

async function POST_IMG(url, files) {
    try {
        if(!isValidArray(files)) throw new Error('POST_IMG: files is undefined')
        let formData = new FormData()
        files.forEach(file => {
            if(!isValidBlob(file.data)) return
            formData.append(file.name, file.data)
        })
        await instance.post(url, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
        return Promise.resolve(true)
    } catch(e) {
        return Promise.reject(e)
    }
}

const injectionKey = Symbol('http')

const http = {
  HTTP_GET,
  POST_IMG
}

export const useHttp = () => inject(injectionKey)

export const VueAxios = {
    install: (app, options) => {
        // app.config.globalProperties.$http = http
        app.provide(injectionKey, http)
    }
}