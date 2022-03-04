import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { string } from 'yup'
import { object } from 'yup'
import { addDataForUserDetails } from '../redux/allSlice'
// import * as Yup from 'yup'

function SignUpForm(props) {

const recivedData=useSelector(state=>state)
const dispatch=useDispatch()
console.log(recivedData);

    const [userDetails,setUserDetails]=useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        password: '',
        picked: ''
    })

    console.log(userDetails)

    const goToSignIn=()=>{
        props.history.push('/')
    }

    // const validationSchemas =object.shape({
    //     firstName:string().min(3, 'Too short').max(10, 'To long').required('please enter first name')
    // });
    return (
        <div>
            <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                direction="column"
                style={{ backgroundColor: 'grey', height: '130vh' }}>
                <Grid item>
                    <Paper component={Box} style={{ width: '40%', marginTop: '7%' }}>
                        <Formik initialValues={userDetails} onSubmit={(values, formikHelper) => {
                            console.log(values);
                             dispatch(addDataForUserDetails(values))
                            setUserDetails(values)
                            formikHelper.resetForm()
                        }}
                            validationSchema={object({
                                firstName: string().min(3, 'Too short').max(10, 'To long').required('please enter first name'),
                                lastName: string().min(3, 'Too short').max(10, 'To long').required('please enter last name'),
                                phoneNo: string().required('please eneter phoneNumber').matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, 'phone number is not valid'),
                                email: string().required('please enter email').email('invalid email'),
                                password: string().required('please enter password').matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                ),
                                picked:string().required('Please select one')
                            })}
                        >
                            {({ errors, isValid, touched, dirty }) => <Box p={1}>
                                <Avatar />
                                <Typography variant='h5'>Sign Up</Typography>
                                <Form>
                                    <Field
                                        name='firstName'
                                        type='text'
                                        as={TextField}
                                        variant='outlined'
                                        color='secondary'
                                        label='firstName'
                                        size='small'
                                        fullWidth
                                        error={Boolean(errors.firstName) && Boolean(touched.firstName)} helperText={Boolean(touched.firstName) && errors.firstName}
                                    />
                                    <Box height={16} />
                                    <Field
                                        name='lastName'
                                        type='text'
                                        as={TextField}
                                        variant='outlined'
                                        color='secondary'
                                        label='lastname'
                                        size='small'
                                        fullWidth
                                        error={Boolean(errors.lastName) && Boolean(touched.lastName)} helperText={Boolean(touched.lastName) && errors.lastName} />
                                    <Box height={16} />
                                    <Field
                                        name='phoneNo'
                                        type='number'
                                        as={TextField}
                                        variant='outlined'
                                        color='secondary'
                                        label='phone No'
                                        size='small'
                                        fullWidth
                                        error={Boolean(errors.phoneNo) && Boolean(touched.phoneNo)} helperText={Boolean(touched.phoneNo) && errors.phoneNo} />
                                    <Box height={16} />
                                    <Field
                                        name='email'
                                        type='email'
                                        as={TextField}
                                        variant='outlined'
                                        color='secondary'
                                        label='email'
                                        size='small'
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
                                        size='small'
                                        fullWidth
                                        error={Boolean(errors.password) && Boolean(touched.password)} helperText={Boolean(touched.password) && errors.password} />
                                    <Box height={16} />
                                    <div role="group" aria-labelledby="my-radio-group">
                                        <label>
                                            <Field type="radio" name="picked" value="Admin" />
                                            Admin
                                        </label>
                                        <label>
                                            <Field type="radio" name="picked" value="Customer" />
                                            Customer
                                        </label>
                                        </div>

                                        <Box height={16} />
                                        <Button type='submit' variant='contained' size='medium' disabled={!dirty || !isValid} >Sign In</Button>

                                </Form>
                            </Box>}
                        </Formik>
                        <Typography>Already have account then click here to go <Button onClick={()=>{goToSignIn()}}>Sign In</Button></Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    )
}

export default withRouter(SignUpForm)