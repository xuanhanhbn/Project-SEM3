import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { CardContent, FormControl, TextField, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'antd'

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

function TransactinonDetails(props) {
  const { title, onOpen, onClose, handleSubmitForm, value } = props
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors }
  } = useForm()

  const handleClose = () => onClose()

  const onSubmit = data => {
    console.log(data)
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
            <Card fullWidth style={{ padding: '10px 15px' }}>
              <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <FormControl style={{ width: '100%' }}>
                <CardContent>
                  <Typography style={{ color: 'black', marginBottom: 10 }}>Invoice #1111</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                    <div>
                      <Typography>Status</Typography>
                      <Button disabled style={{ backgroundColor: 'green', color: 'white' }}>
                        Paid
                      </Button>
                    </div>
                    <div>
                      <Typography>Employee</Typography>
                      <Typography style={{ color: 'black' }}>Tống Minh Dương</Typography>
                    </div>
                    <div>
                      <Typography>Payment Date</Typography>
                      <Typography style={{ color: 'black' }}>Mar 15, 2023</Typography>
                    </div>
                  </Box>
                  <Box style={{ display: 'flex' }}>
                    <div>
                      <Typography style={{ marginBlock: 10 }}>Payment To</Typography>
                      <div style={{ display: 'flex', marginBottom: 10 }}>
                        <img
                          width={40}
                          height={40}
                          style={{ borderRadius: '50%', marginRight: 10 }}
                          alt='avatar'
                          src='/images/avatars/1.png'
                        />
                        <div>
                          <Typography style={{ color: 'black' }}>Nguyen Van A</Typography>
                          <Typography>mail@mail.com</Typography>
                        </div>
                      </div>
                      <Typography>Me Tri Street, Nam Tu Liem, Hanoi</Typography>
                    </div>
                    <div style={{ width: '20px' }}></div>
                    <div>
                      <Typography style={{ marginBlock: 10 }}>Payment From</Typography>
                      <div style={{ display: 'flex', marginBottom: 10 }}>
                        <img
                          width={40}
                          height={40}
                          style={{ borderRadius: '50%', marginRight: 10 }}
                          alt='avatar'
                          src='/images/favicon.png'
                        />
                        <div>
                          <Typography style={{ color: 'black' }}>Company Active</Typography>
                          <Typography>company@gamil.com</Typography>
                        </div>
                      </div>
                      <Typography>8 Ton That Thuyet , My Dinh, Hanoi</Typography>
                    </div>
                  </Box>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography style={{ marginBottom: 15 }}>Items</Typography>
                  <Box>
                    <div>
                      <Typography style={{ color: 'black' }}>Landing Page</Typography>
                      <Typography>Compalted homepage</Typography>
                    </div>
                    <Divider />
                    <div>
                      <Typography style={{ color: 'black' }}>Dashboard</Typography>
                      <Typography>Compalted homepage</Typography>
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography style={{ color: 'black', fontWeight: 500 }}>Total</Typography>
                      <Typography style={{ color: 'black', fontWeight: 500 }}>$999</Typography>
                    </div>
                  </Box>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions style={{ justifyContent: 'flex-end' }}>
                  <Button
                    size='large'
                    type='submit'
                    sx={{ mr: 2 }}
                    variant='contained'
                    onClick={handleSubmit(onSubmit)}
                  >
                    Download Details
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

export default TransactinonDetails
