import {  Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { updateProduct } from '../redux/allSlice'

function Home(props) {

  const recivedData=useSelector(state=>state)
  const dispatch=useDispatch()
   const clickOnPhoto=(ele)=>{
       dispatch(updateProduct(ele))
       props.history.push('/product')
   }
  return (
    <div style={{backgroundColor:'#ADD8E6',height:'100vh'}}>
      
     
  <Paper component={Box} sx={{width:'50%',marginLeft:'25%'}}>

  {recivedData.finalData.products.length !==0 && <Carousel variant="dark">
          {recivedData.finalData.products && recivedData.finalData.products.map((ele,index)=>{
            return <Carousel.Item key={index}>
            <img
            style={{height:'500px'}}
            className="d-block w-100"
            src={ele.itemImage}
            alt="First slide"
            onClick={()=>{clickOnPhoto(ele)}}
            />
             <Carousel.Caption>
      <h3>{ele.itemName}</h3>
      <p>{ele.itemDesc}</p>
    </Carousel.Caption>
          </Carousel.Item>
          })}
          </Carousel>
}
         </Paper>

    </div>
  )
}

export default withRouter(Home)