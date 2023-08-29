/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Modal, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { inputCreateProgram } from '../../constant'
import { TextField, FormControl, OutlinedInput, InputAdornment, InputLabel } from '@mui/material'
import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectPartner, makeSelectProgram, programActions } from '../../slice'
import { UploadOutlined } from '@ant-design/icons'
import { useSnackbar } from 'notistack'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Creatable from 'react-select/creatable'
import Select from 'react-select'
import { ButtonStyled } from 'src/components/ButtonStyled'
import { partnerActions } from 'src/pages/partners-listing/slice'
import moment from 'moment'
import { Upload } from 'antd'
import { beforeUpload, getBase64 } from 'src/utils/common'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  partnerId: Yup.string().required('Partner is required'),
  donationInfo: Yup.string().required('donationInfo is required'),
  target: Yup.string().required('target is required'),
  endDate: Yup.string().required('endDate is required'),
  donationReason: Yup.mixed().required('donationReason is required'),
  description: Yup.string().required('description is required'),
  programThumbnailId: Yup.mixed().required('Program Thumbnail is required')
})

const categoryStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '8px 0'
  })
}

function ModalCreate(props) {
  const { isOpenModalCreate, handleCreatePartner, onCancel, dataPartner } = props
  const { TextArea } = Input

  const [selectedOptions, setSelectedOptions] = useState([])
  const [labelPartner, setLabelPartner] = useState(null)
  const [labelReason, setLabelReason] = useState(null)

  const dispatch = useDispatch()

  const globalDataProgram = useSelector(makeSelectProgram)
  const { isLoading, dataImage, isUploadImage, isCreate } = globalDataProgram

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
    const newDataRequest = {
      ...data,
      endDate: moment(data?.endDate).format('YYYY/MM/DD'),
      programThumbnailId: dataImage?.attachmentId
    }
    dispatch(programActions.onCreateProgram(newDataRequest))
  }

  useEffect(() => {
    if (isUploadImage) {
      dispatch(partnerActions.clear())

      return handleShowSnackbar('Upload Image Success')
    }
  }, [isUploadImage])

  useEffect(() => {
    if (isCreate) {
      dispatch(programActions.clear())
      onCancel()
      dispatch(programActions.onGetListProgram())

      return handleShowSnackbar('Create Program Success')
    }
  }, [isCreate])

  // const onUploadImage = file => {
  //   const reader = new FileReader()

  //   const { files } = file.target
  //   console.log('files; ', file)

  //   if (file) {
  //     const blobFromFile = new Blob([], { type: 'image/jpeg' })
  //     const formData = new FormData()
  //     formData.append('file', blobFromFile, files[0]?.name)
  //     reader.onload = () => setImgSrc(reader.result)
  //     reader.readAsDataURL(files[0])

  //     dispatch(programActions.onUploadImageProgram(formData))
  //   }
  // }

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

        setValue('programThumbnailId', files?.name, { shouldValidate: true })

        dispatch(programActions.onUploadImageProgram(formData))
      })
    }
  }

  // Change Select Partner
  const handleSelectChangePartner = selectedOption => {
    setLabelPartner(selectedOption)
    setValue('partnerId', selectedOption?.value, { shouldValidate: true })
  }

  // GET OPTIONS PARTNER
  const handleGetOptionsPartner = () => {
    const formattedOptions = dataPartner?.map(item => ({
      value: item?.partnerId,
      label: item?.name
    }))

    return formattedOptions
  }

  // SELECT_REASON
  const handleSelectChange = selectedOption => {
    const option = []
    if (selectedOption) {
      // Kiểm tra xem lựa chọn đã tồn tại trong mảng hay chưa
      if (!selectedOptions.includes(selectedOption.value)) {
        const newOptions = selectedOption?.map(item => ({
          label: item.label,
          value: item.value
        }))
        for (var i = 0; i < newOptions.length; i++) {
          option.push(newOptions[i].value)
        }

        setValue('donationReason', option, { shouldValidate: true })
        setLabelReason(selectedOption)

        return setSelectedOptions([...newOptions])
      }
    }
  }

  const disabledDate = current => {
    // Lấy ngày hiện tại
    const currentDate = moment()

    // So sánh ngày hiện tại với ngày được chọn
    return current && current < currentDate
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
                    onChange={onChange}
                    disabledDate={disabledDate}
                    className='d-flex'
                    style={{ height: 53 }}
                    placeholder='End Date'
                    selected={value}
                    size='large'
                    format='DD-MM-YYYY'
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
                    value={labelReason}
                    placeholder='Select Reason'
                    onChange={handleSelectChange}
                    getOptionLabel={option => option.label}
                    getOptionValue={option => option.value}
                    isMulti
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
                    value={labelPartner}
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
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <div key={item.field}>
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
                    <div style={{ marginLeft: 10 }}>Select Image</div>
                  </ButtonStyled>
                </Upload>
              )
            }}
            name={item.field}
          />
          {message && <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>}
          {/* <Typography style={{ marginTop: 0, marginBottom: 10 }}>
            {imgSrc && !isLoading ? 'Upload 1 image' : ''}
          </Typography> */}

          {/* <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
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
          </Typography> */}
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
