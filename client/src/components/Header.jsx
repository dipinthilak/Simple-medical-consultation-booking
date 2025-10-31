import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate=useNavigate()
const logout=()=>{
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  navigate(`/`);
  
}

  return (
<div className="flex items-center justify-between bg-blue-600 px-6 py-5">
  <h1 className="text-3xl text-white font-semibold text-center flex-1">
    CONSULTATION APP
  </h1>

  <h1 className="text-xl text-white cursor-pointer" onClick={()=>(logout())}>
    LOGOUT
  </h1>
</div>

  )
}

export default Header