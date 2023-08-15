// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import MenuDown from 'mdi-material-ui/MenuDown'

import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    progress: 75,
    imgHeight: 20,
    title: 'Month Income',
    color: 'primary',
    subtitle: 'growthIncome',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    imgHeight: 27,
    title: 'Month Transaction',
    subtitle: 'growthTransaction',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 20,
    imgHeight: 20,
    title: 'Month Customer',
    color: 'secondary',
    subtitle: 'growthCustomer',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const TotalEarning = props => {
  const { dataDashboard } = props

  const growth = {
    growthIncome: (dataDashboard?.monthIncome / dataDashboard?.pastIncome - 1) / 100,
    growthCustomer: (dataDashboard?.monthCustomer / dataDashboard?.pastCustomer - 1) / 100,
    growthTransaction: (dataDashboard?.monthTransaction / dataDashboard?.pastTransaction - 1) / 100
  }

  return (
    <Card>
      <CardHeader
        title='Total Earning'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            $24,895
          </Typography>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 9 }} />

        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                }}
              >
                <img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box className='d-flex justify-content-center align-items-center'>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                    <Box
                      className='d-flex justify-content-center align-items-center'
                      sx={{ color: growth[item.subtitle] * 100 > 0 ? 'success.main' : 'red' }}
                    >
                      {growth[item.subtitle] * 100 < 0 && (
                        <MenuDown sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
                      )}
                      {growth[item.subtitle] * 100 > 0 && (
                        <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
                      )}

                      <Typography
                        variant='body2'
                        sx={{ fontWeight: 600, color: growth[item.subtitle] * 100 > 0 ? 'success.main' : 'red' }}
                      >
                        {growth[item.subtitle] * 100}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  {/* <LinearProgress color={item.color} value={item.progress} variant='determinate' /> */}
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
