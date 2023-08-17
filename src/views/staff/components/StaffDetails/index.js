// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User name is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email sai định dạng'),

  role: Yup.string().required('Role is required'),
  status: Yup.string().required('Status is required'),
  company: Yup.string().required('Company is required')
})

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { inputTabAccount, roleAccount, statusAccount } from './constants'

function StaffDetails(props) {
  const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
  }))

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(4)
    }
  }))

  // const globalData = useSelector(makeSelectLogin)
  // const dataUser = globalData?.dataUser
  const { globalData, dataUser } = props

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      name: globalData?.name,
      email: globalData?.email,
      role: '',
      status: '',
      company: ''
    }
  })

  useEffect(() => {
    if (globalData?.name) {
      setValue('name', globalData?.name)
    }
    if (globalData?.email) {
      setValue('email', globalData?.email)
    }
    if (globalData?.roles) {
      const found = roleAccount.find(element => element.field === globalData?.roles[0].toLowerCase())
      setValue('role', found?.field)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalData])

  const onSubmit = data => console.log(data)

  // // ** State
  const [openAlert, setOpenAlert] = useState(true)

  // const [imgSrc, setImgSrc] = useState('/images/avatars/1686130680-bpfull.jpg')

  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  // Render valu select
  const renderValueSelect = item => {
    if (item.field === 'role') {
      return roleAccount.map(role => {
        return (
          <MenuItem key={role.field} value={role.field}>
            {role.value}
          </MenuItem>
        )
      })
    } else {
      return statusAccount.map(status => (
        <MenuItem key={status.field} value={status.value}>
          {status.value}
        </MenuItem>
      ))
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
                  name={item.field}
                  onChange={onChange}
                  value={value}
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
              name={item.field}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputLabel>{item.placeHolder}</InputLabel>
                  <Select name={item.field} onChange={onChange} value={value} label={item.placeHolder}>
                    {renderValueSelect(item)}
                  </Select>
                </>
              )}
            />
          </FormControl>

          <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors.role?.message}</Typography>
        </Grid>
      )
    }
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-staffs-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-staffs-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          {inputTabAccount.map(item => renderDefaultFilter(item))}

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12}>
            <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default StaffDetails
