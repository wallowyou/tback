import { get, post } from '@/utils/request.js'
const getTaoList = (data = {}) => {
  return get('/console/taogoldList', data)
}
const createAct = (data = {}) => {
  return post('/console/taogoldCreate', data)
}
export default {
  getTaoList,
  createAct
}
