/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material'
import { Modal } from 'antd'
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
import moment from 'moment'
import Loading from 'src/components/Loading'

function ProgramList() {
  const dispatch = useDispatch()
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Program List' }]
  const globalDataProgram = useSelector(makeSelectProgram)
  const { isLoading, isSuccess, isError, dataList } = globalDataProgram
  const globalDataPartner = useSelector(makeSelectPartner)
  const dataPartner = globalDataPartner?.dataList || []
  const { isUploadImage } = globalDataPartner

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  // Call api khi lần đầu vào trang
  useEffect(() => {
    dispatch(programActions.onGetListProgram())
    dispatch(partnerActions.onGetListPartner())
  }, [])

  // Call api khi xoá partner
  const handleDeletePartners = () => {
    dispatch(programActions.onRemoveProgram())
  }

  // Xử lí khi xoá thành công
  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(programActions.clear())
  //     setIsOpenModalDelete(false)

  //     // return handleShowSnackbar('Success')
  //   }
  // }, [isSuccess])

  // Xử lí khi xoá thất bại
  useEffect(() => {
    if (isError) {
      dispatch(programActions.clear())

      return handleShowSnackbar('Error', 'error')
    }
  }, [isError])

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
            onClick={() => setIsOpenModalCreate(true)}
          >
            CREATE
          </Button>
        </div>
        <div className='mt-3'>
          <CustomTable
            data={dataList || []}
            columns={columns}
            parseFunction={parseData}
            isShowPaging
            classNameTable='tblCampaignReport'
          />
        </div>
        {isOpenModalDelete && (
          <Modal
            title='Delete Partners'
            open={isOpenModalDelete}
            onOk={() => handleDeletePartners()}
            onCancel={() => setIsOpenModalDelete(false)}
          >
            <p>Some contents...</p>
          </Modal>
        )}

        {isOpenModalCreate && (
          <ModalCreate
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
