import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { LoginContext } from '../context/ContextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./navbaar.css";
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from "react-redux"

const Navbaar = () => {
  const { account, setAccount } = useContext(LoginContext);

  const  history =useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text,setText]=useState("");
  console.log(text);
  const [liopen,setLiopen]=useState(true);
  const {products}=useSelector(state=>state.getproductsdata);



  const [dropen, setDropen] = useState(false);

  const getDetailValidUser = async () => {
    try {
      const res = await fetch("/validuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (res.status === 201) {
        const data = await res.json();
        setAccount(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleOpen = () => {
    setDropen(true);
  };

  const handleCloseDrawer = () => {
    setDropen(false);
  };
  const logoutuser = async () => {
    try {
      const res2 = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data2=await res2.json();
      console.log(data2);

      if (res2.status !== 201) {
        console.log("Error");
      } else {
        console.log("data valid");
        //alert("logout")
        toast.success("user logout ",{
            position:"top-center",
        })
        setAccount(false);
        history("/");
      }
    }catch(error){

    }
};

const getText=(items)=>{
setText(items)
setLiopen(false)
}


  useEffect(() => {
    getDetailValidUser();
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="left">
            <IconButton className='hamburger' onClick={handleOpen}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
            <Drawer open={dropen} onClose={handleCloseDrawer}>
              <Rightheader Logclose={handleCloseDrawer} Logoutuser={logoutuser}/>
            </Drawer>
            <div className="navlogo">
              <NavLink to="/">
                <img
                  src="https://e7.pngegg.com/pngimages/586/146/png-clipart-logo-nature-leaf-design-grass-abc-logo.png"
                  height="30px"
                  width="2px"
                  alt="Logo"
                />
              </NavLink>
            </div>
            <div className="nav_searchbaar">
              <input type="text" name="" 
              onChange={(e)=>getText(e.currentTarget.value)}
              placeholder='Search your products'
              id="" />
              <div className="search_icon">

                <SearchIcon id="search" />
              </div>
              {/*search filter */}
              {
                text && 
                <List className='extrasearch' hidden={liopen}>
                    {
                        products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                            <ListItem>
                                <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                                {product.title.longTitle}
                                </NavLink>
                               
                            </ListItem>
                        ))
                    }
                </List>
              }
            </div>
          </div>
          <div className="right">
            <div className="nav_btn">
              <NavLink to="/login">signin</NavLink>
            </div>
            <div className="cart_btn">
              {account ? (
                <NavLink to="/buynow">
                  <Badge badgeContent={account.carts?.length || 0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              )}
              < ToastContainer/>
              <p>cart</p>
            </div>
            {account ? (
              <Avatar className='avtar2'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}> {account.fname?.[0]?.toUpperCase()}</Avatar>
            ) : (
              <Avatar className='avtar'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
              </Avatar>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {
                account ? <MenuItem onClick={logoutuser}><LogoutIcon style={{fontSize:16,marginRight:3}}/>Logout</MenuItem>:""
              }
              
            </Menu>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbaar;
