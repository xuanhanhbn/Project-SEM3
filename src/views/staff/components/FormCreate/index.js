import React, { memo, forwardRef } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import moment from 'moment/moment'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { Controller, useForm } from 'react-hook-form'
import { roleAccount, inputCreateUser, roleDepartments } from '../../constant'

import { useDispatch, useSelector } from 'react-redux'

import { staffActions, makeSelectStaff } from '../../staffSlice'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  username: Yup.string().required('User Name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid.'),
  password: Yup.string().required('Password is required'),
  roles: Yup.string().required('Roles is required'),

  // department: Yup.string().required('Roles is required'),
  dateOfBirth: Yup.string().required('Birth date is required'),
  phone: Yup.string()
    .required('Phone Number is required')
    .min(10, 'Phone Number is not valid')
    .max(10, 'Phone Number is max 10 characters')
})
function FormCreate(props) {
  const { title, onOpen, onClose, handleSubmitForm, value } = props
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const renderValueSelect = item => {
    if (item.field === 'roles') {
      return roleAccount.map(role => {
        return (
          <MenuItem key={role.field} value={role.value}>
            {role.value}
          </MenuItem>
        )
      })
    }

    // if (item.field === 'department') {
    //   return roleDepartments.map(role => {
    //     return (
    //       <MenuItem key={role.field} value={role.value}>
    //         {role.value}
    //       </MenuItem>
    //     )
    //   })
    // }
  }

  const renderDefaultFilter = item => {
    if (item.type === 'INPUT' || item.type === 'PASSWORD') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6} key={item.field}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  {/* <Typography sx={{ mb: 6, fontWeight: 500 }}>{item.inputLabel}</Typography> */}
                  <TextField
                    fullWidth
                    required
                    label={item.placeHolder}
                    name={item.field}
                    onChange={onChange}
                    value={value}
                    type={item.type}
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
      return (
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name={item.field}
              render={({ field: { onChange, value } }) => (
                <>
                  {/* <Typography sx={{ mb: 6, fontWeight: 500 }}>{item.inputLabel}</Typography> */}
                  <InputLabel>{item.placeHolder}</InputLabel>
                  <Select size='large' name={item.field} onChange={onChange} value={value} label={item.placeHolder}>
                    {renderValueSelect(item)}
                  </Select>
                </>
              )}
            />
          </FormControl>

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors.roles?.message}</Typography>
        </Grid>
      )
    }
  }

  const globalData = useSelector(makeSelectStaff)
  const handleClose = () => onClose()

  const onSubmit = data => {
    const newDataRequest = {
      ...data,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
      roles: [`${data.roles}`],
      department: ''
    }

    // data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD')
    dispatch(staffActions.createStaff(newDataRequest))
  }

  return (
    <div>
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
        <form>
          <Fade in={onOpen}>
            <Box sx={styles}>
              <Card fullWidth>
                <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />
                <Divider sx={{ margin: 0 }} />
                <FormControl style={{ width: '100%' }}>
                  <CardContent>
                    <Grid container spacing={5}>
                      {inputCreateUser.map(item => renderDefaultFilter(item))}
                      <Grid item xs={12} sm={6}>
                        {/* <Typography sx={{ mb: 6, fontWeight: 500 }}>Birth Date :</Typography> */}
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <DatePickerWrapper>
                              <DatePicker
                                maxDate={new Date()}
                                id='account-settings-date'
                                placeholderText='YYYY-MM-DD'
                                customInput={<CustomInput />}
                                onChange={date => field.onChange(date)}
                                selected={field.value}
                                dateFormat='yyyy-MM-dd'
                              />
                            </DatePickerWrapper>
                          )}
                          name='dateOfBirth'
                        />
                        <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>
                          {errors.dateOfBirth?.message}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={5}></Grid>
                  </CardContent>
                  <Divider sx={{ margin: 0 }} />
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
        </form>
      </Modal>
    </div>
  )
}

export default memo(FormCreate)
