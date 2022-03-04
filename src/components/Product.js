import { Button, Card, CardActionArea, CardMedia, Container, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCart } from '../redux/allSlice'

function Product(props) {
    const recivedData=useSelector(state=>state)
    const dispatch=useDispatch()
    const addToCartElement = () => {
        dispatch(addCart(recivedData.finalData.product))
    }
    return (
        <div>
            <Container>

                <Paper component={Box}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="500"
                                        image={recivedData.finalData.product.itemImage}
                                        alt="green iguana"
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                         <Card>
                             <CardActionArea>
                                 <Typography variant='h2'>{recivedData.finalData.product.itemName}</Typography>
                                 <Typography variant='h6'>{recivedData.finalData.product.itemDesc}</Typography>
                                 <Typography variant='h2'>{recivedData.finalData.product.itemPrice}</Typography>
                                 <Button variant='contained' onClick={()=>{addToCartElement()}}>Add To Cart</Button>
                             </CardActionArea>
                         </Card>
                        </Grid>
                    </Grid>
                </Paper>

            </Container>
        </div>
    )
}

export default withRouter(Product)