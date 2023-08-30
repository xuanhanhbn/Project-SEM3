/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Divider from '@mui/material/Divider'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import { inputCreatePartner } from '../../constant'
import { TextField, FormControl } from '@mui/material'
import { Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { styled } from '@mui/material/styles'
import { message, Upload } from 'antd'
import { baseApiUrlGateway } from 'src/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectPartner, partnerActions } from '../../slice'
import { useSnackbar } from 'notistack'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid.'),
  description: Yup.string().required('description is required')

  // partnerThumbnail: Yup.mixed().required('Partner Thumbnail is required')
})

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

function ModalCreate(props) {
  const { isOpenModalCreate, handleCreatePartner, onCancel } = props
  const { TextArea } = Input

  const [isErrorFile, setIsErrorFile] = useState('')
  const [imgSrc, setImgSrc] = useState('')

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const {
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const globalDataPartner = useSelector(makeSelectPartner)
  const { isLoading, isUploadImage, dataImage, isCreate } = globalDataPartner

  const onSubmit = data => {
    if (!dataImage) {
      return setIsErrorFile('Partner Thumbnail is required')
    }
    if (Object.keys(data).length && Object.keys(dataImage).length) {
      const newDataRequest = {
        ...data,
        partnerThumbnail: dataImage?.attachmentId || ''
      }

      return dispatch(partnerActions.onCreatePartner(newDataRequest))
    }
  }

  useEffect(() => {
    if (isUploadImage) {
      dispatch(partnerActions.clear())

      return handleShowSnackbar('Upload Image Success')
    }
  }, [isUploadImage])

  useEffect(() => {
    if (isCreate) {
      dispatch(partnerActions.clear())
      onCancel()
      dispatch(partnerActions.onGetListPartner())

      return handleShowSnackbar('Create Partner Success')
    }
  }, [isCreate])

  const onUploadImage = file => {
    const reader = new FileReader()

    const { files } = file.target
    console.log('files: ', files)
    if (files && files.length !== 0) {
      const blobFromFile = new Blob([], { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('file', blobFromFile, files[0]?.name)
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      dispatch(partnerActions.onUploadImagePartner(formData))
    }
  }

  const renderDefaultInput = item => {
    if (item.type === 'INPUT') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div key={item.field}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <TextField
                    fullWidth
                    required
                    label={item.label}
                    name={item.field}
                    onChange={onChange}
                    value={value}
                    type={item.type}

                    // defaultValue={data}
                  />
                </>
              )
            }}
            name={item.field}
          />

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
        </div>
      )
    }
    if (item.type === 'TEXT_AREA') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div key={item.field}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <TextArea
                    fullWidth
                    required
                    rows={4}
                    placeholder={item.label}
                    name={item.field}
                    onChange={onChange}
                    value={value}
                    type={item.type}

                    // defaultValue={data}
                  />
                </>
              )
            }}
            name={item.field}
          />

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
        </div>
      )
    }

    if (item.type === 'SELECT') {
      return (
        <div key={item.field}>
          {/* <Controller
            control={control}
            render={({ field }) => {
              return (
                <Upload {...propsUpload} style={{ marginBottom: 10 }}>
                  <Button variant='outlined' size='large' onClick={handleUpload}>
                    <UploadOutlined />
                    <div style={{ marginLeft: 10 }}>Select File</div>
                  </Button>
                </Upload>
              )
            }}
            name={item.field}
          /> */}

          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
            {isLoading ? <Spin /> : 'Upload New Photo'}
            <input
              hidden
              type='file'
              onChange={onUploadImage}
              accept='image/png, image/jpeg'
              id='account-settings-upload-image'
            />
          </ButtonStyled>
          <Typography style={{ marginTop: 0, marginBottom: 10 }}>
            {imgSrc && !isLoading ? 'Upload 1 image' : ''}
          </Typography>
        </div>
      )
    }
  }

  return (
    <div>
      <Modal title='Create Partners' open={isOpenModalCreate} onOk={handleSubmit(onSubmit)} onCancel={onCancel}>
        <div>{inputCreatePartner.map(item => renderDefaultInput(item))}</div>
      </Modal>
    </div>
  )
}

export default ModalCreate
