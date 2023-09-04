/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'

import { Breadcrumb } from 'antd'
import Loading from 'src/components/Loading'
import CustomTable from 'src/components/TableCommon'

import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import { Controller, useForm } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Input } from 'antd'
import { columns } from './contants'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { partnerActions, makeSelectPartner } from '../slice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import moment from 'moment'
import { Label } from 'mdi-material-ui'
import { InputLabel } from '@mui/material'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),

  description: Yup.string().required('Description is required')
})

const { TextArea } = Input

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

// const ResetButtonStyled = styled(Button)(({ theme }) => ({
//   marginLeft: theme.spacing(4.5),
//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     marginLeft: 0,
//     textAlign: 'center',
//     marginTop: theme.spacing(4)
//   }
// }))

// Styled Grid component
const StyledGrid1 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 4.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

const onChangeAvatar = file => {
  const reader = new FileReader()

  const { files } = file.target
  if (files && files.length !== 0) {
    const blobFromFile = new Blob([], { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('file', blobFromFile, files[0]?.name)
    console.log('reader: ', reader)
    reader.onload = () => setImgSrc(reader.result)
    reader.readAsDataURL(files[0])
    dispatch(partnerActions.onChangeImagePartner(formData))
  }
}

function PartnerDetail() {
  const router = useRouter()
  const globalData = router?.query
  const dispatch = useDispatch()

  const globalDataPartner = useSelector(makeSelectPartner)
  const partnerDetail = globalDataPartner?.dataDetail
  const isLoading = globalDataPartner?.isLoading
  const dataProgramByPartner = partnerDetail?.programs || []

  //get data
  useEffect(() => {
    if (globalData && Object.keys(globalData).length) dispatch(partnerActions.onGetListDetailPartner(globalData))
  }, [globalData])

  // console.log('globalData', globalData)
  // console.log('globalDataPartner', globalDataPartner)
  // console.log('partnerDetail', partnerDetail)

  const [values, setValues] = useState({
    editText: true
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const breadcrumbItems = [
    { title: 'Company Active' },
    { href: '/partners-listing', title: 'Partner List' },
    { title: 'Partner Detail' }
  ]

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickEditText = () => {
    setValues({ editText: false })
    document.getElementById('name').focus()
  }

  useEffect(() => {
    if (partnerDetail && Object.keys(partnerDetail).length) {
      setValue('name', partnerDetail?.name)
      setValue('email', partnerDetail?.email)
      setValue('description', partnerDetail?.description)
    }
  }, [partnerDetail])

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    // if (field === 'actions') {
    //   return (
    //     <div className='d-flex justify-content-center'>
    //       <Button>
    //         <EyeOutline />
    //       </Button>
    //       <Button onClick={() => setIsOpenModalDelete(true)}>
    //         <Delete style={{ color: 'red' }} />
    //       </Button>
    //     </div>
    //   )
    // }

    if (field === 'createdAt' || field === 'endDate') {
      const formatDate = moment(item?.createdAt).format('YYYY/MM/DD')

      return <div>{formatDate}</div>
    }

    if (field === 'contentType') {
      return <div>{item?.contentType || '-'}</div>
    }

    return item[field]
  }, [])

  const onSubmit = data => {
    setValues({ editText: true })

    console.log(data)
  }

  return (
    <div className='container'>
      <Loading isLoading={isLoading} />
      <Breadcrumb items={breadcrumbItems} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            style={{ marginBottom: 10, border: '1px solid' }}
            variant='outline'
            onClick={handleClickEditText}
            onMouseDown={handleMouseDownPassword}
          >
            Edit
          </Button>
          <Button
            type='submit'
            style={{ marginBottom: 10, marginLeft: 10 }}
            variant='contained'
            onMouseDown={handleMouseDownPassword}
          >
            Save
          </Button>
        </Box>
        <div style={{ width: '100%' }}>
          <Card style={{ marginBottom: 30, marginRight: 10 }}>
            <Grid container spacing={6}>
              <StyledGrid1 item xs={12} md={12} lg={12}>
                <CardContent
                  style={{
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '14px 24px',
                        marginRight: 24
                      }}
                    >
                      <ImgStyled
                        style={{ maxHeight: 100, maxWidth: 100, marginBottom: 20, marginRight: 0 }}
                        src={partnerDetail.path}
                        alt=''
                      />
                      '
                      <ButtonStyled
                        disabled={values.editText ? true : false}
                        component='label'
                        variant='contained'
                        htmlFor='account-settings-upload-image'
                      >
                        Upload Logo
                        <input
                          hidden
                          onClick={onChangeAvatar}
                          type='file'
                          accept='image/png, image/jpeg'
                          id='account-settings-upload-image'
                        />
                      </ButtonStyled>
                    </Box>
                    <Box
                      style={{
                        marginRight: 10,
                        flex: 1,
                        paddingTop: 14
                      }}
                    >
                      <div style={{ display: 'flex', marginBottom: 10 }}>
                        <InputLabel style={{ marginRight: 15 }}>Name</InputLabel>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <input
                                id='name'
                                style={{
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  color: 'black',
                                  fontWeight: 600,
                                  marginBottom: 10
                                }}
                                onChange={onChange}
                                value={value}
                                disabled={values.editText ? true : false}
                              />
                            )
                          }}
                          name='name'
                        />
                      </div>

                      <div style={{ display: 'flex', marginBottom: 10 }}>
                        <InputLabel style={{ marginRight: 15 }}>Email</InputLabel>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <input
                                style={{
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  color: 'black',
                                  fontWeight: 600
                                }}
                                disabled={values.editText ? true : false}
                                onChange={onChange}
                                value={value}
                              />
                            )
                          }}
                          name='email'
                        />
                      </div>
                      <div>
                        <InputLabel style={{ marginBottom: 10 }}>Description</InputLabel>

                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <TextArea
                                disabled={values.editText ? true : false}
                                onChange={onChange}
                                value={value}
                                style={{
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  color: 'black'
                                }}
                                autoSize
                              />
                            )
                          }}
                          name='description'
                        />
                      </div>
                    </Box>
                  </Box>
                </CardContent>
              </StyledGrid1>
            </Grid>
          </Card>
        </div>
      </form>

      <div>
        <Card>
          <Grid container spacing={6}>
            <StyledGrid1 item xs={12} md={12} lg={12}>
              <CardContent
                style={{
                  flexWrap: 'wrap',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <Typography sx={{ marginTop: 0, marginBottom: 5, color: 'black', fontSize: 24, fontWeight: 600 }}>
                    program
                  </Typography>
                </div>

                {/* table */}
                <div>
                  <CustomTable
                    data={dataProgramByPartner || []}
                    columns={columns}
                    parseFunction={parseData}
                    isShowPaging
                    classNameTable='tblCampaignReport'
                  />
                </div>
              </CardContent>
            </StyledGrid1>
          </Grid>
        </Card>
      </div>
    </div>
  )
}

export default PartnerDetail
