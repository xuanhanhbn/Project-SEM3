/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Input } from 'antd'
import CardActions from '@mui/material/CardActions'
import Link from 'next/link'
import { Breadcrumb } from 'antd'
import TableCommon from 'src/components/TableCommon'
import { Delete } from 'mdi-material-ui'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { useCallback } from 'react'
import { columns, createTopic, listTopic } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectMakerting, marketingActions } from '../marketingSlice'
import Loading from 'src/components/Loading'
import { useSnackbar } from 'notistack'
import { Controller, useForm } from 'react-hook-form'
import { IconButton, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import moment from 'moment'

const { TextArea } = Input

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Content is required'),
  topic: Yup.string().required('Topic is required')
})

function MarketingForums() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  useEffect(() => {
    dispatch(marketingActions.getListTopic())
  }, [])

  const globalData = useSelector(makeSelectMakerting)
  const { isLoading, isError, isCreate } = globalData
  const dataDocument = globalData?.dataTopic

  useEffect(() => {
    if (isError) {
      dispatch(marketingActions.clear())
      handleShowSnackbar('An error occurred, please try again.', 'error')
    }
  }, [isError])

  useEffect(() => {
    if (isCreate) {
      dispatch(marketingActions.clear())
      handleShowSnackbar('Create Success')
      dispatch(marketingActions.getListTopic())
      reset()
    }
  }, [isCreate])

  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return (
        <>
          <Link
            passHref
            href={{
              pathname: '/marketing-department/forums/topic',
              query: { ...item }
            }}
          >
            <IconButton>
              <EyeOutline style={{ fontSize: 18, marginRight: 5 }} />
            </IconButton>
          </Link>
          {/* </Button> */}
          <Delete style={{ fontSize: 18, color: 'red' }} color='red' />
        </>
      )
    }
    if (field === 'createdAt') {
      const formatDate = moment(item?.createdAt).format('YYYY/MM/DD')

      return <div>{formatDate}</div>
    }

    return item[field]
  }, [])

  const onSubmit = data => {
    dispatch(marketingActions.createTopic(data))
  }

  const handleCancel = () => reset()

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>
          <Link href='/admin/dashboard'>Company Acttive</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href='/marketing-department/forums'>Marketing Department</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Forums</Breadcrumb.Item>
      </Breadcrumb>
      {/* <MarketingDepartmentHeader /> */}
      <Card className='mt-4'>
        <TableCommon
        
          // data={Array.isArray(dataDocument) && dataDocument.length > 0 ? dataDocument : [] }

          data={listTopic}
          parseFunction={parseData}
          columns={columns}
          isShowPaging
          classNameTable='tblCampaignReport'
        />
      </Card>
      <Card style={{ borderRadius: 10, marginTop: '20px' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(10, 10.25, 6)} !important` }}>
          <Typography variant='h4' sx={{ marginBottom: 2, fontWeight: 600 }}>
            Create New Topic
          </Typography>
          <Divider sx={{ marginBottom: 10, borderColor: 'black' }} />
          <Typography variant='h5' sx={{ marginBottom: 5, fontWeight: 600 }}>
            Topic Title
          </Typography>
          {createTopic.map(topic => {
            const { field } = topic
            const message = errors[field] && errors[field].message

            return (
              <>
                <Controller
                  key={`createTopic_${topic.field}`}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    if (topic.field === 'topic') {
                      return (
                        <TextField
                          name={topic.field}
                          label={topic.name}
                          placeholder={topic.name}
                          onChange={onChange}
                          value={value}
                          fullWidth
                        />
                      )
                    }

                    return (
                      <TextArea
                        name={topic.field}
                        value={value}
                        placeholder={topic.name}
                        onChange={onChange}
                        rows={6}
                        style={{ marginTop: 30, borderRadius: 6 }}
                      />
                    )
                  }}
                  name={topic.field}
                />
                <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</Typography>
              </>
            )
          })}

          <CardActions>
            <Button
              onClick={handleSubmit(onSubmit)}
              size='large'
              type='submit'
              sx={{ padding: '10px 20px' }}
              variant='contained'
            >
              Submit
            </Button>
            <Button
              onClick={() => handleCancel()}
              size='large'
              color='secondary'
              variant='outlined'
              sx={{ padding: '10px 20px' }}
            >
              Cancel
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Loading isLoading={isLoading} />
    </div>
  )
}

export default memo(MarketingForums)
