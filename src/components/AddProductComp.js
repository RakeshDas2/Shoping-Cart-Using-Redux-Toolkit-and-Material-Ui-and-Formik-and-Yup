import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addProduct } from '../redux/allSlice'

function AddProductComp() {
    const recivedData=useSelector(state=>state)
    console.log(recivedData);
    const [product, setProduct] = useState({
        itemImage: '',
        itemName: '',
        itemDesc: '',
        itemPrice: '',
        itemQty: 1
    })
    const dispatch = useDispatch()

    const CHARACTER_LIMIT = 130
    const CHARACTER_LIMIT1 = 20
    const eventHandler = (e) => {
        const productCopy = { ...product }
        productCopy[e.target.name] = e.target.value
        setProduct(productCopy)

    }

    const addData = () => {
        if (product.itemName.trim() !== '') {
            dispatch(addProduct(product))
            setProduct({
                itemImage: '',
                itemName: '',
                itemDesc: '',
                itemPrice: '',
                itemQty: 1
            })
        }
    }

    return (
        <div>
            <Grid container align='center' justify='center' direction='column' >
                <Grid item>
                    <Paper component={Box} elevation={20} square sx={{ width: '40%' }}>
                        <Box p={2}>
                            <Typography variant='h4'>Add Product</Typography>
                        <TextField
                            label='Item Name'
                            margin='normal'
                            fullWidth
                            color="secondary"
                            variant='outlined'
                            name='itemName'
                            inputProps={{
                                maxLength: CHARACTER_LIMIT1
                            }}
                            onChange={eventHandler}
                            value={product.itemName}
                        />
                        <TextField
                            label='Item Details'
                            margin='normal'
                            fullWidth
                            color="secondary"
                            variant='outlined'
                            name='itemDesc'
                            multiline
                            maxRows={3}
                            inputProps={{
                                maxLength: CHARACTER_LIMIT
                            }}
                            onChange={eventHandler}
                            value={product.itemDesc}
                        />
                        <TextField
                            label='Item Price'
                            margin='normal'
                            fullWidth
                            color="secondary"
                            variant='outlined'
                            type='number'
                            name='itemPrice'
                            onChange={eventHandler}
                            value={product.itemPrice}
                        />
                        <TextField
                            label='Image'
                            placeholder='paste image url'
                            margin='normal'
                            fullWidth
                            color="secondary"
                            variant='outlined'
                            type='url'
                            name='itemImage'
                            onChange={eventHandler}
                            value={product.itemImage}
                        />
                        <Button onClick={()=>{addData()}} variant='contained' size='medium'>Add</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(AddProductComp)