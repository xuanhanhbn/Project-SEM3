// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'

import {
  AccountGroupOutline,
  FileDocument,
  SwapHorizontal,
  AccountBoxMultipleOutline,
  ForumOutline,
  FileDocumentMultipleOutline,
  TicketConfirmationOutline,
  ClipboardListOutline
} from 'mdi-material-ui'

const UserNavigation = () => {
  return [
    // ADMIN
    {
      sectionTitle: 'Admin',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/admin/dashboard',
      isShowMenu: true,
      role: ['Admin']
    }
  ]
}

export default UserNavigation
