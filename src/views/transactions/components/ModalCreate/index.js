/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FormControl, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { inputCreate, inputShowInfoCustomer } from '../../constants'
import { useState } from 'react'
import { customerActions, makeSelectCustomer } from 'src/views/custommer-dashboard/customerSlice'

// import Select from '@mui/material/Select'
import { useEffect } from 'react'
import { transactionActions } from '../../transactionSlice'
import Select from 'react-select'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '8px 0'
  })
}

const validationSchema = Yup.object().shape({
  detail: Yup.string().required('Discription Transaction is required'),
  total: Yup.string()
    .required('Total Transactions is required')
    .matches(/^[0-9]+(?:[,.][0-9]+)*$/, 'Total invalid'),
  customerId: Yup.string().required('Customer is required')
})

function FormCreate(props) {
  const { title, onOpen, onClose, handleSubmitForm, value } = props
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const baseDataRequest = {
    detail: '',
    total: 0,
    customerId: ''
  }

  const [dataRequest, setDataRequest] = useState(baseDataRequest)
  const [valueCustomer, setValueCustomer] = useState({})

  // const globalData = useSelector(makeSelectCustomer)
  const getDataCustomer = useSelector(makeSelectCustomer)
  const dataCustomer = getDataCustomer?.dataCustomer
  const handleClose = () => onClose()

  const onSubmit = data => {
    const replaceData = data?.total?.toLocaleString()?.replace(/\D/g, '')

    const newDataRequest = {
      ...data,
      total: Number(replaceData)
    }
    dispatch(transactionActions.createTransaction(newDataRequest))
  }

  useEffect(() => {
    dispatch(customerActions.getListCustomer())
  }, [])

  // Render value select
  const renderValueSelect = item => {
    if (Array.isArray(dataCustomer) && dataCustomer.length > 0) {
      return dataCustomer.map(customer => {
        return (
          <MenuItem key={customer?.customerId} value={customer?.customerId}>
            {customer?.name}
          </MenuItem>
        )
      })
    }
  }

  // Render input
  const renderDefaultFilter = item => {
    if (item.type === 'INPUT') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6} key={item.field}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <TextField
                  fullWidth
                  required
                  label={item.placeHolder}
                  id='outlined-start-adornment'
                  name={item.field}
                  onChange={item.field === 'total' ? handleInputTotalChange : onChange}
                  value={value}
                  InputProps={
                    item.field === 'total' ? { endAdornment: <InputAdornment position='end'>$</InputAdornment> } : null
                  }
                />
              )
            }}
            name={item.field}
          />

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
        </Grid>
      )
    }

    if (item.type === 'SELECT') {
      return (
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name='customerId'
              render={({ field }) => (
                <>
                  {/* <InputLabel>{item.placeHolder}</InputLabel> */}
                  <Select
                    {...field}
                    onChange={handleSelectChange}
                    options={handleGetOptions()}
                    value={valueCustomer}
                    isSearchable
                    className='z-2'
                    styles={customStyles}
                  />
                </>
              )}
            />
          </FormControl>

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors.customerId?.message}</Typography>
        </Grid>
      )
    }
  }

  const handleGetOptions = () => {
    const formattedOptions = dataCustomer?.map(item => ({
      value: item?.customerId,
      label: item?.name
    }))

    return formattedOptions
  }

  // Xử lí change input total
  const handleInputTotalChange = event => {
    const inputValue = event.target.value

    // Loại bỏ các dấu phẩy trong giá trị
    const numericValue = inputValue.replace(/,/g, '')

    // Thêm dấu phẩy sau mỗi 3 số
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // Cập nhật giá trị vào React Hook Form
    setValue('total', formattedValue, { shouldValidate: true })
  }

  // Xử lí change Select
  const handleSelectChange = selectedOption => {
    const selectedValue = selectedOption
    setValue('customerId', selectedValue?.value, { shouldValidate: true })
    setValueCustomer(selectedValue)
  }

  // Hiển thị khi người dùng select && select có dữ liệu
  const renderInputCustomer = item => {
    if (valueCustomer && Object.keys(valueCustomer).length) {
      const result = dataCustomer?.filter(item => item?.customerId === valueCustomer?.value)

      return (
        <Grid item xs={12} sm={6}>
          <TextField disabled fullWidth required label={item.lable} name={item.field} value={result[0][item.field]} />
        </Grid>
      )
    }
  }

  return (
    <div className='container '>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={onOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={onOpen}>
          <Box sx={style}>
            <Card fullWidth>
              <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <FormControl style={{ width: '100%' }}>
                <CardContent>
                  <Grid container spacing={5}>
                    {inputCreate.map(input => renderDefaultFilter(input))}
                    {inputShowInfoCustomer.map(item => renderInputCustomer(item))}
                  </Grid>
                </CardContent>
                <Divider sx={{ marginTop: 20 }} />
                <CardActions style={{ justifyContent: 'flex-end' }}>
                  <Button size='large' color='secondary' variant='outlined' onClick={() => handleClose()}>
                    Cancel
                  </Button>
                  <Button
                    size='large'
                    type='submit'
                    sx={{ mr: 2 }}
                    variant='contained'
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                </CardActions>
              </FormControl>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default FormCreate
