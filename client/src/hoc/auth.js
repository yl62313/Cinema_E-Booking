import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from "../_actions/user_action"



export default function Auth (SpecificComponent, option, adminRoute = null) {
// option - null: page accessible to anyone
//        - true: page accessible only to logged-in users
//        - false: The page that the logged-in user is not allowed to enter

// adminRoute - null: page accessible to anyone

  function AuthenticationCheck(_props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response)

       // Not logged in
        if (!response.payload.isAuth) {
          if (option) {
            console.log('not logged in')
            navigate('/login')
          }
        } else {
          // Logged in
          if (adminRoute && !response.payload.isAdmin) {
            console.log('admin')
            navigate('/')
          } else if (option === false) {
            console.log('Logged in')
            navigate('/')
          }
        }
      })
    }, [dispatch,navigate])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck
}