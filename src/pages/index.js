/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { loginPageActions, makeSelectLogin } from './pages/login/loginSlice'
import { useDispatch, useSelector } from 'react-redux'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import input from 'src/@core/theme/overrides/input'
import { inputLogin } from './pages/login/constants'
import ForgotPassword from './pages/forgot-password'
import { useSnackbar } from 'notistack'
import Loading from 'src/components/Loading'
import { FilledInput } from '@mui/material'

import logo from '../../public/images/logos/logo.png'
import Image from 'next/image'

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required('User name is required'),
  password: Yup.string().required('Password is required')
})

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const [onOpen, setOnOpen] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  // useForm
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const dispatch = useDispatch()

  // Xử lí khi ấn nút Login
  const onSubmit = data => {
    dispatch(loginPageActions.loginPage(data))
  }

  // Lấy dữ liệu từ api trả về
  const dataLoginPage = useSelector(makeSelectLogin)
  const { isSuccess, dataLogin, isLoading, isError, isLogin } = dataLoginPage
  const dataUser = dataLoginPage?.dataUser

  // Xử lí khi đăng nhập thành công
  useEffect(() => {
    if (isLogin) {
      dispatch(loginPageActions.clear())
      dispatch(loginPageActions.userInfo())

      handleShowSnackbar('Login Success')
      router.push('/admin/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  useEffect(() => {
    if (dataUser && Object.keys(dataUser).length) {
      router.push('/admin/dashboard')
    }
  }, [dataUser])

  // Xử lí khi đăng nhập thất bại
  useEffect(() => {
    if (isError) {
      dispatch(loginPageActions.clear())
      handleShowSnackbar('There was an error. Please try again.', 'error')
    }
  }, [isError])

  // Xử lí khi nhấn phím enter
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Đoạn mã xử lý khi nhấn phím Enter ở đây
    }
  }

  // Xử lí khi người dùng click vào icon hide/show password
  const handleClickShowPassword = () => setIsShowPassword(!isShowPassword)

  // Xử lí khi click vào quên mật khẩu
  const handleForgotPassword = () => setOnOpen(true)

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={logo} alt='logo' priority width={60} height={60} />

            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              {`Welcome to ${themeConfig.templateName}! 👋🏻`}
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <Loading isLoading={isLoading} />
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            {inputLogin.map(input => {
              const { field } = input
              const message = errors[field] && errors[field].message

              return (
                <Grid key={input.field}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <TextField
                          placeholder={input.lable}
                          name={input.field}
                          label={input.lable}
                          value={value}
                          type={isShowPassword ? 'text' : input.type}
                          onChange={onChange}
                          required
                          fullWidth
                          variant='outlined'
                          style={{ marginBottom: 10 }}
                          onKeyDown={handleKeyDown}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {input.type === 'password' && (
                                  <Button onClick={handleClickShowPassword}>
                                    {isShowPassword ? <EyeOutline /> : <EyeOffOutline />}
                                  </Button>
                                )}
                              </InputAdornment>
                            )
                          }}
                        />
                      )
                    }}
                    name={input.field}
                  />

                  <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
                </Grid>
              )
            })}

            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              {/* <Link > */}
              <Button onClick={() => handleForgotPassword()}>Forgot Password?</Button>
              {/* </Link> */}
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box> */}
            {/* <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
      {onOpen && <ForgotPassword onOpen={onOpen} onClose={() => setOnOpen(false)} />}
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
