import http from './adapter'

export const getPing = async () => await http.get(`${icity}/ping`)
