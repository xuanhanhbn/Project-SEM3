import React, { useCallback, useEffect, useState } from 'react'

import { Breadcrumb } from 'antd'
import Loading from 'src/components/Loading'
import CustomTable from 'src/components/TableCommon'

import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { DoneOutline, EditOutlined } from '@material-ui/icons'
import Card from '@mui/material/Card'
import { Input } from 'antd'
import { columns } from './constant'

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

    // dispatch(loginPageActions.userInfo())
    dispatch(settingAction.changeAvatar(formData))
  }
}

function PartnerDetail() {
  const [imgSrc, setImgSrc] = useState('/images/avatars/R.png')

  const [values, setValues] = useState({
    email: 'email@gmail.com',
    name: 'Partner Name',
    phone: '0123456789',
    editText: true,
    description:
      'Với các cuộc tranh luận về AI, điều quan trọng là các công ty công nghệ phải cởi mở về công việc họ đang làm và tìm ra những cách mới để thu hút mọi người tham gia vào quá trình này.'
  })

  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Partner List' }, { title: 'Partner Detail' }]

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickEditText = () => {
    setValues({ ...values, editText: !values.editText })
  }

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

  return (
    <div className='container'>
      {/* <Loading isLoading={isLoading} /> */}
      <Breadcrumb items={breadcrumbItems} />

      <Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ marginBottom: 10 }}
          variant='contained'
          onClick={handleClickEditText}
          onMouseDown={handleMouseDownPassword}
        >
          <span style={{ marginRight: 5 }}>{values.editText ? 'Edit' : 'Save'}</span>
          {values.editText ? <EditOutlined /> : <DoneOutline />}
        </Button>
      </Box>
      <div style={{ width: '100%' }}>
        <Card style={{ marginBottom: 30 }}>
          <Grid container spacing={6}>
            <StyledGrid1 item xs={12} md={12} lg={12}>
              <CardContent
                style={{
                  display: 'flex',
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
                      src={imgSrc}
                      alt='Profile Pic'
                    />
                    <ButtonStyled
                      disabled={values.editText ? true : false}
                      component='label'
                      variant='contained'
                      htmlFor='account-settings-upload-image'
                    >
                      Upload Logo
                      <input
                        hidden
                        type='file'
                        onChange={onChangeAvatar}
                        accept='image/png, image/jpeg'
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      marginRight: 10
                    }}
                  >
                    <input
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'black',
                        fontSize: 24,
                        fontWeight: 600
                      }}
                      disabled={values.editText ? true : false}
                      defaultValue={values.name}
                    />
                    <input
                      style={{ border: 'none', backgroundColor: 'transparent', color: 'black' }}
                      disabled={values.editText ? true : false}
                      defaultValue={values.email}
                    />
                    <input
                      style={{ border: 'none', backgroundColor: 'transparent', color: 'black' }}
                      disabled={values.editText ? true : false}
                      defaultValue={values.phone}
                    />
                  </Box>
                </Box>
                <Box style={{ paddingTop: 14, flex: 1 }}>
                  <Typography sx={{ marginTop: 0, marginBottom: 5, color: 'black', fontSize: 24, fontWeight: 600 }}>
                    description
                  </Typography>
                  <TextArea
                    disabled={values.editText ? true : false}
                    defaultValue={values.description}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'black'
                    }}
                    autoSize
                  />
                </Box>
              </CardContent>
            </StyledGrid1>
          </Grid>
        </Card>
      </div>
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
                    data={[]}
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
