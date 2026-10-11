import React, {useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async()=>{
    if(feed)return ;
    try{
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
      console.log(res);
      dispatch(addFeed(res.data));
    }catch(err){
      console.error(err)
    }
  };
  useEffect(()=>{
    getFeed();
  },[]);  

  if(!feed)return null;
  
  if(feed.length===0){
    return (
      <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://aimbeat.com/wp-content/uploads/2025/08/hire-python-developer.png)',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 backdrop-blur-sm"></div>
        </div>

        <div className="text-center max-w-md px-6 relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center backdrop-blur-xl border border-purple-500/30 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4'>No More Profiles</h1>
          <p className='text-gray-400 mb-8 text-lg'>You've explored all available developers! Check back later for new matches.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white shadow-lg hover:shadow-purple-500/50 px-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Feed
          </button>
          <div className="mt-8 flex justify-center gap-3">
            <div className="px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400 text-xs font-medium">
              💻 Keep Coding
            </div>
            <div className="px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/30 text-pink-400 text-xs font-medium">
              🚀 Stay Connected
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    feed &&(
    <div className='min-h-[85vh] flex items-center justify-center py-8 px-4 relative overflow-hidden'>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://aimbeat.com/wp-content/uploads/2025/08/hire-python-developer.png)',
        }}
      >
        {/* Overlay for better content visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/80 to-gray-900/85 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-20">
        {/* Stack effect - shows next cards behind */}
        {feed.length > 1 && (
          <>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl -z-10 blur-sm border border-purple-500/10"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[97%] h-full bg-gradient-to-br from-purple-800/30 to-pink-800/30 rounded-3xl -z-5 border border-purple-500/20"></div>
          </>
        )}
        <UserCard user = {feed[0]}/>
        
        {/* Card counter with enhanced styling */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-full border border-purple-500/30 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-300 text-sm font-medium">
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold text-lg">{feed.length}</span> {feed.length === 1 ? 'developer' : 'developers'} remaining
            </p>
          </div>
        </div>
      </div>
    </div>
    )
  )
}

export default Feed