import React from 'react'

import { Input, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { TextField, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { inputCreatePartner } from '../../constant'
import { ButtonStyled } from 'src/components/ButtonStyled'
import { beforeUpload, getBase64 } from 'src/utils/common'

const validationSchema = Yup.object().shape({
  partnerThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
  name: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid.'),
  description: Yup.string().required('description is required')
})

function ModalCreate(props) {
  const { isOpenModalCreate, handleCreatePartner, onCancel } = props
  const { TextArea } = Input

  const {
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
    console.log('data: ', data)
  }

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

        // dispatch(programActions.onUploadImageProgram(formData))
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
    const { field } = item
    const message = errors[field] && errors[field].message

    return (
      <div style={{ paddingTop: '1rem' }}>
        <Controller
          control={control}
          render={({ field }) => {
            return (
              <></>
              // <Upload
              //   {...field}
              //   style={{ marginBottom: 10 }}
              //   maxCount={1}
              //   name={item.field}

              //   listType='picture'
              //   accept='image/png, image/jpeg,image/jpg'
              //   // beforeUpload={beforeUpload}
              //   // onChange={handleChange}
              // >
              //   <ButtonStyled variant='outlined' size='large'>
              //     <UploadOutlined />
              //     <div style={{ marginLeft: 10 }}> Image</div>
              //   </ButtonStyled>
              // </Upload>
            )
          }}
          name={item.field}
        />
        {message && <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>}
      </div>
    )
  }

  return (
    <div>
      <Modal title='Create Partner' open={isOpenModalCreate} onCancel={onCancel} onOk={handleSubmit(onSubmit)}>
        {inputCreatePartner.map(item => renderDefaultInput(item))}
      </Modal>
    </div>
  )
}

export default ModalCreate
