import axios from 'axios'
import { URL } from './constants.js'
import { useState, useEffect } from 'react'
import DataTable from './DataTable.jsx'

function Manager (props) {
  const [username, setUsername] = useState("")
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState("")
  const [fillData, setfillData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  useEffect(() => { //on mount actions 
    usernameSetter()
    contactsSetter()
  }, [])

  useEffect(() => {
    retrieveContact()
  }, [selectedContact])

  const jwtAxios = axios.create({
    baseURL: URL,
    headers: {
      authorization: `Bearer ${props.jwt}`
    }
  })

  function logout () {
    props.callBack(0,"")
  }

  function selectContact(id) {
    if (id === selectedContact){
      setSelectedContact("")
      setfillData({
        name: "",
        email: "",
        phone: ""
      })
    } else {
      setSelectedContact(id)
    }
  }

  async function usernameSetter () {
    try {
      const response = await jwtAxios.get("users/current")
      setUsername(response.data.username)

    } catch (err) {
      console.log(err.stack)
    }
  }

  async function contactsSetter () {
    try {
      const response = await jwtAxios.get("contacts/")
      setContacts(response.data)

    } catch (err) {
      console.log(err.stack)
    }
  }

  async function addContact (e) {
    try {
      e.preventDefault()
      const response = await jwtAxios.post("contacts/", {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value
      })
      contactsSetter()
      e.target.name.value = ""
      e.target.email.value = ""
      e.target.phone.value = ""
    } catch (err) {
      console.log(err.stack)
    }
  }

  async function deleteContact (id) {
    try {
      const response = await jwtAxios.delete(`contacts/${id}`)
      contactsSetter()
    } catch (err) {
      console.log(err.stack)
    }
  }

  async function updateContact (e) {
    try {
      e.preventDefault()
      console.log("Started Update")
      const response = await jwtAxios.put(`contacts/${selectedContact}`, {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value
      })
      console.log("Finished Update")
      contactsSetter()
      setSelectedContact("")
      e.target.name.value = ""
      e.target.email.value = ""
      e.target.phone.value = ""
    } catch (err) {
      console.log(err.stack)
    }
  }

  async function retrieveContact () {
    try {
      const response = await jwtAxios.get(`contacts/${selectedContact}`)
      setfillData ({
        name: response.data.contacts.name,
        email: response.data.contacts.email,
        phone: response.data.contacts.phone,
      })
      // console.log(fillData)
      // const output = {
      //   name: response.data.contacts.name,
      //   email: response.data.contacts.email,
      //   phone: response.data.contacts.phone
      // }
      // return output
    } catch (err) {
      console.log(err.stack)
    }
  }

  if(selectedContact){
    
    return (
      <>
      <div>
        <h2 className="text-3xl my-6 pb-4">Hello {username}!</h2>
        <form onSubmit={(e) => updateContact(e)}>
        <h3 className=" text-xl pb-3">Update Contact: </h3>
        <div>
          <div className="flex flex-row">
            <div className="flex-auto">
              <div className='block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white float-left'>Name:</div>
              <input 
                name = "name"
                type="text" 
                value={fillData.name}
                onChange={(e)=> {
                  setfillData({
                    name: e.target.value,
                    email: fillData.email,
                    phone: fillData.phone
                  })
                }}
                className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
                required 
              />
              </div>
              <div className="mx-2 flex-auto">
              <div className='block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white float-left'>Email:</div>
              <input 
                name = "email"
                type="text" 
                value={fillData.email}
                onChange={(e)=> {
                  setfillData({
                    name: fillData.name,
                    email: e.target.value,
                    phone: fillData.phone
                  })
                }}
                className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
                required 
              />
              </div>
              <div className="flex-auto">
                <div className='block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white float-left'>Phone:</div>
                <input 
                  name = "phone"
                  type="text" 
                  value={fillData.phone}
                  onChange={(e) => {
                    setfillData({
                      name: fillData.name,
                      email: fillData.email,
                      phone: e.target.value
                    })
                  }}
                  className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
                  required 
                />
              
            </div>
          </div>
          <div>
            <button 
              type="submit"
              className="mb-3 mt-6"
            >
              Update
            </button>
          </div>
        </div>
      </form>
        <DataTable contacts={contacts} deleteCallBack={deleteContact} selectContact={selectContact}/>
      </div>
      <div>
        <button onClick={logout} className="mt-3 mb-6">Logout</button>
      </div>
    </>
    )
  } else {
    return (
      <>
        <div>
          <h2 className="text-3xl my-6 pb-4">Hello {username}!</h2>
          <form onSubmit={(e) => addContact(e)}>
          <h3 className=" text-xl pb-3">Create Contact:</h3>
           <div > {/*container div */}
            <div className="flex flex-row">
              <div className="flex-auto">
              <div className='block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white float-left'>Name:</div>
                <input 
                  name = "name"
                  type="text" 
                  placeholder="enter name here" 
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
                  required 
                />
              </div>
              <div className="mx-2 flex-auto">
                <div className='block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white float-left'>Email:</div>
                <input 
                  name = "email"
                  type="text" 
                  placeholder="enter email here" 
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className='flex-auto'>
                <div className='block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white float-left'>Phone:</div>
                <input 
                  name = "phone"
                  type="text" 
                  placeholder="enter phone here" 
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-blue-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <div>
              </div>
            </div>
            </div>
          </div>
              <button 
                type="submit"
                className="mb-3 mt-6"
              >
                Add To Collection
              </button> 
        </form>
          <DataTable 
            contacts={contacts} 
            deleteCallBack={deleteContact} 
            selectContact={selectContact}
            className=""
          />
        </div>
        <div>
          <button className="mt-3 mb-6" onClick={logout}>Logout</button>
        </div>
      </>
    )
  }
}
    
export default Manager