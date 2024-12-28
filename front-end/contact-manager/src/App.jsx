//import { setState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Manager from './Manager.jsx'
import { useState } from 'react'

//make the router functionality here

function App() {
  const [user_id, set_userID] = useState(0);
  const [jwt, set_jwt] = useState("")

  function callBackFunction (idInput, jwtInput) {
    set_userID(idInput)
    set_jwt(jwtInput)
  }
  
  if (!user_id || !jwt){
    return (
    <div className="">
      <Login callBack={callBackFunction}/>
    </div>
    )
  } else {
    return (
      <>
        <Manager id={user_id} jwt={jwt} callBack={callBackFunction}/>
      </>
    )
  }
}

export default App
