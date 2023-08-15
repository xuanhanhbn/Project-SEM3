/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { Controller, useForm } from 'react-hook-form'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import { Delete, DeleteOutline, EyeOutline, Magnify } from 'mdi-material-ui'
import { columsAllTicket, inputSearchTicket, statusTicket } from '../../constants'
import TableCommon from 'src/components/TableCommon'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectTicket, ticketActions } from '../../ticketSlice'
import Select from 'react-select'
import Actions from '../Actions'
import Loading from 'src/components/Loading'

function MyTicketList() {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '200px',
      height: '50px'
    })
  }

  const { control, handleSubmit, setValue } = useForm()
  const dispatch = useDispatch()
  const globalDataMyTicket = useSelector(makeSelectTicket)
  const { isLoading, isChangeSuccess } = globalDataMyTicket
  const dataMyTicket = globalDataMyTicket?.dataMyTicket

  const [valueTicket, setValueTicket] = useState({})

  const onSubmit = data => {
    console.log('datA: ', data)

    // dispatch(ticketActions.getListTicket(data))
  }

  useEffect(() => {
    dispatch(ticketActions.getListMyTicket())
  }, [])
  useEffect(() => {
    if (isChangeSuccess) {
      dispatch(ticketActions.clear())
      dispatch(ticketActions.getListMyTicket())
    }
  }, [isChangeSuccess])

  // tự render actions khi có thêm items mới
  const parseData = useCallback((item, field, index) => {
    // if (Array.isArray(dataTicket) && dataTicket.length > 0) {
    if (field === 'index') {
      return index + 1
    }
    if (field === 'actions') {
      return <Actions item={item} />
    }
    if (field === 'status') {
      if (item.status === 'Opened') {
        return (
          <div style={{ backgroundColor: 'rgb(244 196 196)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'red', textAlign: 'center' }}>Open</Typography>
          </div>
        )
      }
      if (item.status === 'Pending') {
        return (
          <div style={{ backgroundColor: 'rgb(244 243 196)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'warning.main', textAlign: 'center' }}>Pending</Typography>
          </div>
        )
      }
      if (item.status === 'Processing') {
        return (
          <div style={{ backgroundColor: 'rgb(205 246 215)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'success.main', textAlign: 'center' }}>Processing</Typography>
          </div>
        )
      }
      if (item.status === 'Done') {
        return (
          <div style={{ backgroundColor: 'rgb(205 246 215)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'success.main', textAlign: 'center' }}>Done</Typography>
          </div>
        )
      }
      if (item.status === 'Closed') {
        return (
          <div style={{ backgroundColor: 'rgb(205 246 215)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'success.main', textAlign: 'center' }}>Closed</Typography>
          </div>
        )
      }
    }
    if (field === 'fullName') {
      return <div>{item?.resolver?.fullName}</div>
    }
    if (field === 'name') {
      return <div>{item?.requestor?.name}</div>
    }
    if (field === 'email') {
      return <div>{item?.requestor?.email}</div>
    }

    // }

    return item[field]
  }, [])

  const handleSelectChange = selectedOption => {
    const selectedValue = selectedOption

    // const newDataRequest = {
    //   status: selectedOption?.value
    // }
    // dispatch(ticketActions.getListMyTicket(newDataRequest))
    setValue('status', selectedValue?.value, { shouldValidate: true })
    setValueTicket(selectedValue)
  }

  return (
    <div>
      {/* Search */}
      <div style={{ float: 'right', marginBottom: 15 }}>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            {inputSearchTicket.map(inputSearch => (
              <div key={`inputSearchTicket_${inputSearch.field}`}>
                <Controller
                  key={inputSearch.field}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        onChange={handleSelectChange}
                        options={statusTicket}
                        value={valueTicket}
                        isSearchable
                        className='z-3'
                        styles={customStyles}
                      />
                    )
                  }}
                  name={inputSearch.field}
                />
              </div>
            ))}
            <Button onClick={handleSubmit(onSubmit)} size='large' variant='outlined'>
              <Magnify />
            </Button>
            {/* <Button size='large' variant='contained' onClick={() => handleOpenModalCreateCustomer()}>
              Create New
            </Button> */}
          </Stack>
        </form>
      </div>
      <Loading isLoading={isLoading} />
      {/* Table */}
      <div className='table-data mt-3'>
        <TableCommon
          data={dataMyTicket || []}
          parseFunction={parseData}
          columns={columsAllTicket}
          isShowPaging
          classNameTable='tblCampaignReport'
        />
      </div>
    </div>
  )
}

export default MyTicketList
