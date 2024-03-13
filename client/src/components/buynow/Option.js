import React,{useContext} from 'react'
import { LoginContext } from '../context/ContextProvider';


const Option = ({ deletedata, get }) => {
  // console.log(deletedata);

  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const removedata = async () => {
    try {
      const res = await fetch(`/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      console.log("Response status:", res.status);
  
      if (res.status === 201) {
        const data = await res.json();
        console.log("User deleted:", data);
        get();
      } else {
        console.log("Error deleting user. Server response:", await res.text());
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  
  
      

  
  
  
  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{cursor:"pointer"}} onClick={()=>removedata(deletedata)}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save or later</p><span>|</span>
      <p className='forremovemedia'>See more like this</p>
    </div>

  )
}

export default Option