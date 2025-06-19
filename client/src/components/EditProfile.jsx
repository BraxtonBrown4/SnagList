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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6"
                >
                    {/* Profile Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                        <img
                            src={editProfile.profilePic}
                            alt="Profile Picture"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 w-full space-y-4">
                        {[
                            { label: "Profile Picture URL", name: "profilePic" },
                            { label: "UserName", name: "userName" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Address", name: "address" },
                            { label: "First Name", name: "firstName" },
                            { label: "Last Name", name: "lastName" },
                        ].map(({ label, name, type = "text" }) => (
                            <div key={name}>
                                <label className="block text-sm text-gray-700 font-medium mb-1">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={editProfile[name] || ""}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}

                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
                            >
                                Save
                            </button>
                            <button
                                type="reset"
                                onClick={() => navigate(`/Profile/${loggedInUser.id}`)}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition"
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
