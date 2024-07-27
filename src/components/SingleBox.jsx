import React, { useEffect, useRef, useState } from 'react'

function SingleBox({ value=0, row, col, onChange }) {

    const [number,setNumber] = useState(value)
    const inputRef = useRef()

    useEffect(()=>{
        setNumber(value)
    },[value])

    const handleOnKeyDown = (e) => {
        if(Number(e.key) > 0){
            setNumber(e.key)
            onChange(row, col, Number(e.key));
        }
    }

    const handleOnMouseEnter = () => {
        inputRef.current.focus()
    }

    const handleOnMouseLeave = () => {
        inputRef.current.blur()
    }

    const handleOnChange = (e) => {
        
        const num = Number(e.target.value)
        if(num>0){
            setNumber(e.target.value)
        }
    }

    return (
        <input 
            className={`border cursor-pointer border-black  w-1/3 h-full text-2xl bg-slate-400 hover:bg-slate-500 
                        font-fantasy focus:font-bold focus:text-3xl text-center
                      
                        ${value!==0 ? 'bg-slate-500 cursor-default  ' : 'hover:text-black '} 
                        ${number===0 ? ' text-transparent hover:text-transparent ' : ''} 
                        focus:outline-none caret-transparent`}
            ref={inputRef}
            onKeyDown={handleOnKeyDown}     
            onMouseLeave={handleOnMouseLeave}
            onMouseEnter={handleOnMouseEnter}
            onChange={handleOnChange}
            value={number}
            maxLength={1}
            disabled={value!==0 ? true : false }
        />
            
        
    )
}

export default SingleBox