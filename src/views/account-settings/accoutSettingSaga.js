import { call, put, takeLatest } from 'redux-saga/effects'
import { postApiChangeAvatar, postApiDefault } from './api'
import { settingAction } from './accountSettingSlice'

// Change password
function* onChangePassword(data) {
  const payload = data?.payload
  const url = '/User/change-password'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.data) {
      yield put(settingAction.changePasswordSuccess(response.data))
    } else {
      yield put(settingAction.changePasswordFailed())
    }
  } catch (error) {
    yield put(settingAction.changePasswordFailed('internet'))
  }
}

// Upload avatar
function* onUploadAvatar(data) {
  const payload = data?.payload
  const url = '/User/ProfilePicture'
  try {
    const response = yield call(postApiChangeAvatar, url, payload)
    if (response && response.status === 200) {
      yield put(settingAction.changeAvatarSuccess(response.data))
    } else {
      yield put(settingAction.changeAvatarFailed())
    }
  } catch (error) {
    yield put(settingAction.changeAvatarFailed('internet'))
  }
}

export default function* accountSettingSaga() {
  yield takeLatest(settingAction.changePassword, onChangePassword)
  yield takeLatest(settingAction.changeAvatar, onUploadAvatar)
}
