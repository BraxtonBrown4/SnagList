import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserProfile, getUserProfileById } from "../managers/userProfileManager"

export const EditProfile = ({ loggedInUser }) => {
    const { profileId } = useParams()
    const [editProfile, setEditProfile] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        getUserProfileById(profileId).then(setEditProfile)
    }, [profileId, loggedInUser])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editUserProfile(editProfile).then(() => {
            navigate(`/Profile/${loggedInUser.id}`)
        })
    };

    return (
        editProfile.id == loggedInUser.id ? (
            <div className="max-w-3xl mx-auto px-6 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="h-[80vh] bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6"
                >

                    <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                        <img
                            src={editProfile.profilePic}
                            alt="Profile Picture"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">
                                Profile Picture URL
                            </label>
                            <input
                                type="text"
                                name="profilePic"
                                value={editProfile.profilePic ? editProfile.profilePic : ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">
                                UserName
                            </label>
                            <input
                                type="userName"
                                name="userName"
                                value={editProfile.userName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={editProfile.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={editProfile.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={editProfile.firstName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={editProfile.lastName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="pt-4 space-x-3">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
                            >
                                Save
                            </button>
                            <button
                                type="reset"
                                onClick={() => { navigate(`/Profile/${loggedInUser.id}`) }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        ) : navigate(`/Profile/${loggedInUser.id}`)
    );
};
