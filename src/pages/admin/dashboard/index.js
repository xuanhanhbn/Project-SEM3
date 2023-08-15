/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginPageActions, makeSelectLogin } from 'src/pages/pages/login/loginSlice'
import IncomOverview from 'src/views/dashboard/InComOverview'
import { dashboardActions, makeSelectDashBoard } from 'src/views/dashboard/dashboardSlice'
import Loading from 'src/components/Loading'
import { getApiDefault } from 'src/views/dashboard/api'
import { Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const [isLoadingCo, setIsLoadingCo] = useState(false)

  const loginSuccess = useSelector(makeSelectLogin)
  const getDataDashboard = useSelector(makeSelectDashBoard)
  const dataDashboard = getDataDashboard?.dataDashBoard
  const { isLoading } = getDataDashboard
  const { isSuccess, dataLogin } = loginSuccess
  const dataUser = loginSuccess?.dataUser
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  useEffect(() => {
    if (dataLogin && dataUser?.roles?.toString() === 'Admin') {
      dispatch(dashboardActions.getListDashBoard())
    } else {
      router.back()
    }
  }, [dataLogin])

  // const handleGetUrlImage = async () => {
  //   const idPicture = JSON.parse(localStorage.getItem('dataUser'))

  //   try {
  //     setIsLoadingCo(true)
  //     const url = `Document/File/${idPicture?.profilePictureId}`
  //     const res = await getApiDefault(url)
  //     if (res && res.status === 200) {
  //       setIsLoadingCo(false)
  //       localStorage.setItem('urlImage', JSON.stringify(url))
  //     }
  //   } catch (error) {
  //     setIsLoadingCo(false)

  //     return handleShowSnackbar('Có lỗi trong quá trình thực hiện', 'warning')
  //   }
  // }

  return (
    <ApexChartWrapper className='d-flex justify-content-center align-items-center'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <StatisticsCard dataDashboard={dataDashboard} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <WeeklyOverview dataDashboard={dataDashboard} />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <IncomOverview dataDashboard={dataDashboard} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TotalEarning dataDashboard={dataDashboard} />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={4}>
             <Grid container spacing={6}>
               <Grid item xs={6}>
                 <CardStatisticsVerticalComponent
                   stats='$25.6k'
                   icon={<Poll />}
                   color='success'
                   trendNumber='+42%'
                   title='Total Profit'
                   subtitle='Weekly Profit'
                 />
               </Grid>
               <Grid item xs={6}>
                 <CardStatisticsVerticalComponent
                   stats='$78'
                   title='Refunds'
                   trend='negative'
                   color='secondary'
                   trendNumber='-15%'
                   subtitle='Past Month'
                   icon={<CurrencyUsd />}
                 />
               </Grid>
               <Grid item xs={6}>
                 <CardStatisticsVerticalComponent
                   stats='862'
                   trend='negative'
                   trendNumber='-18%'
                   title='New Project'
                   subtitle='Yearly Project'
                   icon={<BriefcaseVariantOutline />}
                 />
               </Grid>
               <Grid item xs={6}>
                 <CardStatisticsVerticalComponent
                   stats='15'
                   color='warning'
                   trend='negative'
                   trendNumber='-18%'
                   subtitle='Last Week'
                   title='Sales Queries'
                   icon={<HelpCircleOutline />}
                 />
               </Grid>
             </Grid>
           </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
             <SalesByCountries />
           </Grid> */}
        {/* <Grid item xs={12} md={12} lg={8}>
             <DepositWithdraw />
           </Grid>
           <Grid item xs={12}>
             <Table />
           </Grid> */}
      </Grid>
      <Loading isLoading={isLoading} />
    </ApexChartWrapper>
  )
}

export default Dashboard
