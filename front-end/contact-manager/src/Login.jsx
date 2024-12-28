import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { URL } from './constants.js'
//import tailwind from 'tailwindcss'

async function performRegister (email, password, username) {
  try {
    const response = await axios.post(`${URL}users/register`, {
      username: username,
      email: email,
      password: password
    })
    console.log(response)
  } catch (error) {
    console.log(error.stack)
    console.log(error.message)
  }
}

function Login (props) {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    //setEmail(e.target.email.value)
    //setPassword(e.target.password.value)
    try{
      const response = await axios.post(`${URL}users/login`, {
        "email": e.target.email.value,
        "password": e.target.password.value
      })
      const output = {
        userID: response.data.id,
        accessToken: response.data.accessToken
      }
      props.callBack(output.userID, output.accessToken)
    } catch (err) {
      console.log(err.stacktrace)
    }
    e.target.email.value = ""
    e.target.password.value = ""
  }

  const handleRegister = (e) => {
    e.preventDefault()
    //setEmail(e.target.email.value)
    //setPassword(e.target.password.value)
    const out = performRegister(e.target.email.value, e.target.password.value, e.target.username.value);
    e.target.username.value = ""
    e.target.email.value = ""
    e.target.password.value = ""
  }

  return (
    <div className="flex">
      <form 
        onSubmit={(e) => handleLogin(e)}
        className='flex-1'
      >
        <h2 className="underline underline-offset-3 text-2xl pb-5">Login</h2>
        <div>
          <label 
            className="block mb-1 mt-3 text-sm font-medium text-gray-900 dark:text-white"
          >Email: </label>
          <input 
            name = "email"
            type="text" 
            placeholder="enter email here" 
            required 
            id="email1"
            className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
          />
            <label
            className="block mb-1 mt-7 text-sm font-medium text-gray-900 dark:text-white"
          >Password: </label>
          <input 
            name = "password"
            type="password" 
            placeholder="enter password here" 
            required 
            className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="m-3 pt-4">
            <button 
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="border border-slate-400 mx-8 rounded-lg flex-2"/>
      <form 
        onSubmit={(e) => handleRegister(e)}
        className='flex-1'
      >
        <h2 className="underline underline-offset-3 text-2xl">Register</h2>
        <div>
        <div className="block mb-1 mt-3 text-sm font-medium text-gray-900 dark:text-white">Username: </div>
          <input 
            name = "username"
            type="text" 
            placeholder="enter username here" 
            required
            className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="block mb-1 mt-3 text-sm font-medium text-gray-900 dark:text-white">Email: </div>
          <input 
            name = "email"
            type="text" 
            placeholder="enter email here" 
            required
            className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="block mb-1 mt-3 text-sm font-medium text-gray-900 dark:text-white">Password: </div>
          <input 
            name = "password"
            type="password" 
            placeholder="enter password here" 
            required
            className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="m-2">
            <button 
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login