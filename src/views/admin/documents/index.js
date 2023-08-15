/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { Button, Icon, IconButton, TextField } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Breadcrumb } from 'antd'
import Divider from '@mui/material/Divider'
import { columns, roleCategory } from './constants'
import Link from 'next/link'
import { Delete, EyeOutline } from 'mdi-material-ui'
import TableCommon from 'src/components/TableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { documentActions, makeSelectDocument } from './documentSlice'
import Loading from 'src/components/Loading'
import moment from 'moment'

function ListDocument() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(documentActions.getListDocuments())
  }, [])

  const globalData = useSelector(makeSelectDocument)
  const { isLoading } = globalData
  const dataDocument = globalData?.dataDocument

  console.log('dataDocument: ', dataDocument)

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

          <IconButton>
            <Delete style={{ fontSize: 18, color: 'red' }} />
          </IconButton>
        </>
      )
    }
    if (field === 'createdAt') {
      const formatDate = moment(item?.createdAt).format('YYYY/MM/DD')

      return <div>{formatDate}</div>
    }

    return item[field]
  }, [])

  return (
    <div style={{ flex: 1 }}>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>
          <Link href='/admin/dashboard'>Company Active</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Documents</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ borderRadius: 10 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            You are viewing all docs.
          </Typography>
          <Button
            size='large'
            variant='contained'
            sx={{ marginLeft: 10 }}
            href='/admin/create-documents'
            style={{
              minWidth: 150,
              minHeight: 40,
              marginTop: 5
            }}
          >
            Create New Docs
          </Button>
        </CardContent>
      </Card>
      <Loading isLoading={isLoading} />
      <Card style={{ borderRadius: 10, marginTop: '20px' }}>
        <TableCommon
          data={dataDocument || []}
          parseFunction={parseData}
          columns={columns}
          isShowPaging
          classNameTable='tblCampaignReport'
        />
      </Card>
    </div>
  )
}

export default ListDocument
