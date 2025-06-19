import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserProfileById } from "../managers/userProfileManager"

export const Profile = ({ loggedInUser }) => {
    const { profileId } = useParams()
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getUserProfileById(profileId).then(setProfile)
    }, [profileId, loggedInUser])

    return (profile.id &&
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                    <img
                        src={profile.profilePic}
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 w-full">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 break-words">
                        {profile.userName}
                    </h1>
                    <h2 className="text-sm text-gray-600 mb-4 break-words">
                        {profile.userName} has {profile.lists.length} list{profile.lists.length !== 1 && "s"}
                    </h2>

                    {loggedInUser.id === profile.id && (
                        <div className="space-y-1 mb-6">
                            <p className="text-sm text-gray-700 break-words">
                                📧 <span className="font-medium">Email:</span> {profile.email}
                            </p>
                            <p className="text-sm text-gray-700 break-words">
                                🏠 <span className="font-medium">Address:</span> {profile.address}
                            </p>
                            <p className="text-sm text-gray-700 break-words">
                                👤 <span className="font-medium">First Name:</span> {profile.firstName}
                            </p>
                            <p className="text-sm text-gray-700 break-words">
                                👤 <span className="font-medium">Last Name:</span> {profile.lastName}
                            </p>

                            <div className="pt-3">
                                <button
                                    onClick={() => navigate(`Edit`)}
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}

                    {profile.lists.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-1">Lists</h3>
                            <div className="space-y-1">
                                {profile.lists.map((l) => (
                                    <p
                                        key={l.id}
                                        onClick={() => navigate(`/Lists/${l.id}/${l.isPublic}`)}
                                        className="text-sm text-blue-600 cursor-pointer hover:underline break-words"
                                    >
                                        {l.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
