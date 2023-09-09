/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import CustomTable from 'src/components/TableCommon'
import { columns } from './constant'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { makeSelectPageList, pageListActions } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'src/components/Loading'
import { useSnackbar } from 'notistack'

function PageList() {
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Page List' }]
  const { enqueueSnackbar } = useSnackbar()

  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const route = useRouter()
  const dispatch = useDispatch()
  const globalDataPageList = useSelector(makeSelectPageList)
  const { isLoading, isError } = globalDataPageList

  // Xử lí render ra STT & actions
  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return <>{/* <Actions /> */}</>
    }

    return item[field]
  }, [])

  const handleSearchData = data => {
    dispatch(pageListActions.getListPage())
  }

  useEffect(() => {
    handleSearchData()
  }, [])

  // Xử lí khi có lỗi
  // useEffect(() => {
  //   if (isError) {
  //     dispatch(pageListActions.clear())
  //     handleShowSnackbar('An error occurred, please try again.', 'error')
  //   }
  // }, [isError])

  return (
    <div className='container'>
      <Loading isLoading={isLoading} />
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <div className='d-flex justify-content-end mt-3'>
          <Button
            style={{ backgroundColor: '#9155FD', color: 'white' }}
            size='large'
            variant='contained'
            onClick={() => route.push('/page-list/components/form-create')}
          >
            CREATE
          </Button>
        </div>
        <div className='mt-3'>
          <CustomTable
            data={[]}
            columns={columns}
            parseFunction={parseData}
            isShowPaging
            classNameTable='tblCampaignReport'
          />
        </div>
      </div>
    </div>
  )
}

export default PageList
