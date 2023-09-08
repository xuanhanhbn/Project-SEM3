// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

import { AccountGroupOutline, FileDocumentMultipleOutline, ClipboardListOutline } from 'mdi-material-ui'

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
      icon: FileDocumentMultipleOutline,
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
      icon: AccountGroupOutline,
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
      icon: ClipboardListOutline,
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
