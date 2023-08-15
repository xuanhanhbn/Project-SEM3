/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { memo, useCallback, useState } from 'react'

// ** MUI Imports
import { Button, TextField, Link, Typography, IconButton } from '@mui/material'

import { Breadcrumb, Dropdown } from 'antd'

// import BuildIcon from '@mui/icons-material/Build'
import { Controller, useForm } from 'react-hook-form'
import TableCommon from 'src/components/TableCommon'
import { listCustomerService, listStatusService, items } from './constant'
import CustommerSeveviceStaff from './components/MenuStatus/CustomerServiceStaff'
import Actions from './components/Actions'

const CustomerCare = () => {
  const [age, setAge] = useState('')

  const handleChangeName = event => {
    setAge(event.target.value)
  }

  const { control, handleSubmit } = useForm()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const onSubmit = data => console.log('data: ', data)

  const role = 'admin'

  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'serviceStaff') {
      return (
        <>
          <CustommerSeveviceStaff role={role} />
        </>
      )
    }

    if (field === 'actions') {
      return <Actions />
    }
    if (field === 'status') {
      if (item.status === 'Not Processed') {
        return (
          <div style={{ backgroundColor: 'rgb(244 196 196)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'red', textAlign: 'center' }}>Not Processed</Typography>
          </div>
        )
      }
      if (item.status === 'In Processed') {
        return (
          <div style={{ backgroundColor: 'rgb(244 243 196)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'warning.main', textAlign: 'center' }}>In Processed</Typography>
          </div>
        )
      }
      if (item.status === 'Processed') {
        return (
          <div style={{ backgroundColor: 'rgb(205 246 215)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'success.main', textAlign: 'center' }}>Processed</Typography>
          </div>
        )
      }
    }

    return item[field]
  }, [])

  const fakeData = [
    {
      customerName: 'hanhnx',
      phoneNumber: '0984312342',
      email: 'hanhnx@gmail.com',
      problem: 'Abc...',
      status: 'Not Processed'
    },
    {
      customerName: 'hanhnx',
      phoneNumber: '0984312342',
      email: 'hanhnx@gmail.com',
      problem: 'Abc...',
      status: 'In Processed'
    },
    {
      customerName: 'hanhnx',
      phoneNumber: '0984312342',
      email: 'hanhnx@gmail.com',
      problem: 'Abc...',
      status: 'Processed'
    }
  ]

  return (
    <div style={{ flex: 1 }}>
      <Breadcrumb>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
        <Breadcrumb.Item>Customer Service</Breadcrumb.Item>
      </Breadcrumb>
      {/* Button Add */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 50 }}>
        {/* <Loading isLoading={isLoading} /> */}
        {/* <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            {listCustomerService.map(inputSearch => (
              <div key={`inputSearchCustormer_${inputSearch.field}`}>
                <Controller
                  key={inputSearch.field}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        placeholder={inputSearch.label}
                        name={inputSearch.field}
                        label={inputSearch.label}
                        value={value}
                        onChange={onChange}
                        required
                        fullWidth
                      />
                    )
                  }}
                  name={inputSearch.field}
                />
              </div>
            ))}
            <Button
              style={{ backgroundColor: '#9155FD', color: 'white' }}
              onClick={handleSubmit(onSubmit)}
              size='large'
              variant='contained'
            >
              <Magnify />
            </Button>
            <Button
              size='large'
              variant='contained'
              sx={{ marginLeft: 10 }}
              onClick={() => handleOpenModalCreateCustomer()}
            >
              Thêm mới
            </Button>
          </Stack>
        </form> */}
      </div>
      {/* Table */}
      <div className='table-data mt-3'>
        <TableCommon
          data={fakeData || []}
          parseFunction={parseData}
          columns={listCustomerService}
          isShowPaging
          classNameTable='tblCampaignReport'

          // onChangePage={page => onChangePage(page - 1)}
          // totalCountData={(dataList && dataList.totalElements) || 0}
          // defaultPage={dataRequest.page + 1}
          // currentPage={dataRequest.page + 1}
          // totalDisplay={dataRequest.size || 10}
        />
      </div>
      {/* {isOpenMenu && <MenuStatus isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />} */}
    </div>
  )
}

export default CustomerCare
