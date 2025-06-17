import { useState } from "react"
import { createItem } from "../managers/itemManager"

export const AddItemModal = ({ isModalOpen, setIsModalOpen, newItemArr, setNewItemArr }) => {
    const [item, setItem] = useState({})

    const handleChange = (e) => {
        const { value, name } = e.target
        setItem({ ...item, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newArr = newItemArr ? [...newItemArr, item] : [item]
        setNewItemArr(newArr)
        setIsModalOpen(false)
    }

    return (isModalOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create An Item</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Item Name:</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Price:</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex justify-end space-x-3 pt-3">
                        <button
                            type="reset"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}