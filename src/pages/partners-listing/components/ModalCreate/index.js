/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal, Spin, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import { inputCreatePartner } from '../../constant'
import { TextField, FormControl } from '@mui/material'
import { Input } from 'antd'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectPartner, partnerActions } from '../../slice'
import { useSnackbar } from 'notistack'
import { UploadOutlined } from '@ant-design/icons'
import { beforeUpload } from 'src/utils/common'

const validationSchema = Yup.object().shape({
  partnerThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
  name: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid.'),
  description: Yup.string().required('description is required')
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

  console.log('errors: ', errors)

  const globalDataPartner = useSelector(makeSelectPartner)
  const { isLoading, isUploadImage, dataImage, isCreate } = globalDataPartner

  const onSubmit = data => {
    console.log('data: ', data)

    // if (!dataImage) {
    //   return setIsErrorFile('Partner Thumbnail is required')
    // }
    // if (Object.keys(data).length && Object.keys(dataImage).length) {
    //   const newDataRequest = {
    //     ...data,
    //     partnerThumbnail: dataImage?.attachmentId || ''
    //   }

    //   return dispatch(partnerActions.onCreatePartner(newDataRequest))
    // }
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

  const handleChange = info => {
    const files = info.file || {}
    if (info.file.status === 'uploading') {
      // setLoading(true);

      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        const blobFromFile = new Blob([], { type: 'image/jpeg' })
        const formData = new FormData()
        formData.append('file', blobFromFile, files?.name)

        setValue('partnerThumbnailId', files?.name, { shouldValidate: true })

        dispatch(programActions.onUploadImageProgram(formData))
      })
    }
  }

  const renderDefaultInput = item => {
    if (item.type === 'INPUT') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div style={{ paddingTop: '1rem' }} key={item.field}>
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
        <div style={{ paddingTop: '1rem' }}>
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

    // if (item.type === 'SELECT') {
    //   const { field } = item
    //   const message = errors[field] && errors[field].message

    //   return (
    //     <div style={{ paddingTop: '1rem' }}>
    //       <Controller
    //         control={control}
    //         render={({ field }) => {
    //           return (
    //             <Upload
    //               {...field}
    //               style={{ marginBottom: 10 }}
    //               maxCount={1}
    //               name={item.field}
    //               listType='picture'
    //               accept='image/png, image/jpeg,image/jpg'
    //               beforeUpload={beforeUpload}
    //               onChange={handleChange}
    //             >
    //               <ButtonStyled variant='outlined' size='large'>
    //                 <UploadOutlined />
    //                 <div style={{ marginLeft: 10 }}> Image</div>
    //               </ButtonStyled>
    //             </Upload>
    //           )
    //         }}
    //         name={item.field}
    //       />
    //       {message && <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>}
    //     </div>
    //   )
    // }
    return (
      <div style={{ paddingTop: '1rem' }}>
        <Controller
          control={control}
          render={({ field }) => {
            return (
              <Upload
                {...field}
                style={{ marginBottom: 10 }}
                maxCount={1}
                name={item.field}
                listType='picture'
                accept='image/png, image/jpeg,image/jpg'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <ButtonStyled variant='outlined' size='large'>
                  <UploadOutlined />
                  <div style={{ marginLeft: 10 }}> Image</div>
                </ButtonStyled>
              </Upload>
            )
          }}
          name={item.field}
        />
        {/* {message && <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>} */}
      </div>
    )
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
