/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'

import { Breadcrumb, Upload } from 'antd'
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
import { EyeOutline } from 'mdi-material-ui'
import { UploadOutlined } from '@ant-design/icons'
import { Label } from 'mdi-material-ui'
import { InputLabel } from '@mui/material'
import Link from 'next/link'
import { beforeUpload, getBase64 } from 'src/utils/common'
import { useSnackbar } from 'notistack'

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

function PartnerDetail() {
  const breadcrumbItems = [
    { title: 'Company Active' },
    { href: '/partners-listing', title: 'Partner List' },
    { title: 'Partner Detail' }
  ]

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const router = useRouter()
  const globalData = router?.query
  const dispatch = useDispatch()

  const globalDataPartner = useSelector(makeSelectPartner)
  const { isUploadImage, dataImage, isUpdateSuccess } = globalDataPartner
  const partnerDetail = globalDataPartner?.dataDetail
  const isLoading = globalDataPartner?.isLoading
  const dataProgramByPartner = partnerDetail?.programs || []

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const [values, setValues] = useState({
    editText: true
  })

  //get data
  useEffect(() => {
    if (globalData && Object.keys(globalData).length) {
      dispatch(partnerActions.onGetListDetailPartner(globalData))
    }
  }, [globalData])

  useEffect(() => {
    if (isUploadImage) {
      dispatch(partnerActions.clear())

      return handleShowSnackbar('Upload Image Success')
    }
  }, [isUploadImage])

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(partnerActions.clear())
      dispatch(partnerActions.onGetListDetailPartner(globalData))

      return handleShowSnackbar('Success')
    }
  }, [isUpdateSuccess])

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

        dispatch(partnerActions.onUploadImagePartner(formData))
      })
    }
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

    if (field === 'target') {
      const formatNumber = item[field].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return `${formatNumber} $`
    }

    if (field === 'isClosed') {
      if (!item.isClosed) {
        return <div className='text-success font-weight-bold'>Starting</div>
      }

      return <div className='text-danger font-weight-bold'>Closed</div>
    }

    if (field === 'createdAt' || field === 'endDate') {
      const formatDate = moment(item?.createdAt).format('YYYY/MM/DD')

      return <div>{formatDate}</div>
    }

    if (field === 'contentType') {
      return <div>{item?.contentType || '-'}</div>
    }
    if (field === 'actions') {
      return (
        <div className='d-flex justify-content-center'>
          <Link
            passHref
            href={{
              pathname: '/program/program-detail',
              query: { ...item, type: 'not' }
            }}
          >
            <Button>
              <EyeOutline />
            </Button>
          </Link>
        </div>
      )
    }

    return item[field]
  }, [])

  const onSubmit = data => {
    setValues({ editText: true })

    const newDataRequest = {
      ...data,
      partnerId: globalData?.partnerId,
      partnerThumbnailId: dataImage?.attachmentId
    }
    dispatch(partnerActions.onUpdateDetailPartner(newDataRequest))
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
                        marginRight: 24,
                        width: '40%'
                      }}
                    >
                      <ImgStyled
                        style={{ maxHeight: 100, maxWidth: 100, marginBottom: 20, marginRight: 0 }}
                        src={partnerDetail?.partnerThumbnail?.path}
                        alt={`Image Logo Detail_${partnerDetail?.name}`}
                      />
                      <Upload
                        style={{ marginBottom: 10 }}
                        maxCount={1}
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
                    </Box>
                    <Box
                      style={{
                        marginRight: 10,
                        flex: 1,
                        paddingTop: 14
                      }}
                    >
                      <div className='d-flex align-items-center mb-2'>
                        <InputLabel style={{ marginRight: 15 }}>Name: </InputLabel>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <input
                                id='name'
                                style={{
                                  color: 'black',
                                  fontWeight: 600,
                                  border: !values.editText ? '1px solid #eee' : 'none',
                                  backgroundColor: !values.editText ? '#eee' : 'transparent',
                                  padding: !values.editText ? 10 : 0,
                                  borderRadius: !values.editText ? 8 : 0
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

                      <div className='d-flex align-items-center mb-2'>
                        <InputLabel style={{ marginRight: 15 }}>Email</InputLabel>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <input
                                style={{
                                  border: !values.editText ? '1px solid #eee' : 'none',
                                  backgroundColor: !values.editText ? '#eee' : 'transparent',
                                  padding: !values.editText ? 10 : 0,
                                  borderRadius: !values.editText ? 8 : 0,
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
                      <div className='d-flex align-items-center'>
                        <InputLabel style={{ overflow: 'visible' }}>Description: </InputLabel>

                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <TextArea
                                disabled={values.editText ? true : false}
                                onChange={onChange}
                                value={value}
                                style={{
                                  border: !values.editText ? '1px solid #eee' : 'none',
                                  borderRadius: !values.editText ? 8 : 0,
                                  color: 'black'
                                }}
                                showCount
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
                    {`Program By ${partnerDetail?.name}`}
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
