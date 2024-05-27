import React, { createContext } from 'react'
import { useState,useContext } from 'react'
import NavBar from './NavBar';


export const buttonContext = createContext();

export default function ValueContext({children}) {
    const [selectedValue, setSelectedValue] = useState('all');

  return (
    <buttonContext.Provider value={{selectedValue,setSelectedValue}} >
        {children}
    </buttonContext.Provider>
    
  )
}
