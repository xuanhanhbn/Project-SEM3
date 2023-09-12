/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Modal, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { inputCreateProgram } from '../../constant'
import { OutlinedInput, InputAdornment } from '@mui/material'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

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

import Grid from '@mui/material/Grid'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  partnerId: Yup.string().required('Partner is required'),
  donationInfo: Yup.string().required('Donation Info is required'),
  target: Yup.string().required('Target is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date is required'),
  donationReason: Yup.mixed().required('Donation Reason is required'),
  description: Yup.string().required('Description is required'),
  programThumbnailId: Yup.mixed().required('Program Thumbnail is required')
})

const categoryStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '8px 0'
  })
}

function ModalCreate(props) {
  const { isOpenModalCreate, dataRequest, onCancel, dataPartner, type, dataDetail } = props
  const { TextArea } = Input
  dayjs.extend(customParseFormat)

  console.log('dataDetail: ', dataDetail)

  const [selectedOptions, setSelectedOptions] = useState([])
  const [labelPartner, setLabelPartner] = useState(null)
  const [labelReason, setLabelReason] = useState(null)

  const dispatch = useDispatch()

  const globalDataProgram = useSelector(makeSelectProgram)
  const { dataImage, isUploadImage, isCreate } = globalDataProgram

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })
  const dateFormat = 'YYYY-MM-DD'

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
    const newDataRequest = {
      ...data,
      endDate: moment(data?.endDate).format('YYYY/MM/DD'),
      startDate: moment(data?.startDate).format('YYYY/MM/DD'),
      programThumbnailId: dataImage?.attachmentId
    }
    dispatch(programActions.onCreateProgram(newDataRequest))
  }

  useEffect(() => {
    if (dataDetail) {
      if (Array.isArray(dataDetail?.donationReason) && dataDetail?.donationReason.length > 0) {
        const option = []
        dataDetail?.donationReason.map(item => {
          const dataReason = {
            label: item,
            value: item
          }

          option.push(dataReason)
          setLabelReason(option)
        })
      }

      const defaultPartner = {
        label: 'a',
        value: 'a'
      }

      setValue('name', dataDetail.name)
      setValue('donationInfo', dataDetail.donationInfo)
      setValue('target', dataDetail.target)
      setValue('startDate', dataDetail?.startDate)
      setValue('endDate', dataDetail.endDate)
      setLabelPartner(defaultPartner)
      setValue('description', dataDetail.description)

      setValue('programThumbnailId', dataDetail.programThumbnail.name)
    }
  }, [dataDetail])

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
      dispatch(programActions.onGetListProgram(dataRequest))

      return handleShowSnackbar('Create Program Success')
    }
  }, [isCreate])

  const handleUploadImage = info => {
    const files = info.file || {}
    if (info.file.status === 'uploading') {
      // setLoading(true);

      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        const blobFromFile = new Blob([info.file.originFileObj], { type: 'image/jpeg' })
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

  const handleSetDefaultValue = item => {
    if (item.field === 'startDate') {
      return dayjs(dataDetail?.startDate, dateFormat)
    }

    return dayjs(dataDetail?.endDate, dateFormat)
  }

  const renderDefaultInput = item => {
    if (item.type === 'INPUT') {
      if (item.type_input) {
        const { field } = item
        const message = errors[field] && errors[field].message

        return (
          <Grid style={{ paddingTop: '1rem' }} item xs={12} sm={6} key={item.field}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='outlined-adornment'>Target</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder={item.label}
                        label='Target'
                        id='outlined-adornment-amount'
                        required
                        name={item.field}
                        onChange={onChange}
                        value={value}
                        endAdornment={<InputAdornment position='start'>$</InputAdornment>}
                      />
                    </FormControl>
                  </>
                )
              }}
              name={item.field}
            />

            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
          </Grid>
        )
      }
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid style={{ paddingTop: '1rem' }} item xs={12} sm={6} key={item.field}>
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
        </Grid>
      )
    }
    if (item.type === 'TEXT_AREA') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid style={{ paddingTop: '1rem' }} item xs={12}>
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
        </Grid>
      )
    }
    if (item.type === 'SELECT_DATE') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid style={{ paddingTop: '1rem' }} item xs={12} sm={6} key={item.field}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePickerWrapper style={{ height: 53 }}>
                  <DatePicker
                    showToday={false}
                    onChange={onChange}
                    disabledDate={disabledDate}
                    className='d-flex'
                    style={{ height: 53 }}
                    placeholder={item.label}
                    selected={value}
                    defaultValue={handleSetDefaultValue(item)}
                    size='large'
                    format='YYYY-MM-DD'
                  />
                </DatePickerWrapper>
              )
            }}
            name={item.field}
          />

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
        </Grid>
      )
    }
    if (item.type === 'SELECT_REASON') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid style={{ paddingTop: '1rem' }} item xs={12} sm={6} key={item.field}>
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
                    className='z-2'
                    isSearchable
                    isClearable
                    styles={categoryStyles}
                  />
                </>
              )
            }}
            name={item.field}
          />

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
        </Grid>
      )
    }
    if (item.type === 'SELECT_PARTNER') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid style={{ paddingTop: '1rem' }} item xs={12} sm={6} key={item.field}>
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
        </Grid>
      )
    }
    if (item.type === 'SELECT') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid style={{ paddingTop: '1rem' }} item xs={12}>
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
                  onChange={handleUploadImage}
                >
                  <ButtonStyled variant='outlined' size='large'>
                    <UploadOutlined />
                    <div style={{ marginLeft: 10 }}>Upload Image</div>
                  </ButtonStyled>
                </Upload>
              )
            }}
            name={item.field}
          />
          {message && <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>}
        </Grid>
      )
    }
  }

  return (
    <div>
      <Modal
        style={{ top: 20 }}
        width={1120}
        title={type === 'update' ? 'Update Program' : 'Create Program'}
        open={isOpenModalCreate}
        onOk={handleSubmit(onSubmit)}
        onCancel={onCancel}
      >
        <CardContent>
          <Grid container spacing={7}>
            {inputCreateProgram.map(item => renderDefaultInput(item))}
          </Grid>
        </CardContent>
      </Modal>
    </div>
  )
}

export default ModalCreate
