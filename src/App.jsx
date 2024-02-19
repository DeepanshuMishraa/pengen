import { useCallback } from 'react';
import './index.css'
import { useState,useRef } from 'react'
import { useEffect } from 'react';

function App() {

  const passwordRef = useRef(null);

  const [password, setPassword] = useState('')
  const [length,setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const generatePasswod = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+";

    for(let i=1; i<length;i++){
     const char =  Math.floor(Math.random()*str.length + 1);
     pass += str.charAt(char);
    }

    setPassword(pass);
  })

  useEffect(()=>{
    generatePasswod();
  },[length,numAllowed,charAllowed])

  const copyPasswordToClipboard = ()=>{
    navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  return (
    <div className='w-full h-[50rem] md:h-screen bg-black px-4 py-4  '>
      <h1 className='text-white font-bold  text-center relative top-[14rem] underline'>Made With ❤️</h1>
      <div className=' bg-gray-800 text-white items-center md:w-[400px] h-[200px] text-center px-2 py-2  absolute md:left-[440px] top-[300px] fixed  rounded-lg left-[3rem]  '>
        <h1 className='py-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" placeholder='Password' value={password} className='outline-none w-full px-3 py-1 text-red-700' readOnly ref={passwordRef} />
        <button className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-1'>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)} />
        <label htmlFor="length">Length: {length}</label>
      </div>
      <div className='flex px-2 py-2 text-sm gap-x-1'>
        <input type="checkbox" defaultChecked={numAllowed} onChange={()=>setNumAllowed((prev)=>!prev)} />
        <label htmlFor="numAllowed">Numbers:</label>

      </div>
      <div className='flex px-2 py-2 text-sm gap-x-1'>
        <input type="checkbox" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev)=>!prev)} />
        <label htmlFor="charAllowed">Characters:</label>

      </div>
      </div>  
    </div>
  )
}

export default App
