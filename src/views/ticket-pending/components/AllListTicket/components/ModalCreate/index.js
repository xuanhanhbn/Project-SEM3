import React, { useEffect } from 'react'
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
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FormControl, TextField, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { inputAddCustomer } from './constant'
import { useDispatch, useSelector } from 'react-redux'
import { postApiDefault } from './api'
import { customerActions, makeSelectCustomer } from 'src/views/custommer-dashboard/customerSlice'

// import { customerActions, makeSelectCustomer } from '../../customerSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24
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
  content: Yup.string().required('Content is required'),
  ticketCategory: Yup.string().required('Ticket Category is required')
})
function ModalCreate(props) {
  const { title, onOpen, onClose, handleSubmitForm, value } = props
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const globalDataCustomer = useSelector(makeSelectCustomer)
  const handleClose = () => onClose()

  const onSubmit = async data => {
    const validationToken = JSON.parse(localStorage.getItem('loginPage'))
    const customerId = 'd94855f6-5533-42ce-b7d5-08db8cdfdeed'

    const newDataRequest = {
      ...data,
      validationToken: validationToken?.token,
      customerId: customerId,
      ticketCategory: Number(data?.ticketCategory)
    }

    try {
      const url = `CustomerTicket/Create`
      const res = await postApiDefault(url, newDataRequest)
      if (res && res.status === 200) {
        console.log('res: ', res)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={onOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={onOpen}>
          <Box sx={style}>
            <Card fullWidth>
              <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <FormControl style={{ width: '100%' }}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Box sx={modalStyles.inputFields}>
                        {inputAddCustomer.map(input => {
                          const { field } = input
                          const message = errors[field] && errors[field].message

                          return (
                            <Grid key={input.field}>
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                  return (
                                    <TextField
                                      key={input.field}
                                      placeholder={input.lable}
                                      name={input.field}
                                      label={input.lable}
                                      value={value}
                                      onChange={onChange}
                                      required
                                      fullWidth
                                      style={{ marginBottom: 10 }}
                                    />
                                  )
                                }}
                                name={input.field}
                              />
                              <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>
                                {message}
                              </Typography>
                            </Grid>
                          )
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions style={{ justifyContent: 'flex-end' }}>
                  <Button size='large' color='secondary' variant='outlined' onClick={() => handleClose()}>
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
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalCreate
