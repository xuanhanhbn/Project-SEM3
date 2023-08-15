// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { Carousel, Breadcrumb } from 'antd'
import React, { memo, useCallback, useRef, useState } from 'react'
import TableCommon from 'src/components/TableCommon'
import Stack from '@mui/material/Stack'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import RequestSupport from 'src/components/RequestSupport'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import InputLabel from '@mui/material/InputLabel'
import { custommerFeedBack, inputCustommerRequestr } from './constants'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import CardHeader from '@mui/material/CardHeader'
import { columns, fakeDataRequest, itemsDrop } from './constants'
import {
  CalendarAlert,
  CheckCircleOutline,
  DotsHorizontal,
  EyeOutline,
  FaceAgent,
  ListStatus,
  MessageAlertOutline,
  MinusCircleOutline,
  SquareEditOutline
} from 'mdi-material-ui'
import Button from '@mui/material/Button'
import FormCreate from './components/FormCreate'
import IconButton from '@mui/material/IconButton'
import { DeleteOutline } from 'mdi-material-ui'
import FeedBackDetails from './components/FeedBackDetails'

const FeedBacks = () => {
  const ref = useRef()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [isOpenModalFeed, setIsOpenModalFeed] = useState(false)

  const [isOpenModalSupport, setIsOpenModalSupport] = useState(false)

  // Xử lí mở modal
  const handleOpenModalCreateFeed = () => setIsOpenModal(true)

  // Xử lí đóng modal
  const handleCloseModalFeed = () => setIsOpenModal(false)

  // Xử lí mở modal
  const handleOpenModalSupport = () => setIsOpenModalSupport(true)

  // Xử lí đóng modal
  const handleCloseModalSupport = () => setIsOpenModalSupport(false)

  // Xử lí mở modal
  const handleOpenModalFeedDetails = () => setIsOpenModalFeed(true)

  // Xử lí đóng modal
  const handleCloseModalFeedDetails = () => setIsOpenModalFeed(false)

  // Xử lí render ra STT & actions
  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return (
        <>
          <Link href='' passHref>
            <IconButton onClick={() => handleOpenModalFeedDetails()} color='secondary'>
              <EyeOutline style={{ fontSize: 18 }} />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              alert('delete')
            }}
            color='error'
          >
            <DeleteOutline />
          </IconButton>
        </>
      )
    }

    return item[field]
  }, [])

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>Company Acttive</Breadcrumb.Item>
        <Breadcrumb.Item>Feed Backs</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Grid container spacing={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={10} sm={3}>
            <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
              <Typography variant='h4' sx={{ marginBottom: 10.5 }}>
                Top FeedBacks
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Full Access</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>15 Members</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Access all Features</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Lifetime Free Update</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
          <Grid item sm={7} xs={12}>
            <CardContent>
              <Carousel autoplay={2000} ref={ref}>
                {custommerFeedBack.map(fb => {
                  return (
                    <div key={fb.custommerName}>
                      <Card
                        sx={{
                          border: 0,
                          boxShadow: 0,
                          color: 'common.white',
                          backgroundColor: 'info.main',
                          height: 200
                        }}
                      >
                        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                alt='Mary Vaughn'
                                src={fb.avatar}
                                sx={{ width: 34, height: 34, marginRight: 2.75 }}
                              />
                              <Typography variant='body2' sx={{ color: 'common.white' }}>
                                {fb.custommerName}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                            {fb.feedback}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </Carousel>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ m: 8, float: 'right' }}>
        <Button onClick={() => handleOpenModalCreateFeed()} type='submit' variant='contained' size='large'>
          Request support
        </Button>
      </Box>
      <Box>
        <TableCommon
          data={fakeDataRequest || []}
          parseFunction={parseData}
          columns={columns}
          isShowPaging
          classNameTable='tblCampaignReport '
        />
      </Box>
      {isOpenModal && (
        <FormCreate
          onOpen={isOpenModal}
          onClose={() => handleCloseModalFeed()}
          title='Send request'
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{ minWidth: 340 }}
        />
      )}
      {isOpenModalFeed && (
        <FeedBackDetails
          onOpen={isOpenModalFeed}
          onClose={() => handleCloseModalFeedDetails()}
          title='Add Customer'
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{ minWidth: 340 }}
        />
      )}
      {isOpenModalSupport && (
        <RequestSupport
          onOpen={isOpenModalSupport}
          onClose={() => handleCloseModalSupport()}
          data={fakeDataRequest}
          title='Add Customer'
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{ minWidth: 340 }}
        />
      )}

      <Box></Box>
    </div>
  )
}

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

export default memo(FeedBacks)
