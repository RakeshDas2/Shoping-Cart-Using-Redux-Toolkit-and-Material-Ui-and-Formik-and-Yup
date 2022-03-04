import { Avatar, Container, Grid, Paper, Typography, Card, CardMedia, CardActionArea } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFromCart, updateIndex, updateQty } from '../redux/allSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { withRouter } from 'react-router-dom';

function Cart() {
    const recivedData = useSelector(state => state)
    console.log(recivedData);
    const dispatch = useDispatch()
    const [individualPrice, setIndividualPrice] = useState([])
    const [totalPrice, setTotalPrice] = useState('')

    useEffect(() => {
        const arrayOfPrice = recivedData.finalData.cartProducts.map((ele) => {
            return parseInt(ele.itemPrice * ele.itemQty)
        })
        setIndividualPrice(arrayOfPrice)
    }, [recivedData.finalData.cartProducts])


    useEffect(() => {
        const totalValue = individualPrice.reduce((a, b) => {
            return parseInt(a) + parseInt(b)
        }, 0)
        setTotalPrice(totalValue)
    }, [individualPrice])


    const deleteData = (index) => {
         
        dispatch(deleteFromCart(index))
    }

    const incrementQty = (qty, index) => {
        dispatch(updateIndex(index))
        dispatch(updateQty(qty + 1))
    }

    const decrementQty = (qty, index) => {
        if (qty > 1) {
            dispatch(updateIndex(index))
            dispatch(updateQty(qty - 1))
        }
    }

    return (
        <div>
            <Container>
                <Grid container spacing={2} >
                    <Grid item xs={8}>
                        <Paper component={Box}  >
                            {recivedData.finalData.cartProducts && recivedData.finalData.cartProducts.map((ele, index) => {
                                return <Paper component={Box} p={2} key={index}>

                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="160"
                                                        
                                                        image={ele.itemImage}
                                                        alt="green iguana"
                                                    />
                                                </CardActionArea>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <AddCircleOutlineSharpIcon onClick={() => { incrementQty(ele.itemQty, index) }} /><Typography >{ele.itemQty}</Typography><RemoveCircleOutlineSharpIcon onClick={() => { decrementQty(ele.itemQty, index) }} />
                                                </div>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div style={{textAlign:'center'}} >
                                                <Typography variant='h4'> {ele.itemName}</Typography>
                                                <Typography variant='subtitle1'>{ele.itemDesc}</Typography>
                                                <Typography variant='h6'> <CurrencyRupeeIcon sx={{ marginBottom: '-1.5%' }} />{ele.itemPrice * ele.itemQty}</Typography>
                                                {/* <DeleteIcon  onClick={() => { deleteData(index) }} /> */}
                                            </div>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <DeleteIcon onClick={() => { deleteData(index) }} sx={{marginLeft:'50%'}} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={4}   >
                        <Card >
                            <CardActionArea>
                                <Typography variant='h4'>Total Price</Typography>
                                <Typography><CurrencyRupeeIcon sx={{ marginBottom: '-1.5%' }} />{totalPrice}</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(Cart)
