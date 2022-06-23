import React, {useState, createContext, useContext} from "react";

const UpdateContext = createContext()

export default function UpdateProvider(props){
    
    const [update, setUpdate] = useState(false)
  
    return(
        <UpdateContext.Provider value={{
            update, 
            setUpdate
        }}>
            {props.children}
        </UpdateContext.Provider>
    )
}

export function useUpdate(){
    const {update, setUpdate} = useContext(UpdateContext)
    return {update, setUpdate}
}   
