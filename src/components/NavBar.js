import { AppBar, Box, Button, IconButton, Toolbar, Badge, styled } from '@mui/material'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateNavBar } from '../redux/allSlice';

function NavBar(props) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const recivedData = useSelector(state => state)
    const dispatch=useDispatch()
    console.log(recivedData);
    const goToSignIn = () => {
        props.history.push('/')
        dispatch(updateNavBar(false))
        // localStorage.clear('user_type')
    }
    const goToProducts=()=>{
        props.history.push('/products')
    }
    const goToCart=()=>{
        props.history.push('/cart')
    }
    const goToAddProduct=()=>{
        props.history.push('/add_product')
    }
    const goToHome=()=>{
        props.history.push('/home')
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={()=>{goToHome()}}
                        >
                            Home
                        </IconButton>
                        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
                        <Box sx={recivedData.finalData.userType === 'Admin'?{ flexGrow: 1, marginLeft: '60%' }:{ flexGrow: 1, marginLeft: '70%' }}>
                            <Button color="inherit" onClick={()=>{goToProducts()}}>Products</Button>
                            {recivedData.finalData.userType === 'Admin' && <>
                                <Button color="inherit" onClick={()=>{goToAddProduct()}}>Add Products</Button>
                                <IconButton aria-label="cart" p={3} onClick={()=>{goToCart()}}>
                                    <StyledBadge badgeContent={recivedData.finalData.cartProducts.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton></>
                            }
                            {recivedData.finalData.userType === 'Customer' && <>
                                <IconButton aria-label="cart" p={3} onClick={()=>{goToCart()}}>
                                    <StyledBadge badgeContent={recivedData.finalData.cartProducts.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton></>
                            }
                            <Button color="inherit" sx={{ marginLeft: '3%' }} onClick={goToSignIn}>Logout</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box p={5}/>
        </div>
    )
}

export default withRouter(NavBar)