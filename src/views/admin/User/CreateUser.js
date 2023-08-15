// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'

import CardContent from '@mui/material/CardContent'

import { styled } from '@mui/material/styles'
import { Breadcrumb, Card } from 'antd'

// ** Styled Components

import { Box } from 'mdi-material-ui'
import { MenuItem, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import { inputCreateUser, roleAccount } from './constants'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

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

const validationSchema = Yup.object().shape({
  birthdate: Yup.string().required('Birth date is required'),
  phone: Yup.string().required('Phone is required'),
  name: Yup.string().required('Name is required'),
  country: Yup.string().required('Country is required'),
  languages: Yup.string().required('Languages is required'),
  gender: Yup.string().required('Gender is required')
})

const CreateUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const renderValueSelect = item => {
    return roleAccount.map(role => {
      return (
        <MenuItem key={role.field} value={role.field}>
          {role.value}
        </MenuItem>
      )
    })
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
                  <Typography sx={{ mb: 6, fontWeight: 500 }}>{item.inputLabel}</Typography>
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
                  <Typography sx={{ mb: 6, fontWeight: 500 }}>{item.inputLabel}</Typography>
                  <InputLabel sx={{ top: 35 }}>{item.placeHolder}</InputLabel>
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

  const onSubmit = data => {
    // data.birthdate = moment(data.birthdate).format('YYYY-MM-DD')
    console.log(data)
  }

  // ** State
  const [date, setDate] = useState(null)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>Company Active</Breadcrumb.Item>
        <Breadcrumb.Item>Create User</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={7}>
              {inputCreateUser.map(item => renderDefaultFilter(item))}
              <Grid item xs={12}>
                <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
                <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </CardContent>
  )
}

export default CreateUser
