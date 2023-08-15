/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { replyTopic } from '../../constants'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { Input } from 'antd'
import { Breadcrumb } from 'antd'
import { memo } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getApiDefault } from 'src/views/marketing-department/api'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { makeSelectMakerting, marketingActions } from 'src/views/marketing-department/marketingSlice'
import { useSnackbar } from 'notistack'
import Loading from 'src/components/Loading'
import Link from 'next/link'
import DisplayRealTime from 'src/components/RealTime'

const { TextArea } = Input

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Content is required')
})

function ViewTopics() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const router = useRouter()

  const globalData = router?.query

  // State
  const [dataDetails, setDataDetails] = useState(null)
  const [isLoadingCo, setIsLoadingCo] = useState(false)

  const repplyDetails = useSelector(makeSelectMakerting)
  const { isLoading } = repplyDetails
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const handleGetListTopicDetails = async () => {
    try {
      setIsLoadingCo(true)
      const url = `Forum/${globalData?.threadId}`
      const res = await getApiDefault(url)
      if (res && res.status === 200) {
        setIsLoadingCo(false)
        setDataDetails(res.data)
      }
    } catch (error) {
      setIsLoadingCo(false)

      return handleShowSnackbar('Có lỗi trong quá trình thực hiện', 'warning')
    }
  }
  useEffect(() => {
    handleGetListTopicDetails()
  }, [])

  useEffect(() => {
    if (repplyDetails?.isRepply) {
      dispatch(marketingActions.clear())
      handleGetListTopicDetails()
      handleShowSnackbar('Repply success')
      reset()
    }
  }, [repplyDetails?.isRepply])

  const onSubmit = data => {
    const id = dataDetails?.threadId
    dispatch(marketingActions.repplyTopicDetails({ id, data }))
  }

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>Marketing Department</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link replace={true} href='/marketing-department/forums'>
            Forums
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>View Topic</Breadcrumb.Item>
      </Breadcrumb>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(10, 10.25, 6)} !important` }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant='h3' sx={{ marginBottom: 2, fontWeight: 600 }}>
                {dataDetails?.topic}
              </Typography>

              <Typography sx={{ marginBottom: 2 }}>{dataDetails?.content}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 2, marginTop: '20px' }}>
        {dataDetails?.replies.map(rep => {
          return (
            <CardContent key={rep.threadId} sx={{ padding: theme => `${theme.spacing(10, 10.25, 6)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ marginRight: 10 }}>
                  <ImgStyled
                    src='/images/avatars/1.png'
                    alt='Profile Pic'
                    style={{ borderRadius: '50%', width: 60, height: 60, margin: 0 }}
                  />
                  <Typography sx={{ marginBottom: 2, fontWeight: 500, marginTop: 2 }}>{rep?.modifiedByName}</Typography>
                </Box>

                <Box>
                  <Typography sx={{ marginBottom: 2, border: '1px solid grey', borderRadius: 2, padding: 2 }}>
                    {rep?.content}
                  </Typography>
                  <Typography sx={{ fontSize: '10px' }}>
                    <DisplayRealTime time={rep?.createdAt} />
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          )
        })}
      </Card>
      <Card style={{ borderRadius: 10, marginTop: '20px' }}>
        <form>
          <CardContent sx={{ padding: theme => `${theme.spacing(10, 10.25, 6)} !important` }}>
            <Typography variant='h6' sx={{ marginBottom: 2, fontWeight: 600 }}>
              Reply To: {dataDetails?.content}
            </Typography>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextArea
                    name='content'
                    value={value}
                    placeholder='Reply...'
                    onChange={onChange}
                    rows={6}
                    style={{ marginTop: 30, borderRadius: 6 }}
                  />
                )
              }}
              name='content'
            />
            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors?.content?.message}</Typography>

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
                onClick={() => reset()}
                size='large'
                color='secondary'
                variant='outlined'
                sx={{ padding: '10px 20px' }}
              >
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </form>
      </Card>
      <Loading isLoading={isLoading || isLoadingCo} />
    </div>
  )
}

export default memo(ViewTopics)
