export const columns = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'

    // isSort: true,
  },
  { field: 'nameCustomer', name: 'Customer', minWidth: 170 },

  { field: 'total', name: 'Total', minWidth: 100 },
  {
    field: 'date',
    name: 'Date',
    minWidth: 170
  },
  {
    field: 'createdByName',
    name: 'Created',
    minWidth: 170
  },
  {
    field: 'status',
    name: 'Status',
    minWidth: 170
  },
  {
    field: 'actions',
    name: 'Actions',
    minWidth: 170,
    align: 'center'
  }
]

export const fakeData = [
  {
    nameCustomer: 'Tên Khách Hàng',
    emailCustomer: 'email@gmail.com',
    addressCustomer: 'Đây là địa chỉ khách hàng',
    total: 'Tổng tiền',
    date: '20-07-2023',
    createdByName: 'Dương đẹp trai',
    status: 'Processing'
  }
]

export const inputCreate = [
  {
    field: 'detail',
    lable: 'Transaction Discription',
    placeHolder: 'Transaction Discription',
    type: 'INPUT'
  },
  {
    field: 'total',
    lable: 'Total Transactions',
    placeHolder: 'Total Transactions',
    type: 'INPUT'
  },
  {
    field: 'customerId',
    lable: 'Customer ',
    placeHolder: 'Customer',
    type: 'SELECT'
  }
]

export const inputShowInfoCustomer = [
  {
    field: 'email',
    lable: 'Customer Email'
  },
  {
    field: 'address',
    lable: 'Customer Address'
  },
  {
    field: 'telephone',
    lable: 'Customer Telephone'
  }
]
