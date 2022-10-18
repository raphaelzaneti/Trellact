import React, { useState, createContext, useContext } from 'react'

export const UserContext = createContext()


export default function UserProvider(props){
    
    const [user, setUser] = useState({})
    
    return(
        <UserContext.Provider value={{
            user, 
            setUser,
         }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUser(){
    const context = useContext(UserContext)

    const {user, setUser} = context

    return {user, setUser}
}