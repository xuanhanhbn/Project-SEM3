/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Form, Modal, Spin, Typography } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Divider from '@mui/material/Divider'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import { inputCreateProgram } from '../../constant'
import { TextField, FormControl, OutlinedInput, InputAdornment, InputLabel } from '@mui/material'
import { Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { styled } from '@mui/material/styles'
import { message, Upload } from 'antd'
import { baseApiUrlGateway } from 'src/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectPartner, partnerActions } from '../../slice'
import { useSnackbar } from 'notistack'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Creatable from 'react-select/creatable'

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

const categoryStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '8px 0'
  })
}
function ModalCreate(props) {
  const { isOpenModalCreate, handleCreatePartner, onCancel } = props
  const { TextArea } = Input
  const { RangePicker } = DatePicker

  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const [isErrorFile, setIsErrorFile] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [valueCategory, setValueCategory] = useState({})

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const {
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // const globalDataPartner = useSelector(makeSelectPartner)
  // const { isLoading, isUploadImage } = globalDataPartner

  const onSubmit = data => {
    console.log('fileList: ', fileList)
    if (fileList.length <= 0) {
      return setIsErrorFile('Partner Thumbnail is required')
    }
    if (Object.keys(data).length && fileList.length > 0) {
      const fileImage = fileList[0].uid

      const newDataRequest = {
        ...data,
        partnerThumbnail: fileImage
      }
    }
  }

  // useEffect(() => {
  //   if (isUploadImage) {
  //     dispatch(partnerActions.clear())

  //     return handleShowSnackbar('Upload Image Success')
  //   }
  // }, [isUploadImage])

  const onUploadImage = file => {
    const reader = new FileReader()

    const { files } = file.target
    if (files && files.length !== 0) {
      const blobFromFile = new Blob([], { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('file', blobFromFile, files[0]?.name)
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      dispatch(partnerActions.onUploadImagePartner(formData))
    }
  }

  const handleSelectChange = selectedOption => {
    const selectedValue = selectedOption
    setValue('donationReason', selectedValue?.label, { shouldValidate: true })
    setValueCategory(selectedValue)
  }

  const renderDefaultInput = item => {
    if (item.type === 'INPUT') {
      if (item.type_input) {
        const { field } = item
        const message = errors[field] && errors[field].message

        return (
          <div key={item.field}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <OutlinedInput
                      fullWidth
                      placeholder={item.label}
                      label={item.label}
                      id='outlined-adornment-amount'
                      required
                      name={item.field}
                      onChange={onChange}
                      value={value}
                      endAdornment={<InputAdornment position='start'>$</InputAdornment>}
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
    if (item.type === 'SELECT_DATE') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div key={item.field}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePickerWrapper style={{ height: 53 }}>
                  <DatePicker
                    renderExtraFooter={() => 'extra footer'}
                    onChange={onChange}
                    className='d-flex'
                    style={{ height: 53 }}
                    placeholder='End Date'
                    selected={value}
                    size='large'
                    dateFormat='yyyy-MM-dd'
                  />
                </DatePickerWrapper>
              )
            }}
            name={item.field}
          />

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
        </div>
      )
    }
    if (item.type === 'SELECT_REASON') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div key={item.field}>
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Creatable
                    {...field}
                    onChange={handleSelectChange}
                    // options={handleGetOptions()}

                    value={valueCategory}
                    isSearchable
                    isClearable
                    className='z-2'
                    styles={categoryStyles}
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
            {/* {isLoading ? <Spin /> : 'Upload New Photo'} */}
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
      <Modal title='Create Program' open={isOpenModalCreate} onOk={handleSubmit(onSubmit)} onCancel={onCancel}>
        <div>{inputCreateProgram.map(item => renderDefaultInput(item))}</div>
      </Modal>
    </div>
  )
}

export default ModalCreate
