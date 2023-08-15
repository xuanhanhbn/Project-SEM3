/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Button, IconButton, TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { Delete } from 'mdi-material-ui'

import { columns, inputSearchCustomer, rows } from './constant'

import { Magnify } from 'mdi-material-ui'
import { Breadcrumb } from 'antd'
import FormCreate from './components/FormCreate'
import { Controller, useForm } from 'react-hook-form'

import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { customerActions, makeSelectCustomer } from './customerSlice'
import { useSnackbar } from 'notistack'
import Loading from 'src/components/Loading'
import TableCommon from 'src/components/TableCommon'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ListCustomer() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { control, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  // ** State
  const [isOpenModal, setIsOpenModal] = useState(false)

  const globalData = useSelector(makeSelectCustomer)
  const dataCustomer = globalData?.dataCustomer
  const { isCreate, isLoading, isCreateFailed } = globalData

  // Xử lí khi tìm kiếm
  const onSubmit = data => {
    dispatch(customerActions.getListCustomer(data))
  }

  // Call api danh sach
  useEffect(() => {
    dispatch(customerActions.getListCustomer())
  }, [])

  // Xử lí khi thêm mới thành công sẽ call lại api danh sách
  useEffect(() => {
    if (isCreate) {
      dispatch(customerActions.clear())
      dispatch(customerActions.getListCustomer())
      setIsOpenModal(false)
      handleShowSnackbar('Create Customer Success')
    }
  }, [isCreate])

  useEffect(() => {
    if (isCreateFailed) {
      dispatch(customerActions.clear())
      handleShowSnackbar('An error occurred, please try again.', 'error')
    }
  }, [isCreateFailed])

  // Xử lí mở modal
  const handleOpenModalCreateCustomer = () => setIsOpenModal(true)

  // Xử lí đóng modal
  const handleCloseModalCreate = () => setIsOpenModal(false)

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
              pathname: '/customer-dashboard/custommer-detail',
              query: { ...item, type: 'not' }
            }}
          >
            <Button>
              <EyeOutline style={{ fontSize: 18, marginRight: 5 }} />
            </Button>
          </Link>
          {/* </Button> */}

          <IconButton>
            <Delete style={{ fontSize: 18, color: 'red' }} color='red' />
          </IconButton>

          {/* <Delete style={{ fontSize: 18, color: 'red' }} color='red' /> */}
        </>
      )
    }

    return item[field]
  }, [])

  // Xử lí phân trang
  // const onChangePage = useCallback(
  //   page => {
  //     const newDataRequest = {
  //       ...dataRequest,
  //       page,
  //     };
  //     setDataRequest(newDataRequest);
  //     handleQuery(newDataRequest);
  //   },
  //   [dataRequest, setDataRequest],
  // );

  return (
    <div style={{ flex: 1 }}>
      <Breadcrumb>
        <Breadcrumb.Item>Company Active</Breadcrumb.Item>
        <Breadcrumb.Item>Customer Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      {/* Button Add */}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20, marginTop: 50 }}
      >
        <Loading isLoading={isLoading} />
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            {inputSearchCustomer.map(inputSearch => (
              <div key={`inputSearchCustormer_${inputSearch.field}`}>
                <Controller
                  key={inputSearch.field}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        placeholder={inputSearch.label}
                        name={inputSearch.field}
                        label={inputSearch.label}
                        value={value}
                        onChange={onChange}
                        required
                        fullWidth
                      />
                    )
                  }}
                  name={inputSearch.field}
                />
              </div>
            ))}
            <Button
              style={{ backgroundColor: '#9155FD', color: 'white' }}
              onClick={handleSubmit(onSubmit)}
              size='large'
              variant='contained'
            >
              <Magnify />
            </Button>
            <Button
              size='large'
              variant='contained'
              sx={{ marginLeft: 10 }}
              onClick={() => handleOpenModalCreateCustomer()}
              className={styles.test}
            >
              Create New
            </Button>
          </Stack>
        </form>
      </div>
      {/* Table */}
      <div className='table-data mt-3'>
        <TableCommon
          data={dataCustomer || []}
          parseFunction={parseData}
          columns={columns}
          isShowPaging
          classNameTable='tblCampaignReport'

          // onChangePage={page => onChangePage(page - 1)}
          // totalCountData={(dataList && dataList.totalElements) || 0}
          // defaultPage={dataRequest.page + 1}
          // currentPage={dataRequest.page + 1}
          // totalDisplay={dataRequest.size || 10}
        />
      </div>
      {isOpenModal && (
        <FormCreate
          onOpen={isOpenModal}
          onClose={() => handleCloseModalCreate()}
          title='Add Customer'
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        />
      )}
    </div>
  )
}

export default memo(ListCustomer)
