import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from "../redux/action/PaymentAction";
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';

const inputStyle = "p-2 border focus:border-blue-400 rounded text-sm focus:outline-none";

function UpdatePaymentModal({ show, setModal, updateData, setUpdateData, }) {
  const dispatch = useDispatch();
  const hmo = useSelector((state)=>state.insurance.payload.filter((val)=>val.patient.patientId===updateData.patientId));
  const hmoList = hmo.filter((val)=>val.insuranceId!==updateData.insuranceId);
  
  const [hmoInfo, setHMOInfo] = useState({
    hmoName:updateData?.insurance?.card,
    insuranceId:updateData?.insurance?.insuranceId,
    id: updateData.id
  });
  
  const handleFormChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    })
  }

  const handleHMOChange = (e) => {
    const data = hmo.filter((val)=>val.card===e.target.value);
    setHMOInfo({...hmoInfo, hmoName:data[0]?.card, insuranceId:data[0]?.insuranceId})
  }

  const btnSubmit = async () => {
    if (!updateData.totalPayment) return toastHandler("error", "Fill up empty field")

    if(updateData.insurance && hmoList.length > 0){
      const dataResult = { ...hmoInfo, totalPayment:updateData.totalPayment};
      dispatch(updatePayment(dataResult));
    }
    if(!updateData.insurance){
      dispatch(updatePayment(updateData));
    }
    toastHandler("success", "Update payment successfully!");
    setModal(false);
  }

  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute left-0 top-0 z-50 flex justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[600px] bg-zinc-100 rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Update Payment</h2>
        </div>
        {/*//~ HEADER */}


        <form action="post" className='grid gap-3 p-4' >

          <div className='flex flex-col gap-1 w-full relative'>
              {
                !updateData.insurance && (
                  <>
                    <label htmlFor='payment' className='font-medium text-slate-600'>Payment Method</label>
                    <select name="method" id='payment' value={updateData.method} onChange={(e) => handleFormChange(e)} className={inputStyle}>
                      <option value="" disabled >Select payment method...</option>
                      <optgroup label='Online Payment' className=' font-semibold '>
                        <option value="e-payment/gcash">GCash</option>
                        <option value="e-payment/paymaya">Paymaya</option>
                      </optgroup>
                      <option value="cash">Cash</option>
                    </select>
                  </>
                )
              }
              {
                updateData.insurance && (
                  <>
                    <label htmlFor='payment' className='font-medium text-slate-600'>Payment Method</label>
                    <select name="method" id='payment' value={hmoInfo.hmoName} onChange={(e) => handleHMOChange(e)} className={inputStyle}>
                      <option value="" disabled >Select payment method...</option>
                      {
                        hmoList.length > 0 && hmoList.map((val)=>(
                          <option value={val.card}>{val.card}</option>
                        ))
                      }
                    </select>
                  </>
                )
              }
          </div>

          <div className='flex flex-col gap-1 w-full relative'>
            <label htmlFor="total" className='font-medium text-slate-600'>Payment Total</label>
            <input type="number" id='total' name='totalPayment' value={updateData.totalPayment} className={inputStyle}
              onChange={(e) => handleFormChange(e)} />
          </div>
        </form>

        <div className='flex gap-2 p-4 justify-end'>
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setModal(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={btnSubmit}>Save Changes</button>
        </div>

      </div>
    </div >
  )
}

export default UpdatePaymentModal;