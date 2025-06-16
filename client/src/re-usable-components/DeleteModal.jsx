
export const DeleteModal = ({ deleteByIdFunc, deleteId, setDeleteId }) => {

    const handleDelete = () => {
        deleteByIdFunc(deleteId).then(() => {setDeleteId(0)})
    }
    return (deleteId > 0 &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Are you sure?</h2>
                <p className="text-gray-700 text-sm mb-6">
                    This action cannot be undone. Please confirm if you want to proceed.
                </p>
                <div className="flex justify-end space-x-3">
                    <button onClick={() => {setDeleteId(0)}} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}