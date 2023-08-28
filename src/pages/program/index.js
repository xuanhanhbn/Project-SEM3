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

function ProgramList() {
  const dispatch = useDispatch()
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Program List' }]
  const globalDataProgram = useSelector(makeSelectProgram)
  const { isLoading, isSuccess, isError } = globalDataProgram

  const { enqueueSnackbar } = useSnackbar()
  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  // Call api khi lần đầu vào trang
  useEffect(() => {
    dispatch(programActions.onGetListProgram())
  }, [])

  // Call api khi xoá partner
  const handleDeletePartners = () => {
    dispatch(programActions.onRemoveProgram())
  }

  // Xử lí khi xoá thành công
  useEffect(() => {
    if (isSuccess) {
      dispatch(programActions.clear())
      setIsOpenModalDelete(false)

      return handleShowSnackbar('Success')
    }
  }, [isSuccess])

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

    if (field === 'actions') {
      return (
        <div className='d-flex justify-content-center'>
          <Button>
            <EyeOutline />
          </Button>
          <Button onClick={() => setIsOpenModalDelete(true)}>
            <Delete style={{ color: 'red' }} />
          </Button>
        </div>
      )
    }

    return item[field]
  }, [])

  const fakeData = [
    {
      partnerName: 'a'
    }
  ]

  return (
    <div className='container'>
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
            data={fakeData || []}
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

export default ProgramList
