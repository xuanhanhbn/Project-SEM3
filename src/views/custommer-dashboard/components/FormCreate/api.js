import api from 'src/utils/baseApiNoAuth'

export const getApiProduct = (url, data) =>
  new Promise((resolve, reject) =>
    api
      .get(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  )

export const postApiProduct = (url, data) =>
  new Promise((resolve, reject) =>
    api
      .post(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  )
