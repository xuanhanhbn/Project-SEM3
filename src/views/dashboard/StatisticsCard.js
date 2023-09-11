// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useEffect, useState } from 'react'

const StatisticsCard = props => {
  const { dataDashboard } = props

  const [uniqueProgramNames, setUniqueProgramNames] = useState(0)
  const [uniquePartnerName, setUniquePartnerName] = useState('')

  // tổng số lượt donation
  const totalTransactions = dataDashboard.length

  // tổng số program có phát sinh donation
  // const uniqueProgramNames = new Set()

  useEffect(() => {
    if (Array.isArray(dataDashboard) && dataDashboard.length > 0) {
      for (const data of dataDashboard) {
        setUniqueProgramNames(data?.programName)
        setUniquePartnerName(data?.partnerName)
      }
    }
  }, [dataDashboard])

  // tổng số program có phát sinh donation
  // const uniquePartnerName = new Set()

  // for (const data of dataDashboard) {
  //   uniquePartnerName.add(data.partnerName)
  // }

  const salesData = [
    {
      field: 'monthCustomer',
      title: `+${uniqueProgramNames.size} Program has generated donation`,
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      field: 'monthIncome',
      title: `+${uniquePartnerName.size} Partner has generated donation`,
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      field: 'monthTransaction',
      color: 'warning',
      title: `+${totalTransactions} Donations`,
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    }
  ]

  const renderStats = data => {
    const renderValue = item => {
      return <Typography variant='h6'>{data[item.field]}</Typography>
    }

    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            {renderValue(item)}
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 100% growth
            </Box>
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(dataDashboard)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
