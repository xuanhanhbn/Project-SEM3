/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Dropdown, Space } from 'antd'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Select from 'react-select'

import { FormControl, TextField, Typography } from '@mui/material'

import { Delete, DotsHorizontal, EyeOutline } from 'mdi-material-ui'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectTicket, ticketActions } from '../../ticketSlice'
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { makeSelectStaff } from 'src/views/staff/staffSlice'
import { makeSelectLogin } from 'src/pages/pages/login/loginSlice'

const view = <Link href='/ticket-lists/ticket-details/'>View</Link>

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  height: 400
}

const modalStyles = {
  inputFields: {
    marginTop: '20px',
    marginBottom: '15px',
    '.MuiFormControl-root': {
      marginBottom: '20px'
    }
  }
}

const validationSchema = Yup.object().shape({
  assign: Yup.string().required('Name is required')
})

function Actions(props) {
  const { item } = props

  const {
    setValue,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const globalDataStaff = useSelector(makeSelectStaff)
  const dataStaff = globalDataStaff?.dataStaff

  const getDataGetMe = useSelector(makeSelectLogin)
  const dataUser = getDataGetMe?.dataUser
  const roleUser = dataUser?.roles
  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const dispatch = useDispatch()
  const dataTicket = useSelector(makeSelectTicket)
  const { isChangeSuccess } = dataTicket

  const defaultDataTicket = dataTicket?.dataTicket

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [dataAssignSelect, setDataAssignSelect] = useState(null)
  const [dataAssignSelectTest, setDataAssignSelectTest] = useState([{}])

  const items = [
    {
      key: 'view',
      label: view,
      icon: <EyeOutline />
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Delete />
    },
    {
      key: 'assign',
      label: 'Assign',
      icon: <Delete />
    },
    {
      key: 'status',
      label: 'Status',
      children: [
        {
          key: 'open',
          value: 0,
          label: 'Open',
          disabled: true
        },
        {
          key: 'pending',
          value: 1,
          label: 'Pending',
          disabled: true
        },
        {
          key: 'processing',
          value: 2,
          label: 'Processing'
        },
        {
          key: 'done',
          value: 3,
          label: 'Done'
        },
        {
          key: 'closed',
          value: 4,
          label: 'Closed'
        }
      ]
    }
  ]

  const handleDropdownItemClick = (e, item) => {
    const ticketId = item?.ticketId

    if (e.key === 'delete') {
      console.log(e.key)
    }
    if (e.key === 'open') {
      handleChangeStatus(0)
    }
    if (e.key === 'pending') {
      handleChangeStatus(1)
    }
    if (e.key === 'processing') {
      dispatch(ticketActions.onChangeProcessing({ ticketId: ticketId }))
      handleChangeStatus(2)
    }
    if (e.key === 'done') {
      dispatch(ticketActions.onChangeComplete({ ticketId: ticketId }))
    }
    if (e.key === 'closed') {
      handleChangeStatus(4)
    }
    if (e.key === 'assign') {
      handleChangeAssign()
    }
  }

  useEffect(() => {
    if (isChangeSuccess) {
      dispatch(ticketActions.clear())
      setIsOpenModal(false)
    }
  }, [isChangeSuccess])

  const handleChangeStatus = data => console.log('data: ', data)

  const handleChangeAssign = () => {
    setIsOpenModal(true)
  }

  const handleSelectChange = selectedOption => {
    const selectedValue = selectedOption

    const newDataRequest = {
      value: selectedValue?.value,
      label: selectedValue?.label
    }
    setValue('assign', selectedValue?.value, { shouldValidate: true })
    setDataAssignSelect(selectedValue)
  }

  const handleGetOptions = () => {
    const salesItems = dataStaff?.filter(item => item?.roles?.toString() === 'Sale')

    const formattedOptions = salesItems?.map(item => ({
      value: item?.id,
      label: item?.fullName
    }))

    return formattedOptions
  }

  const onSubmit = data => {
    const newDataRequest = {
      ticketId: item?.ticketId,
      employeeId: dataAssignSelect?.value
    }
    dispatch(ticketActions.onChangeAssign(newDataRequest))
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setDataAssignSelect(null)
  }

  const defaultValue = {
    value: item?.ticketId,
    label: item?.resolver?.fullName
  }

  return (
    <>
      <Dropdown
        trigger={['click']}
        menu={{
          onClick: e => handleDropdownItemClick(e, item),
          items
        }}
      >
        <a>
          <Button variant='outline'>
            <Space>
              <DotsHorizontal />
            </Space>
          </Button>
        </a>
      </Dropdown>
      {isOpenModal && (
        <div className='container'>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500
              }
            }}
          >
            <Fade in={isOpenModal}>
              <Box sx={style}>
                <Card fullWidth>
                  <CardHeader title='Assign' titleTypographyProps={{ variant: 'h6' }} />
                  <Divider sx={{ margin: 0 }} />
                  <form>
                    <FormControl style={{ width: '100%' }}>
                      <CardContent>
                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            <Box sx={modalStyles.inputFields}>
                              <Grid>
                                {/* <Controller
                                  control={control}
                                  defaultValue={defaultValue}
                                  render={({ field }) => {
                                    return ( */}
                                <Select
                                  name='assign'
                                  onChange={handleSelectChange}
                                  options={handleGetOptions()}
                                  defaultValue={defaultValue}
                                  getOptionLabel={option => option.label}
                                  getOptionValue={option => option.value}
                                  isSearchable
                                  isDisabled={defaultValue && defaultValue?.label ? true : false}
                                  className='z-3'
                                />
                                {/* )
                                  }}
                                  name='assign'
                                /> */}
                                {/* <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>
                                  {errors?.assign?.message}
                                </Typography> */}
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider sx={{ margin: 0 }} />
                      <CardActions style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button size='large' color='secondary' variant='outlined' onClick={() => handleCloseModal()}>
                          Cancel
                        </Button>
                        <Button
                          size='large'
                          type='submit'
                          sx={{ mr: 2 }}
                          variant='contained'
                          onClick={handleSubmit(onSubmit)}
                        >
                          Submit
                        </Button>
                      </CardActions>
                    </FormControl>
                  </form>
                </Card>
              </Box>
            </Fade>
          </Modal>
        </div>
      )}
    </>
  )
}

export default Actions
