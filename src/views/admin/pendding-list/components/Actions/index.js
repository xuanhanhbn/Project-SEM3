import React from 'react'
import { Dropdown, Space } from 'antd'
import { Button } from '@mui/material'
import { Delete, DotsHorizontal, EyeOutline } from 'mdi-material-ui'
import Link from 'next/link'

const view = <Link href='/ticket-lists/ticket-details/'>View</Link>

const items = [
  {
    key: 'view',
    label: view,
    icon: <EyeOutline />
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <Delete />
  },
  {
    key: 'status',
    label: 'Status',
    children: [
      {
        key: 'approve',
        label: 'Approve'
      },
      {
        key: 'refuse',
        label: 'Refuse'
      }
    ]
  }
]

const handleDropdownItemClick = e => {
  if (e.key === 'delete') {
    console.log(e.key)
  }
  if (e.key === 'approve') {
    console.log(e.key)
  }
  if (e.key === 'refuse') {
    console.log(e.key)
  }
}

function Actions() {
  return (
    <Dropdown
      menu={{
        onClick: handleDropdownItemClick,
        items
      }}
    >
      <a>
        <Button variant='outline'>
          <Space>
            <DotsHorizontal />
          </Space>
        </Button>
      </a>
    </Dropdown>
  )
}

export default Actions
