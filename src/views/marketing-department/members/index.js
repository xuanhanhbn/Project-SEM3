import MarketingDepartmentHeader from '../marketingDepartmentHeader'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import { marketingMembers } from './constants'
import Link from 'next/link'
import { Breadcrumb } from 'antd'
import { memo } from 'react'
import TableCommon from 'src/components/TableCommon'
import { Delete } from 'mdi-material-ui'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import React, { useCallback } from 'react'
import { columns } from './constants'

function MarketingMembers() {
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
            <EyeOutline style={{ fontSize: 18, marginRight: 5 }} />
          </Link>
          {/* </Button> */}
          <Delete style={{ fontSize: 18, color: 'red' }} color='red' />
        </>
      )
    }

    return item[field]
  }, [])

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 30 }}>
        <Breadcrumb.Item>Marketing Department</Breadcrumb.Item>
        <Breadcrumb.Item>Members</Breadcrumb.Item>
      </Breadcrumb>
      {/* <MarketingDepartmentHeader /> */}
      {/* <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gridGap: 35,
          margin: '30px 0px'
        }}
      >
        {marketingMembers.map(member => {
          return (
            <Card key={member.userName}>
              <CardContent
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Link href='/custommer-detail/' passHref>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        marginBottom: 2.25,
                        color: 'common.white',
                        backgroundColor: 'primary.main'
                      }}
                      src={member.avatar}
                    />
                  </Link>
                  <Link href='/custommer-detail/' passHref>
                    <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                      {member.fullName}
                    </Typography>
                  </Link>
                </div>
                <Typography variant='body2' sx={{ marginBottom: 6 }}>
                  {member.jobTitle}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </div> */}
      <TableCommon
        data={[]}
        parseFunction={parseData}
        columns={columns}
        isShowPaging
        classNameTable='tblCampaignReport'
      />
    </div>
  )
}

export default memo(MarketingMembers)
