const express = require("express");
const router =new express.Router();
const Products =require("../models/productsSchema");
const USER=require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate=require("../middleware/authenticate");



//get product data api
router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata=await Products.find();
        //console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    }catch(error){
        console.log("error"+error.message);
    }

})

//get individual data
router.get("/getproductsone/:id",async(req,res)=>{
    try{

        const {id} =req.params;
        //console.log(id);

        const individualdata= await Products.findOne({id:id});
        //console.log(individualdata + "individual data");

        res.status(201).json(individualdata);

    }catch(error){
        res.status(400).json(individualdata);
        console.log("error"+error.message);
    }
});

//register data

router.post("/register",async(req,res)=>{
    //console.log(req.body);

    const {fname,email,mobile,password,cpassword}=req.body;

    if(!fname|| !email || !mobile|| !password||!cpassword){
        res.status(422).json({error:"fill the all data"});
        console.log("no data available");
    };

        try {

            const preuser = await USER.findOne({ email: email });
    
            if (preuser) {
                res.status(422).json({ error: "This email is already exist" });
            } else if (password !== cpassword) {
                res.status(422).json({ error: "password are not matching" });;
            } else {
    
                const finalUser = new USER({
                    fname, email, mobile, password, cpassword
                });
    
                
    
                const storedata = await finalUser.save();
                console.log(storedata + "user successfully added");
                res.status(201).json(storedata);
            }
    
    }catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

//login user api

// login data
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin + "uservalue");
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            //console.log(isMatch);

            // token generate
            const token=await userlogin.generateAuthToken();
            //console.log(token);

            res.cookie("Farmerapp",token,{
                expires:new Date(Date.now()+9000000),
                httpOnly:true
                

            })



            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
            }else {
                res.status(201).json(userlogin);
            }

        } else{
            res.status(400).json({error:"invalid details"});
        }
    

    } catch (error) {
        res.status(400).json({ error: "invalid details" });
    }
});

//adding the data into cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try{
        const {id} =req.params;
        const cart=await Products.findOne({id:id});
        console.log(cart + "cart value");

        const UserContact=await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData =await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);


        }else{
            res.status(401).json({error:"invalid user"});
        }


    }catch(error){
        res.status(401).json({error:"invalid user"});
    }
});

//get cart details

router.get("/cartdetails",authenticate,async(req,res)=>{
    try{
        const buyuser =await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);

    }catch(error){
        console.log("error"+ error)
    }
})

//get valid user

router.get("/validuser",authenticate,async(req,res)=>{
    try{
        const validuserone =await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);

    }catch(error){
        console.log("error"+ error)
    }
})


// Remove item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        // Use filter to remove the item with the specified id from the carts array
        req.rootUser.carts = req.rootUser.carts.filter((curval) => curval.id !== id);

        // Save the updated user document
        await req.rootUser.save();

        res.status(200).json(req.rootUser);
        console.log("Item removed successfully");
    } catch (error) {
        console.log("Error:", error);
        res.status(400).json({ error: `Failed to remove item with ID ${id} from cart` });
    }
});





//for user logout

router.get("/logout",authenticate,(req,res)=>{
    try{
        req.rootUser.tokens=req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });


        res.clearCookie("Farmerapp",{path:"/"});

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens)
        console.log("user logout");
    }catch(error){
        console.log("error for user logout");
    }
}
);

router.put('/updatequantity/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
  
      // Find the product by id and update the quantity
      const product = await Products.findOneAndUpdate(
        { id: id },
        { $set: { quantity: quantity } },
        { new: true }
      );
  
      // Send the updated product as the response
      res.status(201).json(product);
    } catch (error) {
      console.log('Error updating quantity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router