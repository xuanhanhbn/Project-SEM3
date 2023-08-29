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
import { makeSelectPartner, makeSelectProgram } from '../../slice'
import { useSnackbar } from 'notistack'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Creatable from 'react-select/creatable'
import Select from 'react-select'
import { ButtonStyled } from 'src/components/ButtonStyled'
import { partnerActions } from 'src/pages/partners-listing/slice'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  partnerId: Yup.string().required('Partner is required'),
  donationInfo: Yup.string().required('donationInfo is required'),
  target: Yup.string().required('target is required'),
  endDate: Yup.string().required('endDate is required'),
  donationReason: Yup.string().required('donationReason is required'),
  description: Yup.string().required('description is required')

  // partnerThumbnail: Yup.mixed().required('Partner Thumbnail is required')
})

const categoryStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '8px 0'
  })
}
function ModalCreate(props) {
  const { isOpenModalCreate, handleCreatePartner, onCancel, dataPartner, isUploadImage } = props
  const { TextArea } = Input
  const { RangePicker } = DatePicker

  const [fileList, setFileList] = useState([])
  const [isErrorFile, setIsErrorFile] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  const dispatch = useDispatch()
  const option = []

  const globalDataProgram = useSelector(makeSelectProgram)
  const { isLoading } = globalDataProgram

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

  const onSubmit = data => {
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

  useEffect(() => {
    if (isUploadImage) {
      dispatch(partnerActions.clear())

      return handleShowSnackbar('Upload Image Success')
    }
  }, [isUploadImage])

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

  const handleSelectChangePartner = selectedOption => {
    setValue('partnerId', selectedOption?.value, { shouldValidate: true })
  }

  // SELECT_REASON
  const handleSelectChange = selectedOption => {
    // setValue('donationReason', selectedValue?.label, { shouldValidate: true })
    // setValueCategory(selectedValue)
    if (selectedOption) {
      // Kiểm tra xem lựa chọn đã tồn tại trong mảng hay chưa
      if (!selectedOptions.includes(selectedOption.value)) {
        const newOptions = selectedOption?.map(item => ({
          label: item.label,
          value: item.value
        }))

        return setSelectedOptions([...newOptions])
      }
    }
  }

  const handleGetOptionsPartner = () => {
    const formattedOptions = dataPartner?.map(item => ({
      value: item?.partnerId,
      label: item?.name
    }))

    return formattedOptions
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
                    options={selectedOptions || []}
                    isMulti
                    placeholder='Select Reason'
                    onChange={handleSelectChange}
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
    if (item.type === 'SELECT_PARTNER') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div key={item.field}>
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Select
                    {...field}
                    onChange={handleSelectChangePartner}
                    placeholder='Select Partner'
                    options={handleGetOptionsPartner()}
                    getOptionLabel={option => option.label}
                    getOptionValue={option => option.value}
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
      <Modal title='Create Program' open={isOpenModalCreate} onOk={handleSubmit(onSubmit)} onCancel={onCancel}>
        <div>{inputCreateProgram.map(item => renderDefaultInput(item))}</div>
      </Modal>
    </div>
  )
}

export default ModalCreate
