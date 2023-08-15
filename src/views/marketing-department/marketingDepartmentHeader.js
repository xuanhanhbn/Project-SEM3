import React, { memo } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { Forum, Account } from 'mdi-material-ui'
import { styled } from '@mui/material/styles'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

function MarketingDepartmentHeader() {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(10, 10.25, 6)} !important` }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ImgStyled src='/images/logos/OIG.jpg' alt='Profile Pic' />
          <Box>
            <Typography variant='h3' sx={{ marginBottom: 2, fontWeight: 600 }}>
              Marketing Department
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              <Forum sx={{ marginRight: 5 }} />
              Private Group
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              <Account sx={{ marginRight: 5 }} />
              Members (6)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
            <Typography sx={{ marginBottom: 2, marginRight: 5 }}>Group Admins</Typography>
            <ImgStyled
              sx={{ borderRadius: 50, width: 40, height: 40, float: 'right' }}
              src='/images/avatars/1686130680-bpfull.jpg'
              alt='Profile Pic'
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default memo(MarketingDepartmentHeader)
