import { Button, Divider, Modal, Typography } from '@mui/material'
import { Box } from 'mdi-material-ui'
import React from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
}

function ForgotPassword(props) {
  const { onOpen, onClose } = props

  return (
    <div>
      <Modal
        open={onOpen}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div style={style}>
          <div className='p-3 bg-white'>
            <Typography>Bạn vui lòng liên hệ với người quản lí trực tiếp để có thể khôi phục lại mật khẩu</Typography>
            <Divider />
            <div className='d-flex justify-content-center align-items-center '>
              <Button fullWidth size='large' variant='contained' onClick={() => onClose()} style={{ color: 'white' }}>
                OK
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ForgotPassword
