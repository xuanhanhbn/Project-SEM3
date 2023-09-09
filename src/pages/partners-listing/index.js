/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Modal } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import CustomTable from 'src/components/TableCommon'
import { columns } from './constant'
import { Delete, EyeOutline } from 'mdi-material-ui'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectPartner, partnerActions } from './slice'
import { useSnackbar } from 'notistack'
import Loading from 'src/components/Loading'
import ModalCreate from './components/ModalCreate'
import moment from 'moment'
import Link from 'next/link'

function PartnerList() {
  const dispatch = useDispatch()
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Partner List' }]
  const globalDataPartner = useSelector(makeSelectPartner)
  const { isLoading, isSuccess, isError, dataList, isRemove } = globalDataPartner
  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  // Call api khi lần đầu vào trang
  useEffect(() => {
    dispatch(partnerActions.onGetListPartner())
  }, [])

  // Call api khi xoá partner
  const handleDeletePartners = () => {
    dispatch(partnerActions.onRemovePartner())
  }

  // Xử lí khi xoá thành công
  useEffect(() => {
    if (isRemove) {
      dispatch(partnerActions.clear())
      setIsOpenModalDelete(false)

      return handleShowSnackbar('Remove Success')
    }
  }, [isRemove])

  // Xử lí khi xoá thất bại
  useEffect(() => {
    if (isError) {
      dispatch(partnerActions.clear())

      return handleShowSnackbar('Error', 'error')
    }
  }, [isError])

  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return (
        <div className='d-flex justify-content-center'>
          <Link
            passHref
            href={{
              pathname: `/partners-listing/partner-detail/`,
              query: { ...item, type: 'not' }
            }}
          >
            <Button>
              <EyeOutline />
            </Button>
          </Link>
          {/* 
          <Button onClick={() => setIsOpenModalDelete(true)}>
            <Delete style={{ color: 'red' }} />
          </Button> */}
        </div>
      )
    }

    if (field === 'createdAt') {
      const formatDate = moment(item?.partnerThumbnail.createdAt).format('YYYY/MM/DD')

      return <div>{formatDate}</div>
    }

    if (field === 'contentType') {
      return <div>{item?.contentType || '-'}</div>
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
          <ModalCreate isOpenModalCreate={isOpenModalCreate} onCancel={() => setIsOpenModalCreate(false)} />
        )}
      </div>
    </div>
  )
}

export default PartnerList
