export const ErrorModal = ({ error }) => {
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-80 flex flex-col items-center text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h2 className="text-gray-900 text-lg font-semibold mb-1">Something went wrong</h2>
          <p className="text-sm text-gray-600 mb-4">
            {error?.message || "An unexpected error occurred."}
          </p>
        </div>
      </div>
    
  )
}