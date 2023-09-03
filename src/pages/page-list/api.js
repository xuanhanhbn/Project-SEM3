import baseApiAuth from 'src/utils/baseApiAuth'

export const getApiDefault = url =>
  new Promise((resolve, reject) =>
    baseApiAuth
      .get(url)
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
