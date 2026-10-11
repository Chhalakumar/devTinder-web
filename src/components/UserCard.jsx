import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

// ✅ Default image
const DEFAULT_PHOTO =
  "https://i.guim.co.uk/img/media/90f3d9d62e357b22062397771403e115ec6e0f53/804_287_2486_1988/master/2486.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=55620d64ae0f9ae6918a3b7528ebf841";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Unable to send request", err);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
      {/* Main Card */}
      <div className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl shadow-2xl overflow-hidden border border-purple-500/30 rounded-2xl sm:rounded-3xl hover:shadow-purple-500/40 hover:border-purple-500/50 transition-all duration-300">
        {/* IMAGE SECTION with Overlay Gradient */}
        <figure className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
          <img
            src={photoUrl || DEFAULT_PHOTO}
            alt="profile"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_PHOTO;
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          
          {/* Info Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <div className="flex items-end justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg truncate">
                  {firstName} {lastName}
                  {age && <span className="text-xl sm:text-2xl font-normal ml-2 text-purple-300">{age}</span>}
                </h2>
                
                {gender && (
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="badge badge-sm bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm border-0 text-white shadow-lg text-xs">
                      {gender}
                    </div>
                  </div>
                )}
                
                {about && (
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 drop-shadow-md">
                    {about}
                  </p>
                )}
              </div>
              
              {/* Info Button */}
              <button className="btn btn-circle btn-xs sm:btn-sm bg-purple-500/20 backdrop-blur-sm border-purple-400/30 hover:bg-purple-500/40 text-white hover:border-purple-400/50 shadow-lg flex-shrink-0 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </figure>

        {/* ACTION BUTTONS */}
        <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            {/* Not Interested Button */}
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="btn btn-circle btn-md sm:btn-lg bg-gray-800/80 backdrop-blur-sm border-2 border-red-500/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 hover:border-red-500 text-red-400 hover:text-white transition-all duration-300 group shadow-lg hover:shadow-red-500/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Interested Button */}
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="btn btn-circle btn-md sm:btn-lg bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 text-white transition-all duration-300 group shadow-xl hover:shadow-purple-500/60 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Button Labels */}
          <div className="flex justify-center gap-12 sm:gap-20 mt-3 sm:mt-4">
            <span className="text-[10px] sm:text-xs text-red-400 font-semibold">Not Interested</span>
            <span className="text-[10px] sm:text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">Interested</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
