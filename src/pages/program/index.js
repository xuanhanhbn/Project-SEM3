/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from '@mui/material'
import { Input, Modal } from 'antd'
import { Breadcrumb } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTable from 'src/components/TableCommon'
import { Delete, EyeOutline } from 'mdi-material-ui'
import { columns } from './constant'
import { makeSelectProgram, programActions } from './slice'
import { useSnackbar } from 'notistack'
import ModalCreate from './components/ModalCreate'
import { makeSelectPartner, partnerActions } from '../partners-listing/slice'
import Link from 'next/link'
import Loading from 'src/components/Loading'
import { Search } from '@mui/icons-material'

function ProgramList() {
  const dispatch = useDispatch()
  const breadcrumbItems = [{ title: 'Give-AID' }, { title: 'Program List' }]
  const globalDataProgram = useSelector(makeSelectProgram)
  const { isLoading, isSuccess, isError, dataList } = globalDataProgram
  const globalDataPartner = useSelector(makeSelectPartner)
  const dataPartner = globalDataPartner?.dataList || []
  const { isUploadImage } = globalDataPartner

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const baseRequest = {
    search: '',
    isActive: false,
    page: 0,
    size: 10
  }

  const [dataRequest, setDataRequest] = useState(baseRequest)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  // Call api khi lần đầu vào trang
  useEffect(() => {
    dispatch(partnerActions.onGetListPartner())

    handleQuery()
  }, [])

  const handleQuery = data => {
    dispatch(programActions.onGetListProgram(data || dataRequest))
  }

  // Call api khi xoá partner
  const handleDeletePartners = () => {
    dispatch(programActions.onRemoveProgram())
  }

  // Xử lí khi xoá thất bại
  useEffect(() => {
    if (isError) {
      dispatch(programActions.clear())

      return handleShowSnackbar('Error', 'error')
    }
  }, [isError])

  const handldataUpdateDataRequest = (data, config) => {
    if (config.field === 'text') {
      const newDataRequest = {
        ...dataRequest,
        search: data?.target?.value
      }

      return setDataRequest(newDataRequest)
    }
  }

  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }
    if (field === 'target') {
      const formatNumber = item[field].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return `${formatNumber} $`
    }
    if (field === 'isClosed') {
      if (!item.isClosed) {
        return <div className='text-success font-weight-bold'>Starting</div>
      }

      return <div className='text-danger font-weight-bold'>Closed</div>
    }

    if (field === 'actions') {
      return (
        <div className='d-flex justify-content-center'>
          <Link
            passHref
            href={{
              pathname: '/program/program-detail',
              query: { ...item, type: 'not' }
            }}
          >
            <Button>
              <EyeOutline />
            </Button>
          </Link>

          {/* <Button onClick={() => setIsOpenModalDelete(true)}>
            <Delete style={{ color: 'red' }} />
          </Button> */}
        </div>
      )
    }

    return item[field]
  }, [])

  const onChangePage = useCallback(
    page => {
      const newDataRequest = {
        ...dataRequest,
        page
      }
      setDataRequest(newDataRequest)
      handleQuery(newDataRequest)
    },
    [dataRequest, setDataRequest]
  )

  return (
    <div className='container'>
      <Loading isLoading={isLoading} />
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <div className='d-flex justify-content-end mt-3'>
          <Input
            placeholder='Search'
            onChange={data => handldataUpdateDataRequest(data, { field: 'text' })}
            onPressEnter={() => handleQuery(dataRequest)}
            value={dataRequest.search}
            style={{ width: '20%', marginRight: 10 }}
            suffix={<Search />}
          />
          <Button
            style={{ backgroundColor: '#9155FD', color: 'white' }}
            size='large'
            variant='contained'
            onClick={() => setIsOpenModalCreate(true)}
          >
            CREATE
          </Button>
        </div>
        <div className='mt-3'>
          <CustomTable
            data={(dataList && dataList.data) || []}
            columns={columns}
            parseFunction={parseData}
            isShowPaging
            onChangePage={page => onChangePage(page - 1)}
            totalCountData={(dataList && dataList.total) || 0}
            defaultPage={dataRequest.page + 1}
            currentPage={dataRequest.page + 1}
            totalDisplay={dataRequest.size || 10}
            classNameTable='tblCampaignReport'
          />
        </div>
        {isOpenModalDelete && (
          <Modal
            title='Delete Partners'
            open={isOpenModalDelete}
            onOk={() => handleDeletePartners()}
            onCancel={() => setIsOpenModalDelete(false)}
            dataRequest={dataRequest}
          >
            <p>Some contents...</p>
          </Modal>
        )}

        {isOpenModalCreate && (
          <ModalCreate
            dataRequest={dataRequest}
            dataPartner={dataPartner}
            isUploadImage={isUploadImage}
            isOpenModalCreate={isOpenModalCreate}
            onCancel={() => setIsOpenModalCreate(false)}
          />
        )}
      </div>
    </div>
  )
}

export default ProgramList
