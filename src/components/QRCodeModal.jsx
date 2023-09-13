import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from 'react-router-dom';
import { toastHandler } from '../ToastHandler';

export default function QRCodeModal({setToggleQR}) {
    const navigate = useNavigate();
    const [scanResult, setScanResult] = useState(null);
  
  useEffect(()=>{
    const scanner = new Html5QrcodeScanner('reader',{
      qrbox:{
        width:150,
        height:150,
      },
      fps: 5,
    });
    scanner.render(success, error);
  
    function success(result){
      scanner.clear();
      navigate(`/admin/dashboard/scan/${result}`);
      setToggleQR(false);
    }
  
    function error(err){
    }
  },[])

  return (
    <div className=' w-full z-50 h-screen bg-gray-600 bg-opacity-75 absolute flex flex-grow justify-center items-center '> 
        <div className=' w-auto h-auto p-10 bg-white flex flex-col justify-center items-center gap-2 shadow-md rounded-md relative '>
            <div className=' bg-cyan-500 text-white text-lg py-1 px-3 rounded-full absolute top-3 right-3 cursor-pointer hover:shadow-md ' onClick={()=>setToggleQR(false)} >X</div>
            <h1 className=' text-2xl uppercase font-bold text-zinc-700 '>Hold To Scan</h1>
            <h3 classname=" text-zinc-600 text-sm " >Scan patient QR code with this QR code Scanner </h3>
            <div id='reader' className=' h-96 w-96 '>

            </div>
        </div>
    </div>
  )
}
