import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.error("No such document!");
                }
            }
            setLoading(false);
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetchUserData(user);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-200">Loading...</div>;
    }

    if (!userData) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-200">No user data available</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <div className="text-2xl font-bold mb-4">Profile</div>
                <div className="text-sm mb-4">User details:</div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <div className="px-3 py-2 border rounded-md bg-gray-50">{userData.firstName}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <div className="px-3 py-2 border rounded-md bg-gray-50">{userData.lastName}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="px-3 py-2 border rounded-md bg-gray-50">{userData.email}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <div className="px-3 py-2 border rounded-md bg-gray-50">{userData.role}</div>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="w-full py-2 mt-6 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
