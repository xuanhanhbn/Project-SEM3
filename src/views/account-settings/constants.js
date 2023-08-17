export const inputTabSecurity = [
  {
    field: 'oldPassword',
    lable: 'Current Password',
    type: 'password'
  },
  {
    field: 'newPassword',
    lable: 'New Password',
    type: 'password'
  },
  {
    field: 'confirmNewPassword',
    lable: 'Confirm New Password',
    type: 'password'
  }
]

export const inputTabAccount = [
  {
    placeHolder: 'First Name',
    field: 'firstName',
    type: 'INPUT'
  },
  {
    placeHolder: 'Last Name',
    field: 'lastName',
    type: 'INPUT'
  },

  {
    placeHolder: 'Email',
    field: 'email',
    type: 'INPUT'
  },
  {
    placeHolder: 'Phone Number',
    field: 'phoneNumber',
    type: 'INPUT'
  },
  {
    placeHolder: 'Role',
    field: 'role',
    type: 'SELECT'
  }
]

export const roleAccount = [
  {
    field: 'admin',
    value: 'Admin'
  },
  {
    field: 'author',
    value: 'Author'
  },
  {
    field: 'editor',
    value: 'Editor'
  },
  {
    field: 'maintainer',
    value: 'Maintainer'
  }
]

export const statusAccount = [
  {
    field: 'doing',
    value: 'Doing'
  },
  {
    field: 'notDoing',
    value: 'Not Doing'
  }
]
