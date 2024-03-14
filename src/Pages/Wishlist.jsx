import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Header from '../component/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../REDUX/slices/wishlistSlice'
import { addToCart } from '../REDUX/slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wishlist() {

  const cart = useSelector(state=>state.cartReducer)

  const dispatch =useDispatch(removeWishlistItem)
  const wishlist = useSelector(state=>state.wishlistReducer)

  const handleCart = (product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      toast.success("Products added to the cart")
    }else{
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      // alert("Product added to the cart")
    }
  }

  return (
    <>
    <Header/>
    <div className='conatiner' style={{marginTop:'100px'}}>
      { wishlist?.length>0?
      <Row>
        { wishlist?.map(product=>(
          <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
          <Card className='shadow rounded' style={{ width: '18rem' }}>
            <Card.Img style={{height:'180px'}} variant="top" src={product.thumbnail} />
          
            <Card.Body>
              <Card.Title>{product.title.slice(0,15)}...</Card.Title>
              <div className='d-flex justify-content-between'>
                <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn'><i class="fa-solid fa-heart-circle-xmark text-primary"></i> </button>
                <button onClick={()=>handleCart(product)} className='btn'><i class="fa-solid fa-cart-plus text-success"></i> </button>
              </div>
            </Card.Body>
          </Card>
      </Col>
        )) 
        }
      </Row>
      :
      <div style={{height:'70vh'}} className='w-100 d-flex justify-content-center align-items-center'> 
      <img style={{height: '250px'}} src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="" />
      <h1 className='text-center text-primary'>Your Wishlist is Empty</h1>
      </div>
      
      }  
    </div>
    <ToastContainer/>
    </>
  )
}

export default Wishlist