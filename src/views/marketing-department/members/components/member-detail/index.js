import React from 'react'
import { Breadcrumb, Typography } from 'antd'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

function UserDetails() {
  return (
    <div>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>Marketing Department</Breadcrumb.Item>
        <Breadcrumb.Item>Members</Breadcrumb.Item>
        <Breadcrumb.Item>Member Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Card sx={{ pl: 10, pr: 10 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <ImgStyled src='/images/avatars/1.png' alt='Profile Pic' />
            <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='h4' style={{ fontWeight: 600 }}>
                Robert Meyer
              </Typography>
              <Typography variant='h6' style={{ fontWeight: 500 }}>
                Team Manager
              </Typography>
              <Typography variant='caption'>London, UK</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          mt: 8,
          pl: 10,
          pr: 10
        }}
      >
        <CardContent>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h2' style={{ fontWeight: 600 }}>
              Personal Infomation
            </Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>First Name</Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  Meyer
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Last Name</Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  Robert
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Email Address </Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  robertmeyer@gmail.com
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Phone </Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  +09 3636 3636 666
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Bio </Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  Team Manager
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          mt: 8,
          pl: 10,
          pr: 10
        }}
      >
        <CardContent>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h2' style={{ fontWeight: 600 }}>
              Address
            </Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Country</Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  United Kingdom
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>City/State</Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  Leeds, East London
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Postal Code </Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  ERT 2345
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ p: 10 }}>
                <Typography variant='caption'>Tax Id </Typography>
                <Typography variant='h6' style={{ fontWeight: 500 }}>
                  3636 666
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserDetails
