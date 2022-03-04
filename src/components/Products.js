import { Card, CardActionArea, CardActions, CardMedia, Container, Fab, Grid, Typography } from '@mui/material'
import React from 'react'
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useDispatch, useSelector } from 'react-redux';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { addCart, deleteFromProducts } from '../redux/allSlice';
import { withRouter } from 'react-router-dom';



function Products() {
    const recivedData = useSelector(state => state)
    console.log(recivedData);
    const dispatch = useDispatch()
    const addToCartElement = (ele) => {
        dispatch(addCart(ele))
    }
    const deleteProduct = (index) => {
dispatch(deleteFromProducts(index))
    }
    return (
        <div>
            <Container>
                <Grid container spacing={3} >
                    {recivedData.finalData.products && recivedData.finalData.products.map((ele, index) => {

                        return <Grid item xs={3} key={index}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia component='img'
                                        height='210'
                                        image={ele.itemImage}

                                    />
                                    <Typography variant='h6'>  {ele.itemName}</Typography>
                                    <Typography variant='subtitle2'> {ele.itemDesc}</Typography>
                                    <Typography variant='h6'> <CurrencyRupeeSharpIcon fontSize='small' />  {ele.itemPrice}</Typography>
                                </CardActionArea>
                                <CardActions>
                                    <Fab variant="extended" color='secondary' onClick={() => { addToCartElement(ele) }}><Typography variant='caption'>Add to cart</Typography></Fab>
                                    {recivedData.finalData.userType === 'Admin' && <><Fab color='error' onClick={() => { deleteProduct(index) }}><DeleteForeverRoundedIcon /></Fab><Fab color='primary'><EditRoundedIcon /></Fab></>}
                                </CardActions>
                            </Card>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(Products)