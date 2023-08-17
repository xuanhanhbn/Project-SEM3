import React from 'react'
import { Dropdown, Space } from 'antd'
import { Button } from '@mui/material'
import { Delete, DotsHorizontal, EyeOutline } from 'mdi-material-ui'
import Link from 'next/link'

const view = <Link href=''>View</Link>

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
        key: 'notProcessed',
        label: 'Not Processed'
      },
      {
        key: 'inProcessed',
        label: 'In Processed'
      },
      {
        key: 'processed',
        label: 'Processed'
      }
    ]
  }
]

const handleDropdownItemClick = e => {
  if (e.key === 'delete') {
    console.log(e.key)
  }

  if (e.key === 'notProcessed') {
    console.log(e.key)
  }

  if (e.key === 'processed') {
    console.log(e.key)
  }

  if (e.key === 'inProcessed') {
    console.log(e.key)
  }
}

const Actions = props => (
  <Dropdown
    menu={{
      onClick: handleDropdownItemClick,
      items
    }}
  >
    <Button variant='outline'>
      <Space>
        <DotsHorizontal />
      </Space>
    </Button>
  </Dropdown>
)

export default Actions
