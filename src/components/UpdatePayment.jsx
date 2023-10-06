import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePayment } from "../redux/action/PaymentAction";
import { toastHandler } from '../ToastHandler';

function UpdatePaymentModal({show, setModal, setData, data,updateData,setUpdateData}) {
  const dispatch = useDispatch();


  const handleFormChange = (e) =>{
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    })
  }

  const btnSubmit = async() =>{
    if(!updateData.totalPayment) return alert("Fill up empty field.");
    dispatch(updatePayment(updateData));
    toastHandler("success","Update payment successfully!")
    setModal(false);
  }
  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute left-0 top-0 z-40 flex justify-center items-center ${show ? '': 'hidden'}`}>
        <div className=" z-50">
          <div className="m-auto w-[500px] h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold mb-2">Update Payment</h2>
              <hr /><br />
              <form className=' flex flex-col '>
                  <div className=' mb-2 flex flex-col gap-1 relative '>
                    <label htmlFor='patient' className='font-bold text-gray-600 '>
                      Payment Method
                    </label>
                    <select name="method" value={updateData.method} onChange={(e)=>handleFormChange(e)} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '>
                      <option value="" disabled >Select payment method...</option>
                      <optgroup label='Online Payment' className=' font-semibold '>
                        <option value="e-payment/gcash">GCash</option>
                        <option value="e-payment/paymaya">Paymaya</option>
                      </optgroup>
                      <option value="cash">Cash</option>
                      {/* {
                        insuranceList.length > 0 ? (
                          <option value="hmo">Health Insurance</option>
                        )
                        :""
                      } */}
                    </select>
                    </div>

                
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="name" className='font-bold text-gray-600 '>Payment Total</label>
                    <input type="number" name='totalPayment' value={updateData.totalPayment}  className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' 
                    onChange={(e)=>handleFormChange(e)} />
                </div>
                
                
              </form>
            </div>
            <div className="flex justify-end pt-2 gap-2">
                <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" 
                onClick={btnSubmit}
                >
                Submit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UpdatePaymentModal;