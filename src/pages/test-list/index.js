/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Modal } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import CustomTable from 'src/components/TableCommon'
import { columns } from './constant'
import { Delete, EyeOutline } from 'mdi-material-ui'
import { Button } from '@mui/material'
import ModalCreate from './components/ModalCreate'
import moment from 'moment'
import Link from 'next/link'

function TestList() {
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Partner List' }]

  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

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

          <Button onClick={() => setIsOpenModalDelete(true)}>
            <Delete style={{ color: 'red' }} />
          </Button>
        </div>
      )
    }

    if (field === 'createdAt') {
      const formatDate = moment(item?.createdAt).format('YYYY/MM/DD')

      return <div>{formatDate}</div>
    }

    if (field === 'contentType') {
      return <div>{item?.contentType || '-'}</div>
    }

    return item[field]
  }, [])

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
            data={[]}
            columns={columns}
            parseFunction={parseData}
            isShowPaging
            classNameTable='tblCampaignReport'
          />
        </div>
        {isOpenModalCreate && (
          <ModalCreate isOpenModalCreate={isOpenModalCreate} onCancel={() => setIsOpenModalCreate(false)} />
        )}
      </div>
    </div>
  )
}

export default TestList
