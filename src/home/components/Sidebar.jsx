import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5';
import { BiLogOut } from "react-icons/bi";
import userConversation from '../../Zustans/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Sidebar = ({ onSelectUser }) => {

    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchuser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const [newMessageUsers, setNewMessageUsers] = useState('');
    const { messages, setMessage, selectedConversation, setSelectedConversation } = userConversation();
    const { onlineUser, socket } = useSocketContext();

    const nowOnline = chatUser.map((user) => (user._id));
    //chats function
    const isOnline = nowOnline.map(userId => onlineUser.includes(userId));

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setNewMessageUsers(newMessage);
        })
        return () => socket?.off("newMessage");
    }, [socket, messages])

    //show user with u chatted
    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true)
            try {
                const chatters = await axios.get(`/api/user/currentchatters`)
                const data = chatters.data;
                if (data.success === false) {
                    setLoading(false)
                    console.log(data.message);
                }
                setLoading(false)
                setChatUser(data)

            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        chatUserHandler()
    }, [])

    //show user from the search result
    const handelSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const search = await axios.get(`/api/user/search?search=${searchInput}`);
            const data = search.data;
            if (data.success === false) {
                setLoading(false)
                console.log(data.message);
            }
            setLoading(false)
            if (data.length === 0) {
                toast.info("User Not Found")
            } else {
                setSearchuser(data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    //show which user is selected
    const handelUserClick = (user) => {
        onSelectUser(user);
        setSelectedConversation(user);
        setSetSelectedUserId(user._id);
        setNewMessageUsers('');
    }

    //back from search result
    const handSearchback = () => {
        setSearchuser([]);
        setSearchInput('');
    }

    //logout
    const handelLogOut = async () => {

        const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
        if (confirmlogout === authUser.username) {
            setLoading(true)
            try {
                const logout = await axios.post('/api/auth/logout')
                const data = logout.data;
                if (data?.success === false) {
                    setLoading(false)
                    console.log(data?.message);
                }
                toast.info(data?.message)
                localStorage.removeItem('chatapp')
                setAuthUser(null)
                setLoading(false)
                navigate('/login')
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        } else {
            toast.info("LogOut Cancelled")
        }

    }

    return (
        <div className='h-full w-full px-3 py-4 bg-gray-800'>
            <div className='flex justify-between items-center gap-3'>
                <form onSubmit={handelSearchSubmit} className='w-full flex items-center justify-between bg-white rounded-full shadow-md'>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        className='px-4 py-2 w-full bg-transparent outline-none rounded-full focus:ring-2 focus:ring-sky-500'
                        placeholder='Search user...'
                    />
                    <button className='btn btn-circle bg-sky-700 hover:bg-sky-800 p-2'>
                        <FaSearch className='text-white' />
                    </button>
                </form>
                <img
                    onClick={() => navigate(`/profile/${authUser?._id}`)}
                    src={authUser?.profilepic}
                    className='self-center h-12 w-12 rounded-full hover:scale-110 cursor-pointer shadow-md transition-all' />
            </div>
            <div className='divider my-3 px-2'></div>
            {searchUser?.length > 0 ? (
                <>
                    <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar">
                        {searchUser.map((user, index) => (
                            <div key={user._id}>
                                <div
                                    onClick={() => handelUserClick(user)}
                                    className={`flex gap-3 items-center rounded-lg p-3 cursor-pointer hover:bg-sky-600 transition duration-300 
                                        ${selectedUserId === user?._id ? 'bg-sky-500' : ''}`}
                                >
                                    {/* Socket Online Status */}
                                    <div className={`avatar ${isOnline[index] ? 'online' : ''}`}>
                                        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                                            <img src={user.profilepic} alt="user.img" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <p className='font-semibold text-gray-100'>{user.username}</p>
                                    </div>
                                </div>
                                <div className='divider divide-solid px-2 h-[1px]'></div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-auto px-3 py-2 flex justify-center'>
                        <button onClick={handSearchback} className='bg-white rounded-full p-2 shadow-md hover:bg-sky-200'>
                            <IoArrowBackSharp size={25} className='text-sky-700' />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar">
                        {chatUser.length === 0 ? (
                            <div className='font-bold items-center flex flex-col text-xl text-yellow-500'>
                                <h1>Why are you Alone!!🤔</h1>
                                <h1>Search username to chat</h1>
                            </div>
                        ) : (
                            chatUser.map((user, index) => (
                                <div key={user._id}>
                                    <div
                                        onClick={() => handelUserClick(user)}
                                        className={`flex gap-3 items-center rounded-lg p-3 cursor-pointer hover:bg-sky-600 transition duration-300 
                                            ${selectedUserId === user?._id ? 'bg-sky-500' : ''}`}
                                    >
                                        {/* Socket Online Status */}
                                        <div className={`avatar ${isOnline[index] ? 'online' : ''}`}>
                                            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                                                <img src={user.profilepic} alt="user.img" />
                                            </div>
                                        </div>
                                        <div className='flex flex-col flex-1'>
                                            <p className='font-semibold text-gray-100'>{user.username}</p>
                                        </div>
                                        <div>
                                            {newMessageUsers.reciverId === authUser._id && newMessageUsers.senderId === user._id &&
                                                <div className="rounded-full bg-green-700 text-sm text-white px-[6px] py-[2px]">+1</div>
                                            }
                                        </div>
                                    </div>
                                    <div className='divider divide-solid px-2 h-[1px]'></div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='mt-auto px-3 py-2 flex justify-between'>
                        <button onClick={handelLogOut} className='hover:bg-red-600 p-2 rounded-lg text-white hover:text-white'>
                            <BiLogOut size={25} />
                        </button>
                        {/* <p className='text-sm py-2 text-white'></p> */}
                    </div>
                </>
            )}
        </div>
    )
}

export default Sidebar;
