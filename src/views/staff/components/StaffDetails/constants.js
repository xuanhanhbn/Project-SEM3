export const inputTabSecurity = [
    {
        field: 'currentPassword',
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
        placeHolder: 'User Name',
        field: 'username',
        type: 'INPUT'
    },
    {
        placeHolder: 'Name',
        field: 'name',
        type: 'INPUT'
    },
    {
        placeHolder: 'Email',
        field: 'email',
        type: 'INPUT'
    },
    {
        placeHolder: 'Role',
        field: 'role',
        type: 'SELECT'
    },
    {
        placeHolder: 'Status',
        field: 'status',
        type: 'SELECT'
    },
    {
        placeHolder: 'Company',
        field: 'company',
        type: 'INPUT'
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
