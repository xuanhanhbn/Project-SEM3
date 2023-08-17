import { Button } from '@mui/material'

export const listCustomerService = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'
  },
  {
    field: 'customerName',
    maxWidth: 170,
    name: 'Customer Name'
  },

  // {
  //   field: 'phoneNumber',
  //   maxWidth: 170,
  //   name: 'Phone Number'
  // },
  {
    field: 'serviceStaff',
    maxWidth: 170,
    name: 'Service Staff'
  },

  // {
  //   field: 'email',
  //   maxWidth: 170,
  //   name: 'Email'
  // },
  {
    field: 'problem',
    maxWidth: 170,
    name: 'Problem'
  },
  {
    field: 'status',
    maxWidth: 170,
    name: 'Status'
  },
  {
    field: 'actions',
    maxWidth: 170,
    name: 'Actions',
    align: 'center'
  }
]

export const listStatusService = [
  {
    key: '1',
    field: 'notProcessed',
    name: 'Not Processed',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        Not Processed
      </a>
    )
  },
  {
    key: '2',
    field: 'inProcessed',
    name: 'In Processed',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        In Processed
      </a>
    )
  },
  {
    key: '3',
    field: 'processed',
    name: 'Processed',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        Processed
      </a>
    )
  }
]

export const items = [
  {
    key: '1',
    label: <div>Not Processed</div>
  },
  {
    key: '2',
    label: <div>In Processed</div>
  },
  {
    key: '3',
    label: <div>Processed</div>
  }
]
