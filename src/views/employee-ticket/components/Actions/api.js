import baseApiAuth from 'src/utils/baseApiAuth'

export const putApiDefault = (url, data) =>
  new Promise((resolve, reject) =>
    baseApiAuth
      .put(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  )

export const putApiNoData = url =>
  new Promise((resolve, reject) =>
    baseApiAuth
      .put(url)
      .then(res => resolve(res))
      .catch(err => reject(err))
  )

export const postApiDefault = (url, data) =>
  new Promise((resolve, reject) =>
    baseApiAuth
      .post(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  )
