// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormModal from 'src/views/form-layouts/FormModal'
import { TextField } from '@mui/material'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormModal title='Create New User' buttonName='Create User'>
            <TextField fullWidth label='Name' placeholder='Leonard Carter' margin="dense"/>
            <TextField fullWidth type='email' label='Email' placeholder='carterleonard@gmail.com' margin="dense"  />
            <TextField fullWidth type='password' label='Password' placeholder='Password' margin="dense"  />
            <TextField fullWidth type='password' label='Confirm Password' placeholder='Confirm Password' margin="dense"  />
          </FormModal>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLayoutsBasic />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLayoutsIcons />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsSeparator />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsAlignment />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
