/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useState, Fragment, useEffect, useCallback, memo } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'

import TableCommon from 'src/components/TableCommon'
import Link from 'next/link'
import { Delete } from 'mdi-material-ui'
import EyeOutline from 'mdi-material-ui/EyeOutline'

import { columns } from './constant'
import { Breadcrumb } from 'antd'
import { right } from '@popperjs/core'
import Button from '@mui/material/Button'
import { purple } from '@mui/material/colors'
import FormCreate from './components/FormCreate'
import Loading from 'src/components/Loading'

import { makeSelectStaff, staffActions } from './staffSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { IconButton } from '@mui/material'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#9155FD',
  '&:hover': {
    backgroundColor: '#9155FD'
  }
}))

function ListStaff() {
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Employee List' }]

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const globalData = useSelector(makeSelectStaff)
  const dataStaff = globalData?.dataStaff
  const { isCreate, isLoading } = globalData

  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  // Xử lí render ra STT & actions
  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return (
        <>
          <Link
            passHref
            href={{
              pathname: '/account-settings/',
              query: { ...item, type: 'not' }
            }}
          >
            <IconButton>
              <EyeOutline style={{ fontSize: 18 }} />
            </IconButton>
          </Link>
          {/* </Button> */}
          <IconButton>
            <Delete style={{ fontSize: 18, color: 'red' }} color='red' />
          </IconButton>
        </>
      )
    }

    return item[field]
  }, [])

  useEffect(() => {
    dispatch(staffActions.getListStaff())
  }, [])

  // Xử lí khi thêm mới thành công sẽ call lại api danh sách
  useEffect(() => {
    if (isCreate) {
      dispatch(staffActions.clear())
      dispatch(staffActions.getListStaff())
      setIsOpenModal(false)
      handleShowSnackbar('Create Success')
    }
  }, [isCreate])

  const [isOpenModal, setIsOpenModal] = useState(false)

  // Xử lí mở modal
  const handleOpenModalCreateCustomer = () => setIsOpenModal(true)

  // Xử lí đóng modal
  const handleCloseModalCreate = () => setIsOpenModal(false)

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 30 }} items={breadcrumbItems} />

      <ColorButton onClick={() => handleOpenModalCreateCustomer()} sx={{ float: right, mb: 8 }}>
        Create User
      </ColorButton>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableBody>
            <TableCommon
              data={dataStaff || []}
              parseFunction={parseData}
              columns={columns}
              isShowPaging
              classNameTable='tblCampaignReport'
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Loading isLoading={isLoading} />
      {isOpenModal && (
        <FormCreate
          onOpen={isOpenModal}
          onClose={() => handleCloseModalCreate()}
          title='Add Employee'
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{ minWidth: 340 }}
        />
      )}
    </div>
  )
}

export default ListStaff
