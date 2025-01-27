import React, { useContext, useEffect, useState} from 'react'
import "./cart.css";
import { products } from '../home/productdata';
import { Divider } from '@mui/material';
import { LoginContext } from '../context/ContextProvider';
import { useNavigate,useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {

    const { id } = useParams("");
    // console.log(id);

    const history=useNavigate("");
    

    const {account,setAccount}=useContext(LoginContext)

    const [inddata,setInddata]=useState("");
    console.log(inddata);



    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        });

        const data = await res.json();
        //console.log(data);

        if(res.status!==201){
            console.log("no data available");

        }
        else{
            console.log("getdata");
            setInddata(data)
        }

    
    }


    useEffect(()=>{
        setTimeout(getinddata,1000)

    },[id]);

    //addcartfunction

    const addtocart=async(id)=>{
        const checkres= await fetch(`/addcart/${id}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                inddata
            }),
            credentials:"include"
    });

    const data1=await checkres.json();
    console.log(data1);

    if(checkres.status === 401 || !data1){
        console.log("user invalid");
        alert("user invalid");
    }else{
        //alert("data added in your cart");
        history("/buynow")
        setAccount(data1)
    }
}


  return <div className="cart_section">
    {inddata && Object.keys(inddata).length && 
        <div className="cart_container">
        <div className="left_cart">
        <img src={inddata.url}  alt=""/>
        <div className="cart_btn">
        <button className="cart_btn1" onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
        <button className="cart_btn2">Buy Now</button>
         </div>
         </div>
         <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">MRP: Rs{inddata.price.mrp}</p>
            <p>Deal of the day : <span style={{color:"#B12704"}}>Rs.{inddata.price.cost}.00</span></p>
            <p>You save : <span style={{color:"#B12704"}}>Rs{inddata.price.mrp-inddata.price.cost}({inddata.price.discount})</span></p>
            
            <div className="discount_box">
                <h5>Discount : <span style={{color:"#111"}}>{inddata.discount}</span></h5>
                <h4>Free Delivery<span style={{color:"#111",fontWeight:600}}>Oct 8 - 21</span> Details </h4>
                <p>Fastest Delivery:<span style={{color:"#111",fontWeight:600}}>Tomorrow 11AM</span></p>
            </div>
            <p className='description'>About the item:<span style={{color:'#565959',fontSize:14,fontWeight:500,letterSpacing:"0.4px"}}>{inddata.description}</span></p>



         </div>

      </div>
}
{!inddata ?<div className='circle'>
          <CircularProgress />
          <h2>Loading...</h2>

        </div>:""}
      </div>

  
};

export default Cart