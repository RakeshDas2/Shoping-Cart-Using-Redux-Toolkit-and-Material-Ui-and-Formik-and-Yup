
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { string } from 'yup'
import { object } from 'yup'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { updateNavBar, updateUserType } from '../redux/allSlice'



function SignInForm(props) {
  const recivedData = useSelector(state => state)
  const dispatch=useDispatch()
  console.log(recivedData);
  const initialValue = {
    email: '',
    password: ''
  }
  const goToSignUp=()=>{
    props.history.push('/sign_up')
  }
  return (
    <div >
<Grid 
container
align='center'
justify='center'
direction='column'

>
  <Grid item>

  
      <Paper component={Box} elevation={20} square sx={{ width: '40%', marginTop: '10%' }}>
        <Box p={2}>
          <Avatar>
            <  AssignmentIndIcon color='primary' />
          </Avatar>
          <Box p={1} />
          <Typography variant='h4'>Sign In</Typography>
          <Box p={1} />
          <Formik initialValues={initialValue} onSubmit={(values, formikHelper) => {
            console.log(values);
            const findeIndexOfUserEmail = recivedData.finalData.userDetails.findIndex(ele => ele.email === values.email)
            const userPassword=recivedData.finalData.userDetails[findeIndexOfUserEmail].password

            if (findeIndexOfUserEmail !== -1 && userPassword===values.password) {
              props.history.push('/home')
              dispatch(updateUserType(findeIndexOfUserEmail))
              dispatch(updateNavBar(true))
            } else {
              alert('Password or email id is incorrect')
            }
            formikHelper.resetForm()
          }}
            validationSchema={object({
              email: string().required('please enter email').email('invalid email'),
              password: string().required('please enter password').matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              )
            })}
          >
            {({ errors, isValid, touched, dirty }) => <Form>

              <Field
                name='email'
                type='email'
                as={TextField}
                variant='outlined'
                color='secondary'
                label='email'
                fullWidth
                error={Boolean(errors.email) && Boolean(touched.email)} helperText={Boolean(touched.email) && errors.email} />
              <Box p={1} />
              <Field
                name='password'
                type='password'
                as={TextField}
                variant='outlined'
                color='secondary'
                label='password'
                fullWidth
                error={Boolean(errors.password) && Boolean(touched.password)} helperText={Boolean(touched.password) && errors.password} />
              <Box height={16} />
              <Button type='submit' variant='contained' size='medium' disabled={!dirty || !isValid} >Sign In</Button>
            </Form>}
          </Formik>
          <Typography>Dont have Account Click Here To <Button onClick={()=>{goToSignUp()}}>Sign Up</Button></Typography>
        </Box>
      </Paper>
      </Grid>
</Grid>
    </div>
  )
}

export default withRouter(SignInForm)