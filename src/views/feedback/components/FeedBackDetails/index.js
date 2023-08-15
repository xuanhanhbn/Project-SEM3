import * as React from 'react'
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
import Typography from '@mui/material/Typography'

import {
  CalendarAlert,
  CheckCircleOutline,
  DotsHorizontal,
  FaceAgent,
  ListStatus,
  MessageAlertOutline,
  MinusCircleOutline,
  SquareEditOutline
} from 'mdi-material-ui'
import IconButton from '@mui/material/IconButton'
import { DeleteOutline } from 'mdi-material-ui'

// import { useDispatch, useSelector } from 'react-redux'
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

function FeedBackDetails(props) {
  const { title, onOpen, onClose, handleSubmit, value } = props

  // const dispatch = useDispatch()

  // const globalData = useSelector(makeSelectCustomer)
  // const globalData = useSelector(makeSelectCustomer)
  const handleClose = () => onClose()

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
              <Divider sx={{ margin: 0 }} />
              <Card>
                <CardContent>
                  <Typography variant='h4'>Request</Typography>
                  <Divider sx={{ mt: 6, mb: 6 }} />
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant='h4' sx={{ mr: 4 }}>
                      <MessageAlertOutline />
                    </Typography>

                    <Typography variant='h6'>
                      Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                      invalid as well. Turns out semicolon-less style is easier and safer in TS because most gotcha edge
                      cases are type invalid as well. Turns out semicolon-less style is easier and safer in TS because
                      most gotcha edge cases are type invalid as well.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 8, mb: 8 }}>
                    <Typography variant='h4' sx={{ mr: 4 }}>
                      <CalendarAlert />
                    </Typography>

                    <Typography variant='h6'>Monday July 17</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 8, mb: 8 }}>
                    <Typography variant='h4' sx={{ mr: 4 }}>
                      <ListStatus />
                    </Typography>

                    <Button
                      sx={{ backgroundColor: '#1976d2', color: 'white !important', textTransform: 'none' }}
                      disabled
                    >
                      Received
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 8, mb: 8 }}>
                    <Typography variant='h4' sx={{ mr: 4 }}>
                      <FaceAgent />
                    </Typography>
                    <Typography variant='h6'>Tống Minh Dương</Typography>
                  </Box>
                  <Divider sx={{ mt: 6, mb: 6 }} />
                  <Typography variant='h6'>End of support?</Typography>
                  <Box sx={{ display: 'flex', margin: '10px 0px' }}>
                    <Button
                      type='submit'
                      sx={{ padding: '0px 25px', textTransform: 'none' }}
                      variant='contained'
                      startIcon={<CheckCircleOutline />}
                    >
                      Yes
                    </Button>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{ backgroundColor: 'gray', padding: '5px 25px', textTransform: 'none', ml: 15 }}
                      startIcon={<MinusCircleOutline />}
                      onClick={() => handleClose()}
                    >
                      No
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default React.memo(FeedBackDetails)
