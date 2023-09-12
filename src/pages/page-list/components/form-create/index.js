/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import katex from 'katex'
import { Controller, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { inputCreateTypeAbout, inputCreateTypePartner, inputCreateTypeProgram, pageType } from './constant'
import { InputLabel, TextField, Typography } from '@mui/material'
import { Breadcrumb, Input } from 'antd'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectPageList, pageListActions } from '../../slice'
import Loading from 'src/components/Loading'
import { useSnackbar } from 'notistack'
import { makeSelectPartner, partnerActions } from 'src/pages/partners-listing/slice'
import { makeSelectProgram, programActions } from 'src/pages/program/slice'

const validationSchema = Yup.object().shape({
  pageType: Yup.string().required('Page Type is required'),
  partnerId: Yup.string().when('pageType', (pageType, schema) => {
    if (pageType.toString() === '1') return schema.required('Must choose Partner')

    return schema
  }),
  programId: Yup.string().when('pageType', (pageType, schema) => {
    if (pageType.toString() === '2') return schema.required('Must choose Program')

    return schema
  }),
  content: Yup.string().required('Content is required')
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
})

function CreatePageList() {
  const breadcrumbItems = [{ title: 'Give-AID' }, { href: '/page-list', title: 'Page List' }, { title: 'Create Page' }]

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const theme = useTheme()
  const route = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleShowSnackbar = (message, variant = 'success') => enqueueSnackbar(message, { variant })

  const baseDataRequest = {
    pageType: null,
    partnerId: '',
    programId: '',
    content: ''
  }

  const [personName, setPersonName] = useState([])
  const [fileList, setFileList] = useState([])
  const [dataRequest, setDataRequest] = useState(baseDataRequest)

  // Lay DATA Details
  const globalDataPageList = useSelector(makeSelectPageList)
  const { isLoading, isCreate, isCreateError } = globalDataPageList

  // Get DATA Partner
  const globalDataPartner = useSelector(makeSelectPartner)
  const dataListPartner = globalDataPartner?.dataList || []

  // Get DATA Program
  const globalDataProgram = useSelector(makeSelectProgram)
  const dataListProgram = globalDataProgram?.dataList || []

  // Xử lí khi có lỗi
  useEffect(() => {
    if (isCreateError) {
      dispatch(pageListActions.clear())
      handleShowSnackbar('An error occurred, please try again.', 'error')
    }
  }, [isCreateError])

  // Xử lí khi thành công
  useEffect(() => {
    if (isCreate) {
      dispatch(pageListActions.clear())
      handleShowSnackbar('Success')
    }
  }, [isCreate])

  // Call API lấy danh sách partner và program
  useEffect(() => {
    dispatch(partnerActions.onGetListPartner())
    dispatch(programActions.onGetListProgram())
  }, [])

  const handleUpdateDataRequest = (data, config) => {
    const newDataRequest = { ...dataRequest }
    if (config.field === 'content') {
      newDataRequest[config.field] = data
      setValue('content', data, { shouldValidate: true })

      return setDataRequest(newDataRequest)
    }
    if (config.field === 'pageType') {
      newDataRequest[config.field] = data?.target?.value || ''
      newDataRequest.partnerId = ''
      newDataRequest.programId = ''
      newDataRequest.content = ''
      setValue('pageType', data?.target?.value, { shouldValidate: true })
      setValue('programId', '')
      setValue('partnerId', '')
      setValue('content', '')

      return setDataRequest(newDataRequest)
    }
  }

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])

      return false
    },

    fileList
  }

  const handleChange = event => {
    const {
      target: { value }
    } = event
    const valueSelect = typeof value === 'string' ? value.split(',') : value
    setPersonName(valueSelect)
  }

  const editorOptions = {
    height: 400,
    buttonList: [
      ['undo', 'redo'],
      ['removeFormat'],
      ['bold', 'underline', 'italic', 'fontSize'],
      ['fontColor', 'hiliteColor'],
      ['align', 'horizontalRule', 'list'],
      ['table', 'link', 'image', 'imageGallery'],
      ['showBlocks', 'codeView'],
      ['math']
    ],
    katex: katex,
    imageRotation: false,
    fontSize: [12, 14, 16, 18, 20],
    colorList: [
      [
        '#828282',
        '#FF5400',
        '#676464',
        '#F1F2F4',
        '#FF9B00',
        '#F00',
        '#fa6e30',
        '#000',
        'rgba(255, 153, 0, 0.1)',
        '#FF6600',
        '#0099FF',
        '#74CC6D',
        '#FF9900',
        '#CCCCCC'
      ]
    ]
  }

  const renderDefaultFilter = () => {
    if (dataRequest.pageType === 1) {
      return inputCreateTypePartner.map(item => renderDefaultInputPartner(item))
    }
    if (dataRequest.pageType === 2) {
      return inputCreateTypeProgram.map(item => renderDefaultInputProgram(item))
    }

    return inputCreateTypeAbout.map(item => renderDefaultInputAbout(item))
  }

  // Render INPUT Khi TYPE === Partner
  const renderDefaultInputPartner = item => {
    if (item.type === 'SELECT') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <FormControl fullWidth className='mt-4'>
                    <InputLabel id='demo-simple-select-label'>{item.label}</InputLabel>
                    <Select
                      name={item.field}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Page Type'
                      onChange={onChange}
                    >
                      {dataRequest.pageType === 1 &&
                        dataListPartner?.map(partner => (
                          <MenuItem key={partner.partnerId} value={partner.partnerId}>
                            {partner.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <Typography className='text-danger mt-2'>{message}</Typography>
                  </FormControl>
                </>
              )
            }}
            name={item.field}
          />
        </Grid>
      )
    }
    if (item.type === 'SUNEDITOR') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <FormControl fullWidth className='mt-4'>
                    <InputLabel id='demo-simple-select-label'>{item.label}</InputLabel>
                    <SunEditor
                      setOptions={editorOptions}
                      onChange={value => handleUpdateDataRequest(value, { field: 'content' })}
                      setContents={dataRequest.content}
                    />
                    <Typography className='text-danger mt-2'>{message}</Typography>
                  </FormControl>
                </>
              )
            }}
            name={item.field}
          />
        </Grid>

        // <div>
        //   <Typography sx={{ mb: 3, fontWeight: 500 }}>{item.label}</Typography>
        //   <SunEditor
        //     setOptions={editorOptions}
        //     onChange={value => handleUpdateDataRequest(value, { field: 'document' })}
        //     setContents={dataRequest.document}
        //   />
        // </div>
      )
    }
  }

  // RENDER INPUT khi type === program
  const renderDefaultInputProgram = item => {
    if (item.type === 'SELECT') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <FormControl fullWidth className='mt-4'>
                    <InputLabel id='demo-simple-select-label'>{item.label}</InputLabel>
                    <Select
                      name={item.field}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Page Type'
                      onChange={onChange}
                    >
                      {dataListProgram?.map(partner => (
                        <MenuItem key={partner.partnerId} value={partner.partnerId}>
                          {partner.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography className='text-danger mt-2'>{message}</Typography>
                  </FormControl>
                </>
              )
            }}
            name={item.field}
          />
        </Grid>
      )
    }
    if (item.type === 'SUNEDITOR') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <FormControl fullWidth className='mt-4'>
                    <InputLabel id='demo-simple-select-label'>{item.label}</InputLabel>
                    <SunEditor
                      setOptions={editorOptions}
                      onChange={value => handleUpdateDataRequest(value, { field: 'content' })}
                      setContents={dataRequest.content}
                    />
                    <Typography className='text-danger mt-2'>{message}</Typography>
                  </FormControl>
                </>
              )
            }}
            name={item.field}
          />
        </Grid>

        // <div>
        //   <Typography sx={{ mb: 3, fontWeight: 500 }}>{item.label}</Typography>
        //   <SunEditor
        //     setOptions={editorOptions}
        //     onChange={value => handleUpdateDataRequest(value, { field: 'document' })}
        //     setContents={dataRequest.document}
        //   />
        // </div>
      )
    }
  }

  // RENDER INPUT KHI TYPE === AboutUS
  const renderDefaultInputAbout = item => {
    if (item.type === 'SUNEDITOR') {
      const { field } = item
      const message = errors[field] && errors[field].message

      return (
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <FormControl fullWidth className='mt-4'>
                    <InputLabel id='demo-simple-select-label'>{item.label}</InputLabel>
                    <SunEditor
                      setOptions={editorOptions}
                      onChange={value => handleUpdateDataRequest(value, { field: 'content' })}
                      setContents={dataRequest.content}
                    />
                    <Typography className='text-danger mt-2'>{message}</Typography>
                  </FormControl>
                </>
              )
            }}
            name={item.field}
          />
        </Grid>
      )
    }
  }

  // Xử lí khi submit form
  const onSubmit = data => {
    // console.log('dataSUBMIT: ', data)
    const newDataRequest = {
      ...data,
      pageType: Number(data.pageType)
    }
    dispatch(pageListActions.onCreatePage(newDataRequest))
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Loading isLoading={isLoading} />
      <form>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <FormControl fullWidth className='mt-4'>
                  <InputLabel id='demo-simple-select-label'>Page Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={value}
                    label='Page Type'
                    onChange={e => handleUpdateDataRequest(e, { field: 'pageType' })}
                  >
                    {pageType.map(type => (
                      <MenuItem key={type.field} value={type.field}>
                        {type.value}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors && errors.pageType && (
                    <Typography className='text-danger mt-2'>{errors.pageType?.message}</Typography>
                  )}
                </FormControl>
              </>
            )
          }}
          name='pageType'
        />
        {dataRequest && dataRequest.pageType !== null && renderDefaultFilter()}
        <div className='d-flex align-items-center justify-content-end'>
          <Button
            type='submit'
            onClick={() => route.back()}
            variant='outlined'
            size='large'
            sx={{ marginTop: 5, width: '20%' }}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            variant='contained'
            size='large'
            sx={{ marginTop: 5, marginLeft: 10, width: '20%' }}
            fullWidth
          >
            Create
          </Button>
        </div>
      </form>
    </>
  )
}

export default CreatePageList
