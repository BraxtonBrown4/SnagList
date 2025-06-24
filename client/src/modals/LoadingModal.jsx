import { useEffect, useState } from "react";

export const LoadingModal = ({ isLoading }) => {
    const [loadingModal, setLoadingModal] = useState(false)

    useEffect(() => {
        let timeout;

        if (isLoading) {
            timeout = setTimeout(() => setLoadingModal(true), 300)
        } else {
            clearTimeout(timeout)
            setLoadingModal(false)
        }

        return () => clearTimeout(timeout)
    }, [isLoading])

    return (loadingModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className=" p-6 rounded-2xl flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-gray-800 text-lg font-medium">Loading...</h2>
            </div>
        </div>
    );
};
