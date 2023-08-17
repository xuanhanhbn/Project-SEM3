import React, { useEffect, useState } from 'react'
import { Dropdown, Space } from 'antd'

// import {
//   Backdrop,
//   Button,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Divider,
//   Fade,
//   FormControl,
//   TextField,
//   Typography
// } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { Card, Delete, DotsHorizontal, EyeOutline, Grid } from 'mdi-material-ui'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required')
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
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

function Assign(props) {
  const { isOpenModal, setIsOpenModal } = props

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

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        closeAfterTransition

        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500
        //   }
        // }}
      >
        <Box style={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Assign
