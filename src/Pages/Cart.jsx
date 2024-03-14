import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../REDUX/slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {

  
  const dispatch = useDispatch()
  const cartItems = useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal] = useState(0)

  useEffect(()=>{
    if(cartItems?.length>0){
      setCartTotal(cartItems?.map(items=>items.totalPrice).reduce((t1,t2)=>t1+t2))
    }else{
      setCartTotal(0)
    }
  },[cartItems])

  const handleDecrementQuantity = (product)=>{
    if(product.quantity>1){
      dispatch(decQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCheckOut = ()=>{
    dispatch(emptyCart())
    toast.success("Order placed successfully...Thank You For Purchasing with us")
  }

  return (
    <>
    <Header/>
      <div className='conatiner' style={{marginTop:'100px'}}>
      { cartItems?.length>0?
       <div className="p-5 ">
          <h1>Cart Summery</h1>
          <div className="row mt-5">
            <div className="col-lg-8">
        <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
         { 
         cartItems?.map((product,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{product.title.slice(0,16)}</td>
            <td><img width={'60px'} height={'60px'} src={product.thumbnail} alt="" /></td>
            <td> 
              <div className='d-flex justify-content-spacearound'>
                <button onClick={()=>handleDecrementQuantity(product)} className='btn fw-bolder'>-</button>
                <input value={product.quantity} style={{width: '50px'}} className='form-control' type="text" placeholder='0' readOnly/>
                <button onClick={()=>dispatch(incQuantity(product.id))}  className='btn fw-bolder'>+</button>
              </div>
            </td>
            <td>{product.totalPrice}</td>
            <td>
              <button onClick={()=>dispatch(removeCartItem(product.id))} className='btn '><i className="fa-solid fa-trash text-primary"></i></button>
            </td>
          </tr>
         ))
         }
        </tbody>
        </table>
        <div className='float-end mt-3'>
          <button onClick={(e)=>dispatch(emptyCart(e))} className='btn btn-primary me-4'>EMPTY CART </button>
          <button className='btn' style={{backgroundColor: '#8b0bdb',color: 'white'}}>SHOP MORE</button>
        </div>
            </div>
            <div className="col-lg-4">
            <Card className='shadow' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Total Items:<span className='text-primary fw-bolder ms-2'>{cartItems?.length}</span></Card.Title>
                <Card.Subtitle className="mb-2 text-muted fw-bolder ms-2">Total Amount:<span className='text-primary'>$ {cartTotal}</span></Card.Subtitle>
              <button onClick={handleCheckOut} className='btn btn-success'> Check Out</button>
              
              </Card.Body>
            </Card>
        </div>

          </div>
        </div>
        :
        <div style={{height:'70vh'}} className='w-100 d-flex justify-content-center align-items-center'> 
        <img  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="" /> 
        <h1 className='text-center'>Your Cart is Empty</h1>
        </div>
        }
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default Cart