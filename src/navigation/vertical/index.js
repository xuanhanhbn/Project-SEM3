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

const navigation = () => {
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
    },
    {
      sectionTitle: 'Page List',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Page List',
      icon: HomeOutline,
      path: '/page-list',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Create Page',
      icon: HomeOutline,
      path: '/page-list/components/form-create',
      isShowMenu: false,
      role: ['Admin']
    },
    {
      sectionTitle: 'Partner',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Partners List',
      icon: HomeOutline,
      path: '/partners-listing',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Partner Detail',
      icon: HomeOutline,
      path: '/partners-listing/partner-detail',
      isShowMenu: false,
      role: ['Admin']
    },
    {
      sectionTitle: 'Program',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Program List',
      icon: HomeOutline,
      path: '/program',
      isShowMenu: true,
      role: ['Admin']
    },
    {
      title: 'Program Detail',
      icon: HomeOutline,
      path: '/program/program-detail',
      isShowMenu: false,
      role: ['Admin']
    },
    {
      title: 'Test List',
      icon: HomeOutline,
      path: '/test-list',
      isShowMenu: true,
      role: ['Admin']
    }
  ]
}

export default navigation

// {
//   sectionTitle: 'About Us',
//   isShowMenu: true,
//   role: ['Admin']
// },
// {
//   title: 'AboutUs',
//   icon: HomeOutline,
//   path: '/about-us',
//   isShowMenu: true,
//   role: ['Admin']
// },
// {
//   title: 'Create AboutUs',
//   icon: HomeOutline,
//   path: '/about-us/form-create',
//   isShowMenu: false,
//   role: ['Admin']
// },
