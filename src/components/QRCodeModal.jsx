import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';

export default function QRCodeModal({ setToggleQR }) {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  let scanner;

  useEffect(() => {
    scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 150,
        height: 150,
      },
      fps: 5,
    });
    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      navigate(`/admin/dashboard/scan/${result}`);
      setToggleQR(false);
    }

    function error(err) {
      console.error('QR Code scan error:', err);
    }

    return () => {
      if (scanner) {
        scanner.clear()
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center">
      <ToastContainer limit={1} autoClose={1500} />

      <div className=' w-auto h-auto p-10 bg-white flex flex-col justify-center items-center gap-2 shadow-md rounded-md relative'>
        <div className='bg-red-400 absolute top-3 right-3 rounded-full p-2 cursor-pointer hover:bg-red-600' onClick={() => setToggleQR(false)}>
          <AiOutlineClose className='text-white' size={24} />
        </div>
        <h1 className='text-2xl uppercase font-bold'>Hold To Scan</h1>
        <h3 classname=" text-zinc-600 text-base " >Scan patient QR code with this QR code Scanner </h3>
        <div id='reader' className=' h-[26rem] w-[26rem] '>

        </div>
      </div>
    </div>
  )
}
