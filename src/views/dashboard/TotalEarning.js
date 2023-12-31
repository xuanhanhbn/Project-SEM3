/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

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

import { useDispatch, useSelector } from 'react-redux'
import { dashboardActions, makeSelectDashBoard } from './dashboardSlice'
import { FormatListNumbered } from 'mdi-material-ui'

// const data = [
//   {
//     progress: 75,
//     imgHeight: 20,
//     title: 'Month Income',
//     color: 'primary',
//     subtitle: 'growthIncome',
//     imgSrc: '/images/cards/logo-zipcar.png'
//   },
//   {
//     progress: 50,
//     color: 'info',
//     imgHeight: 27,
//     title: 'Month Transaction',
//     subtitle: 'growthTransaction',
//     imgSrc: '/images/cards/logo-bitbank.png'
//   },
//   {
//     progress: 20,
//     imgHeight: 20,
//     title: 'Month Customer',
//     color: 'secondary',
//     subtitle: 'growthCustomer',
//     imgSrc: '/images/cards/logo-aviato.png'
//   }
// ]

const TotalEarning = props => {
  const { dataDashboard } = props
  const totalMonth = dataDashboard?.time?.totalDonationsMonth || 0

  const dispatch = useDispatch()
  const globalDataDaboard = useSelector(makeSelectDashBoard)

  // Call api khi lần đầu vào trang
  useEffect(() => {
    dispatch(dashboardActions.getListDashBoard())
  }, [])

  // tổng tiền dontaion
  const totalAmount =
    dataDashboard &&
    dataDashboard?.length > 0 &&
    dataDashboard?.reduce((total, donation) => {
      return total + donation.amount || 0
    }, 0)

  // 3 donation có amount lớn nhất

  let donationsCopy = dataDashboard && dataDashboard?.leng > 0 && dataDashboard?.slice()

  const getTopThreeDonations = donations => {
    if (donations) {
      donations?.sort((a, b) => b?.amount - a?.amount)

      return donations?.slice(0, 3)
    }
  }

  const top3Donations = getTopThreeDonations(donationsCopy)

  const growth = {
    growthIncome: (dataDashboard?.monthIncome / dataDashboard?.pastIncome - 1) * 100,
    growthCustomer: (dataDashboard?.monthCustomer / dataDashboard?.pastCustomer - 1) * 100,
    growthTransaction: (dataDashboard?.monthTransaction / dataDashboard?.pastTransaction - 1) * 100
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
            ${totalMonth}
          </Typography>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 9 }} />

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
            <Box className=' justify-content-center align-items-center'>
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                {dataDashboard?.activity?.mostPartners?.title || ''}
              </Typography>
            </Box>
            <Typography variant='caption'>Most Program Partners</Typography>
          </Box>

          <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              {dataDashboard?.activity?.mostPartners?.programs || ''} Programs
            </Typography>
            {/* <LinearProgress color={item.color} value={item.progress} variant='determinate' /> */}
          </Box>
        </Box>

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
            <Box className=' justify-content-center align-items-center'>
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                {dataDashboard?.activity?.mostDonated?.title || ''}
              </Typography>
            </Box>
            <Typography variant='caption'>Donate the most</Typography>
          </Box>

          <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              ${dataDashboard?.activity?.mostDonated?.donations || ''}
            </Typography>
            {/* <LinearProgress color={item.color} value={item.progress} variant='determinate' /> */}
          </Box>
        </Box>

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
            <Box className=' justify-content-center align-items-center'>
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                {dataDashboard?.activity?.mostRegistered?.title || ''}
              </Typography>
            </Box>
            <Typography variant='caption'>Most subscriptions</Typography>
          </Box>

          <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              {dataDashboard?.activity?.mostRegistered?.registered || ''} Registered
            </Typography>
            {/* <LinearProgress color={item.color} value={item.progress} variant='determinate' /> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TotalEarning
