import React, { memo, useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Dropdown } from 'antd'
import TableCommon from 'src/components/TableCommon'
import { colums, inputSearchTicket } from './constants'
import { Typography } from '@mui/material'
import { Button, IconButton, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Delete, DeleteOutline, EyeOutline, Magnify } from 'mdi-material-ui'
import TicketDetails from './components/TicketDetails'
import { makeSelectTicket, ticketActions } from './ticketEmployeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import AllTicketList from './components/AllListTicket'
import MyTicketList from './components/MyTicket'
import { Tabs } from 'antd'

function EmployeeTicket() {
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Employee Ticket ' }]

  const onChange = key => {
    // console.log(key)
  }

  const items = [
    {
      key: '1',
      label: `All List Ticket`,
      children: <AllTicketList />
    },
    {
      key: '2',
      label: `My Ticket List`,
      children: <MyTicketList />
    }
  ]

  return (
    <div style={{ flex: 1 }}>
      <Breadcrumb items={breadcrumbItems} />
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 50 }}
      />
      <Tabs items={items} onChange={onChange} defaultActiveKey='1' type='card' />
    </div>
  )
}

export default memo(EmployeeTicket)
