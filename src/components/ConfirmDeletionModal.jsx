import React from 'react'

const ConfirmDeletionModal = ({ showModal, setShowModal, onConfirm }) => {
    const handleCancel = () => {
        // Close the modal by updating the state in the parent component
        setShowModal((prev) => ({ ...prev, name: "", showIt: false }));
    };

    return (
        <div className={`fixed inset-0 left-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 `}>
            <div className=" bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete "<span className="text-red-600 font-bold" id="itemName">{showModal.name}</span>"?</p>

                <div className="flex justify-end">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 focus:outline-none hover:bg-gray-400" onClick={handleCancel}>Cancel</button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-800" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeletionModal