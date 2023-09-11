/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { Breadcrumb, Divider, Modal } from 'antd'
import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { makeSelectProgram, programActions } from '../slice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'src/components/Loading'
import { Controller, useForm } from 'react-hook-form'

import moment from 'moment'

// YUP
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import DisplayRealTime from 'src/components/RealTime'

const validationSchema = Yup.object().shape({
  closeReason: Yup.string().required('Close Reason is required')
})

function ProgramDetail() {
  const dispatch = useDispatch()
  const router = useRouter()
  const globalData = router?.query

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const breadcrumbItems = [
    { title: 'Give-AID' },
    { href: '/program', title: 'Program List' },
    { title: 'Program Detail' }
  ]
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getGlobalDataDetails = useSelector(makeSelectProgram)
  const { dataDetail, isLoading, isClose, isCloseError } = getGlobalDataDetails

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  useEffect(() => {
    if (globalData && Object.keys(globalData).length) {
      dispatch(programActions.onGetDetailProgram(globalData))
    }
  }, [globalData])

  useEffect(() => {
    if (isClose) {
      dispatch(programActions.clear())
      dispatch(programActions.onGetDetailProgram(globalData))
      handleCancel()

      return handleShowSnackbar('Close program success')
    }
  }, [isClose])

  useEffect(() => {
    if (isCloseError) {
      dispatch(programActions.clear())

      return handleShowSnackbar('An error occurred, please try again.', 'error')
    }
  }, [isCloseError])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const onSubmit = data => {
    dispatch(programActions.onCloseProgram({ dataDetail, data }))
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleReturnStatus = () => {
    if (!dataDetail?.isClosed) {
      return (
        <div className='text-success' style={{ marginLeft: 2, fontWeight: 500, fontSize: 16 }}>
          Starting
        </div>
      )
    }

    return (
      <div className='text-danger' style={{ marginLeft: 2, fontWeight: 500, fontSize: 16 }}>
        Closed
      </div>
    )
  }

  const handleCalculatorPercent = () => {
    const Percentage = 0
    if (dataDetail?.target > 0 && dataDetail?.totalDonation > 0) {
      const Percentage = (dataDetail?.totalDonation / dataDetail?.target) * 100

      return Percentage
    }

    return Percentage
  }

  console.log('dataDetail: ', dataDetail)

  return (
    <div className='container'>
      <Breadcrumb items={breadcrumbItems} />
      <Loading isLoading={isLoading} />
      <div style={{ paddingBottom: 120, paddingTop: 80 }}>
        <div className='row'>
          <div className='col-lg-8 col-md-12 title'>
            <h3>{dataDetail?.name || ''}</h3>

            <div className='cause-details__content'>
              <div className='cause-card'>
                <div className='cause-card__inner'>
                  <div className='cause-card__image'>
                    <img
                      style={{ height: '400px', width: '100%' }}
                      src={`${dataDetail?.programThumbnail?.path}`}
                      alt={`Image Program Detail_${dataDetail?.name}`}
                    />
                  </div>
                  <div className='cause-card__content'>
                    <div className='cause-card__top'>
                      <div className='progress' style={{ height: '20px' }}>
                        <div
                          className='progress-bar progress-bar-striped'
                          style={{ width: handleCalculatorPercent(), height: '20px' }}
                        >
                          {handleCalculatorPercent()} %
                        </div>
                      </div>
                      <div className='justify-content-between cause-card__goals d-flex'>
                        <p>
                          <strong>Raised:</strong> $
                          {dataDetail?.totalDonation?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                        <p>
                          <strong>Goal:</strong> ${dataDetail?.target?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul className='list-unstyled cause-details__donations-list d-flex justify-content-between'>
                  <div style={{ width: '70%' }}>
                    <li>
                      <h3>
                        Start date : <span>{moment(dataDetail?.startDate).format('YYYY-MM-DD')}</span>
                      </h3>
                    </li>
                    <li>
                      <h3>
                        End date : <span>{dataDetail?.endDate}</span>
                      </h3>
                    </li>
                    <li>
                      <h3>
                        Description : <span>{dataDetail?.description}</span>
                      </h3>
                    </li>
                  </div>
                  <div>
                    <li>
                      <h3>
                        Created : <span>{dataDetail?.createdByName}</span>
                      </h3>
                    </li>
                    <li>
                      <h3 className='d-flex align-items-center'>
                        Status :<span>{handleReturnStatus()}</span>
                      </h3>
                    </li>
                  </div>
                </ul>
              </div>

              <div>
                <Button
                  style={{ backgroundColor: '#9155FD', color: 'white' }}
                  size='large'
                  variant='contained'
                  onClick={showModal}
                >
                  End of program
                </Button>
              </div>
            </div>

            <div className='result' />
          </div>
          <div className='col-lg-1'>
            <Divider type='vertical' style={{ height: '100%' }} />
          </div>
          <div className='col-lg-3 col-md-12'>
            <div className='cause-details__sidebar'>
              <div className='cause-details__donations'>
                <h4 className='cause-details__donations-title'>Donations</h4>
                <ul className='list-unstyled cause-details__donations-list'>
                  {Array.isArray(dataDetail?.enrollments) &&
                    dataDetail?.enrollments &&
                    dataDetail?.enrollments.map(item => {
                      return (
                        <li style={{ paddingTop: 20, paddingBottom: 20 }} key={item.enrollmentId}>
                          <div className='d-flex align-items-center justify-content-between'>
                            <h3 className='mb-0'>{item?.createdByName}</h3>
                            <h3>+ 5$</h3>
                          </div>
                          <span>
                            <DisplayRealTime time={item?.createdAt} />
                          </span>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal title='Close Program' open={isModalOpen} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
          <div>
            <Controller
              control={control}
              name='closeReason'
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <form>
                      <TextField
                        fullWidth
                        placeholder='Close Reason'
                        label='Close Reason'
                        id='outlined-adornment-amount'
                        required
                        name='closeReason'
                        onChange={onChange}
                        value={value}
                      />
                      {errors && errors.closeReason && (
                        <Typography className='text-danger my-2'>{errors?.closeReason?.message}</Typography>
                      )}
                    </form>
                  </>
                )
              }}
            />
          </div>
          <p className='text-danger'>Are you sure you want to end this program? This action cannot be undone.</p>
        </Modal>
      )}
    </div>
  )
}

export default ProgramDetail
