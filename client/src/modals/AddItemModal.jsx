import { useState } from "react"

export const AddItemModal = ({ isModalOpen, setIsModalOpen, newItemArr, setNewItemArr }) => {
    const [item, setItem] = useState({})

    const handleChange = (e) => {
        const { value, name, type, checked } = e.target
        const newValue = type === "checkbox" ? checked : value
        setItem({ ...item, [name]: newValue })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newArr = newItemArr ? [...newItemArr, item] : [item]
        setNewItemArr(newArr)
        setIsModalOpen(false)
        setItem({})
    }

    return (
        isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[75vh] overflow-y-auto p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Create An Item</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name:</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Price:</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={0}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Target Price:</label>
                            <input
                                name="targetPrice"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={0}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Image URL:</label>
                            <input
                                name="image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handleChange}
                            />
                        </div>

                        {item.image && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Image Preview:</label>
                                <div className="max-w-xs max-h-48 mx-auto overflow-hidden rounded shadow">
                                    <img
                                        src={item.image}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <input
                                name="notify"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                onChange={handleChange}
                            />
                            <label className="text-gray-700 font-medium">Notify me if price is below target price</label>
                        </div>

                        <div className="flex justify-end space-x-3 pt-3">
                            <button
                                onClick={() => {setIsModalOpen(false), setItem({})}}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}
