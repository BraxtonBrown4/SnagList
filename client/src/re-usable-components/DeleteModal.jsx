
export const DeleteModal = ({ deleteFunc, deleteId, setDeleteId }) => {

    const handleDelete = () => {
        deleteFunc(deleteId).then(() => {setDeleteId(0)})
    }
    return (deleteId > 0 &&
        <div>
            <div>
                <h2>Are you sure?</h2>
                <p>
                    This action cannot be undone. Please confirm if you want to proceed.
                </p>
                <div>
                    <button onClick={() => {setDeleteId(0)}}>
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