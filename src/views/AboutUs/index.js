import React, { useCallback, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import CustomTable from 'src/components/TableCommon'
import { columns } from './constant'
import Actions from '../admin/pendding-list/components/Actions'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

function AboutUsList() {
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'AboutUs List' }]
  const route = useRouter()

  // Xử lí render ra STT & actions
  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return (
        <>
          <Actions />
        </>
      )
    }

    return item[field]
  }, [])

  const handleSearchData = data => {
    console.log('a')
  }
  useEffect(() => {
    handleSearchData()
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
            onClick={() => route.push('/about-us/form-create')}
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

export default AboutUsList
