import { get, post } from '@/utils/request.js'
const getTaoList = (data = {}) => {
  return get('/console/taogoldList', data)
}
const createAct = (data = {}) => {
  return post('/console/taogoldCreate', data)
}
const getActDetail = (taocode) => {
  return get('/console/taogoldDetail', { taocode: taocode })
}
export default {
  getTaoList,
  createAct,
  getActDetail
}
