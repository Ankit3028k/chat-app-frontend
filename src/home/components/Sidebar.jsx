import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import userConversation from '../../Zustans/useConversation';


const Sidebar = ({ onSelectUser, isSidebarVisible, toggleSidebar }) => {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchuser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { setSelectedConversation } = userConversation();

    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true);
            try {
                const chatters = await axios.get(`/api/user/currentchatters`);
                setLoading(false);
                setChatUser(chatters.data || []);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        chatUserHandler();
    }, []);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const search = await axios.get(`/api/user/search?search=${searchInput}`);
            setLoading(false);
            setSearchuser(search.data.length ? search.data : []);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleUserClick = (user) => {
      onSelectUser(user);
        setSelectedConversation(user);
        setSelectedUserId(user._id);
       
    };

    const handleSearchBack = () => {
        setSearchuser([]);
        setSearchInput('');
    };

    const handleLogOut = async () => {
        const confirmLogout = window.prompt("Type 'UserName' to LOGOUT");
        if (confirmLogout === authUser.username) {
            setLoading(true);
            try {
                await axios.post('/api/auth/logout');
                toast.info('Logged out successfully');
                localStorage.removeItem('chatapp');
                setAuthUser(null);
                setLoading(false);
                navigate('/login');
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        } else {
            toast.info('Logout Cancelled');
        }
    };

    return (
        <div className={`fixed md:relative h-screen w-72 bg-gray-800 text-white px-2 py-4 flex flex-col transition-transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>  
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-700 rounded-full shadow-sm px-3">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    className="flex-1 py-2 px-3 text-sm bg-transparent outline-none w-full text-white"
                    placeholder="Search user"
                />
                <button className="p-2 rounded-full bg-sky-700 hover:bg-gray-600 transition">
                    <FaSearch className="text-white" />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto mt-4">
                {searchUser.length > 0 ? (
                    searchUser.map((user) => (
                        <div key={user._id} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition" onClick={() => handleUserClick(user)}>
                            <p className="text-white font-semibold text-sm">{user.username}</p>
                        </div>
                    ))
                ) : (
                    chatUser.length === 0 ? (
                        <p className="text-center text-yellow-400 text-lg font-semibold">Search username to chat</p>
                    ) : (
                        chatUser.map((user) => (
                            <div key={user._id} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition" onClick={() => handleUserClick(user)}>
                                <p className="text-white font-semibold text-sm">{user.username}</p>
                            </div>
                        ))
                    )
                )}
            </div>

            {searchUser.length > 0 && (
                <div className="flex justify-center p-2">
                    <button onClick={handleSearchBack} className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition">
                        <IoArrowBackSharp size={25} className="text-white" />
                    </button>
                </div>
            )}

            <div className="flex justify-center items-center gap-2 p-3">
                <button onClick={handleLogOut} className="flex items-center gap-2 text-red-400 hover:bg-red-600 hover:text-white p-2 rounded-lg transition">
                    <BiLogOut size={25} />
                    <span className="text-sm sm:text-base">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
