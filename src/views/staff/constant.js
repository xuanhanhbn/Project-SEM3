export const columns = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'

    // isSort: true,
  },
  { field: 'fullName', name: 'Name', minWidth: 170 },
  { field: 'email', name: 'Employee Email', minWidth: 100 },
  { field: 'fullName', name: 'Employee Name', minWidth: 100 },

  {
    field: 'roles',
    name: 'Roles',
    minWidth: 170
  },

  {
    field: 'actions',
    name: 'Actions',
    minWidth: 170,
    align: 'center'
  }
]

export const inputCreateUser = [
  {
    field: 'fullName',
    placeHolder: 'Full Name',
    type: 'INPUT',
    inputLabel: 'Full Name :'
  },

  {
    field: 'username',
    placeHolder: 'User Name',
    type: 'INPUT',
    inputLabel: 'User Name :'
  },
  {
    field: 'email',
    placeHolder: 'Email',
    type: 'INPUT',
    inputLabel: 'Email :'
  },
  {
    field: 'password',
    placeHolder: 'Password',
    type: 'PASSWORD',
    inputLabel: 'Password :'
  },
  {
    field: 'roles',
    placeHolder: 'Roler',
    type: 'SELECT',
    inputLabel: 'Roler :'
  },
  {
    field: 'phone',
    placeHolder: 'Phone Number',
    type: 'INPUT',
    inputLabel: 'Phone Number :'
  }

  // {
  //   field: 'department',
  //   placeHolder: 'Department',
  //   type: 'SELECT',
  //   inputLabel: 'Department :'
  // },
]

export const roleAccount = [
  {
    field: 'saleManager',
    value: 'SaleManager'
  },
  {
    field: 'empolyeeSale',
    value: 'Sale'
  },
  {
    field: 'empolyeeHR',
    value: 'HR'
  },
  {
    field: 'HRManager',
    value: 'HRManager'
  }
]

// export const roleDepartments = [
//   // {
//   //   field: 'marketing',
//   //   value: 'Marketing'
//   // },
//   {
//     field: 'humanResources',
//     value: 'Human Resources'
//   },
//   {
//     field: 'sale',
//     value: 'Sales'
//   }
// ]
