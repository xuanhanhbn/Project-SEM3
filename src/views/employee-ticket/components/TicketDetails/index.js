import React from 'react'
import { Breadcrumb, Button, Dropdown } from 'antd'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { Divider } from '@mui/material'
import { ClockTimeEightOutline } from 'mdi-material-ui'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

function TicketDtails() {
  const breadcrumbItems = [
    { href: '', title: 'Company Active' },
    { href: '', title: 'Ticket List' },
    { title: 'Ticket Details' }
  ]

  return (
    <div style={{ flex: 1 }}>
      <Breadcrumb items={breadcrumbItems} />
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 50 }}
      ></div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container wrap='wrap' spacing={2}>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                style={{ height: 50 }}
                title={
                  <Typography variant='h4' sx={{ fontWeight: 600 }}>
                    Customer Information
                  </Typography>
                }
              />
              <Divider />
              <div
                style={{
                  padding: '10px 25px',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <span style={{ color: '#3a354161' }}>Name</span>
                    <p style={{ fontWeight: 600, marginTop: 4 }}>Tống Minh Dương</p>
                  </div>
                  <div>
                    <ImgStyled
                      sx={{ borderRadius: 50, width: 40, height: 40 }}
                      src='/images/avatars/1686130680-bpfull.jpg'
                      alt='Profile Pic'
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ color: '#3a354161' }}>Email</span>
                  <p style={{ fontWeight: 600, marginTop: 3 }}>email@gmail.com</p>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ color: '#3a354161' }}>Phone</span>
                  <p style={{ fontWeight: 600, marginTop: 3 }}>000000000</p>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ color: '#3a354161' }}>Address</span>
                  <p style={{ fontWeight: 600, marginTop: 3 }}>Thanh Hóa</p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} md={8}>
            <Card>
              <CardHeader
                style={{ height: 50 }}
                title={
                  <Typography variant='h4' sx={{ fontWeight: 600 }}>
                    Ticket #11111
                    <Button
                      disabled
                      style={{ padding: '0px 15px', backgroundColor: 'orange', color: 'white', float: 'right' }}
                    >
                      Processing
                    </Button>
                  </Typography>
                }
              />

              <Divider />

              <Card>
                <CardContent>
                  <Typography variant='h4' sx={{ fontWeight: 600 }}>
                    How to get value of select tag in react
                  </Typography>
                  <div style={{ with: '100%', height: 1, margin: '10px 0px' }}></div>
                  <Typography>
                    You might also have noticed that some native HTML input properties are missing from the TextField
                    component. This is on purpose. The component takes care of the most used properties. Then, it's up
                    to the user to use the underlying component shown in the following demo. Still, you can use
                    inputProps (and InputProps, InputLabelProps properties) if you want to avoid some boilerplate.
                  </Typography>
                  <Divider sx={{ margin: '15px 0px' }} />
                  <Typography>
                    Ticket handler: <span>Tống Minh Dương</span>
                  </Typography>
                  <Typography>
                    Start date: <span>July 20, 2023</span>
                  </Typography>
                </CardContent>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default TicketDtails
