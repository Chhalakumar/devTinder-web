import React, { use } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionSlice' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        }catch(err){
            throw new Error("Unable to fetch connections");
        }
    };

    useEffect(() => {   
        fetchConnections();
    }, []);

    if(!connections)return;

    if(connections.length===0){return (
        <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center max-w-md px-6">
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center backdrop-blur-xl border border-purple-500/30 shadow-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">No Connections Yet</h1>
                <p className="text-gray-400 text-lg mb-8">Start swiping to connect with amazing developers!</p>
            </div>
        </div>
    )}


  return (
    <div className='min-h-[85vh] py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Connections
            </h1>
            <div className="space-y-3 sm:space-y-4">
                {connections.map((connection) => {
                    const {_id,firstName,lastName,photoUrl,age,gender,about} = connection;

                    return (
                        <div 
                        key={_id}
                        className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-purple-500/30 hover:border-purple-500/50 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group'>
                            <div className="flex-shrink-0">
                                <img 
                                    src={photoUrl} 
                                    alt="photo" 
                                    className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-4 border-purple-500/30 group-hover:border-purple-500/50 shadow-lg transition-all duration-300 group-hover:scale-105' 
                                />
                            </div>
                            <div className='flex-1 min-w-0 text-center sm:text-left'>
                                <h2 className='font-bold text-xl sm:text-2xl text-white mb-2 truncate'>
                                    {firstName + " " + lastName}
                                </h2>
                                {age && gender && (
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium">
                                            {age} • {gender}
                                        </span>
                                    </div>
                                )}
                                <p className='text-gray-400 text-xs sm:text-sm line-clamp-2'>{about}</p>
                            </div>
                            <Link to={"/chat/" + _id} state={{firstName,lastName,photoUrl}} className="w-full sm:w-auto">
                                <button className='btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 text-white font-semibold px-6 sm:px-8 w-full sm:w-auto shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105'>
                                    Chat
                                </button>
                            </Link>
                        </div>
                    );
                })} 
            </div>
        </div>
    </div>
  );
};

export default Connections;