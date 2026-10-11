// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addRequests } from '../utils/requestSlice'



// const Requests = () => {
//     const dispatch = useDispatch();
//     const requests = useSelector((state) => state.requests);

//     const fetchRequests = async () => {
//         try{
//             const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
//             dispatch(addRequests(res.data.data));
//         }catch(err){
//             throw new Error("Unable to fetch requests");
//         }   
//     }

//     useEffect(() => {   
//         fetchRequests();
//     }, []);

//  if(!requests)return;

// if(requests.length===0){return <h1>No Requests</h1>}


//   return (
//     <div className='text-center my-10'>
//         <h1 className="text-bold text-white text-3xl">Requests</h1>
//         {requests.map((Request) => {
//             const {_id, firstName,lastName,photoUrl,age,gender,about} = Request.fromUserId;
//             return (
//                 <div key={_id} className='flex justify-between  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
//                     <div>
//                         <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
//                     </div>
//                     <div className='text-left mx-0'>
//                         <h2 className='font-bold text-xl'>
//                             {firstName + " " +lastName}
//                         </h2>
//                         {age && gender && <p>{age + " " +gender}</p>}
//                         <p>{about}</p>
//                     </div>
//                     <div>
//                         <button className='btn px-4 bg-primary btn-primary mx-2'>Accept</button>
//                         <button className='btn px-3 bg-secondary btn-secondary mx-2'>Reject</button>
//                     </div>
//                 </div>
//             );
//         })}
            
//     </div>
//   );
// };

// export default Requests


import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

const reviewRequest = async (status, requestId) => {
  try {
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + requestId,
      {},
      { withCredentials: true }
    );
    console.log("Request reviewed successfully:", res.data);
    
    // Refresh the requests list after successful review
    fetchRequests();
  } catch (err) {
    console.error("Unable to review request", err);
  }
};

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Unable to fetch requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center max-w-md px-6">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center backdrop-blur-xl border border-purple-500/30 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">No Requests Yet</h1>
          <p className="text-gray-400 text-lg">You'll see connection requests here when someone shows interest!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Requests
        </h1>

        <div className="space-y-3 sm:space-y-4">
          {requests.map((request) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = request.fromUserId;
   
            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-purple-500/30 hover:border-purple-500/50 shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                {/* LEFT: Image + Text */}
                <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 min-w-0 w-full sm:w-auto">
                  <div className="flex-shrink-0">
                    <img
                      src={photoUrl}
                      alt="profile"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-500/30 shadow-lg"
                    />
                  </div>

                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <h2 className="font-bold text-xl sm:text-2xl text-white mb-2 truncate">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium">
                          {age} • {gender}
                        </span>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{about}</p>
                  </div>
                </div>

                {/* RIGHT: Buttons */}
                <div className="flex flex-row sm:flex-col lg:flex-row gap-2 w-full sm:w-auto">
                  <button 
                    className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border-0 text-white font-semibold px-6 sm:px-8 flex-1 sm:flex-none shadow-lg hover:shadow-green-500/50 transition-all duration-300" 
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="btn bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border-0 text-white font-semibold px-6 sm:px-8 flex-1 sm:flex-none shadow-lg hover:shadow-red-500/50 transition-all duration-300" 
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
