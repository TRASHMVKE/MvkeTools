import React, { useState } from 'react'
import { TbIcons } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { useContext } from 'react';
import { buttonContext } from './ValueContext';



export default function NavBar() {

  const {setSelectedValue,selectedValue} = useContext(buttonContext)
  
  const handleValue = (e) =>{
    setSelectedValue(e.target.value)
  }




  return (
    <nav className='text-white m-10 flex'>
        <div className='grow'>
            <ul data-aos="fade-left" className='gap-5 flex flex-wrap '>
              <button onClick={handleValue} value='all' className='button2 text-2xl '><IoHomeOutline /></button>
              <button onClick={handleValue} value='icons' className='button '><TbIcons />Icons</button>
              <button onClick={handleValue}  value='ilustration' className='button '><TbIcons />Ilustration</button>
              <button onClick={handleValue}  value='photos' className='button '><TbIcons />Photos</button>
              <button onClick={handleValue}  value='videos' className='button  '><TbIcons />Videos</button>
              <button onClick={handleValue}  value='colors' className='button '><TbIcons />Colors</button>
              <button onClick={handleValue}  value='backgrounds' className='button '><TbIcons />Backgrounds</button>

              <button onClick={handleValue}  value='typography' className='button '><TbIcons />Typography</button>
              <button onClick={handleValue}  value='3D' className='button '><TbIcons />3D</button>
              <button onClick={handleValue}  value='library' className='button '><TbIcons />Libraries</button>
              <button onClick={handleValue}  value='blogs' className='button '><TbIcons />Blogs</button>
              <button onClick={handleValue}  value='tools' className='button '><TbIcons />Tools</button>
              <button onClick={handleValue}  value='deploy' className='button '><TbIcons />Deploy</button>
              <button onClick={handleValue}  value='components' className='button '><TbIcons />Components</button>
              <button onClick={handleValue}  value='animations' className='button '><TbIcons />Animations</button>

            </ul>
        </div>
        

      
    </nav>
   

  )
}
