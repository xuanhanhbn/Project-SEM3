// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

import moment from 'moment/moment'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Typography from '@mui/material/Typography'

const validationSchema = Yup.object().shape({
  birthdate: Yup.string().required('Birth date is required'),
  phone: Yup.string().required('Phone is required'),
  country: Yup.string().required('Country is required'),
  languages: Yup.string().required('Languages is required'),
  gender: Yup.string().required('Gender is required')
})

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
    data.birthdate = moment(data.birthdate).format('YYYY-MM-DD')
    console.log(data)
  }

  // ** State
  const [date, setDate] = useState(null)

  const defaultValue = ''

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            {/* <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              defaultValue='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            /> */}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  multiline
                  label='Bio'
                  onChange={onChange}
                  minRows={2}
                  placeholder='Bio'
                  value={value}
                />
              )}
              name='bio'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              render={({ field }) => (
                <DatePickerWrapper>
                  <DatePicker
                    maxDate={new Date()}
                    id='account-settings-date'
                    placeholderText='YYYY-MM-DD'
                    customInput={<CustomInput />}
                    onChange={date => field.onChange(date)}
                    selected={field.value}
                    dateFormat='yyyy-MM-dd'
                  />
                </DatePickerWrapper>
              )}
              name='birthdate'
            />
            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>
              {errors.birthdate?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField fullWidth type='number' label='Phone' placeholder='(123) 456-7890' /> */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField fullWidth multiline label='Phone' onChange={onChange} placeholder='Phone' value={value} />
              )}
              name='phone'
            />
            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors.phone?.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              fullWidth
              label='Website'
              placeholder='https://example.com/'
              defaultValue='https://themeselection.com/'
            /> */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  multiline
                  label='Website'
                  onChange={onChange}
                  placeholder='https://example.com/'
                  value={value}
                />
              )}
              name='website'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select label='Country' defaultValue='USA'>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl> */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select label='Country' onChange={onChange} value={value || defaultValue}>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
              name='country'
            />
            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors.country?.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>
              <Select
                multiple
                defaultValue={['English']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </Select>
            </FormControl> */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>
                    <Select
                      onChange={onChange}
                      value={value || defaultValue}
                      id='account-settings-multiple-select'
                      labelId='account-settings-multiple-select-label'
                      input={<OutlinedInput label='Languages' id='select-multiple-language' />}
                    >
                      <MenuItem value='English'>English</MenuItem>
                      <MenuItem value='French'>French</MenuItem>
                      <MenuItem value='Spanish'>Spanish</MenuItem>
                      <MenuItem value='Portuguese'>Portuguese</MenuItem>
                      <MenuItem value='Italian'>Italian</MenuItem>
                      <MenuItem value='German'>German</MenuItem>
                      <MenuItem value='Arabic'>Arabic</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
              name='languages'
            />
            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>
              {errors.languages?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl> */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <FormControl>
                    <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
                    <RadioGroup
                      onChange={onChange}
                      value={value || defaultValue}
                      row
                      aria-label='gender'
                      name='account-settings-info-radio'
                    >
                      <FormControlLabel value='male' label='Male' control={<Radio />} />
                      <FormControlLabel value='female' label='Female' control={<Radio />} />
                      <FormControlLabel value='other' label='Other' control={<Radio />} />
                    </RadioGroup>
                  </FormControl>
                </>
              )}
              name='gender'
            />
            <Typography style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{errors.gender?.message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
