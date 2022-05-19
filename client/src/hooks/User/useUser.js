import React, { useState, createContext, useContext } from 'react'

export const UserContext = createContext()


export default function UserProvider(props){
    
    const [user, setUser] = useState({})

    const [userList, setUserList] = useState([
        {
            id: 1,
            name: 'General',
            lastName: 'Admin',
            photo: 'https://static.onecms.io/wp-content/uploads/sites/28/2021/07/30/rio-de-janeiro-RIOTG0721.jpg',
        },
        {
            id: 2,
            name: 'Main',
            lastName: 'User',
            photo: 'https://blog-www.pods.com/wp-content/uploads/2019/08/MG_6_1_Miami.jpg',
        },
        {
            id: 3,
            name: 'Second',
            lastName: 'User',
            photo: 'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900',
        }

    ])
    
    return(
        <UserContext.Provider value={{
            user, 
            setUser,
            userList, 
            setUserList
         }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUser(){
    const context = useContext(UserContext)

    const {user, setUser, userList, setUserList} = context

    return {user, setUser, userList, setUserList}
}