export const inputAddCustomer = [
  {
    field: 'name',
    lable: 'Full Name'
  },
  {
    field: 'email',
    lable: 'Email'
  },
  {
    field: 'telephone',
    lable: 'Phone Number'
  },
  {
    field: 'address',
    lable: 'Address'
  }
]

export const inputSearchCustomer = [
  {
    field: 'search',
    label: 'Search'
  }
]

export const columns = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'

    // isSort: true,
  },
  { field: 'name', name: 'Name', minWidth: 170 },
  { field: 'email', name: 'Email', minWidth: 100 },
  {
    field: 'address',
    name: 'Address',
    minWidth: 170
  },
  {
    field: 'telephone',
    name: 'Phone',
    minWidth: 170
  },
  {
    field: 'actions',
    name: 'Actions',
    minWidth: 170,
    align: 'center'
  }
]
