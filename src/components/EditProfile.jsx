import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const[showToast,setShowToast]= useState(false);
  

  const saveProfile = async () => {
    setError(""); //clear previous error
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-10 my-6 sm:my-10 px-4">
        <div className="w-full lg:w-auto flex justify-center">
          <div className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl w-full max-w-md lg:w-96 shadow-2xl border border-purple-500/30">
            <div className="card-body p-4 sm:p-6">
              <h2 className="card-title justify-center text-2xl sm:text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Edit Profile</h2>
              <div className="space-y-3 sm:space-y-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2 text-sm sm:text-base text-gray-300">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm sm:text-base"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2 text-sm sm:text-base text-gray-300">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm sm:text-base"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2 text-sm sm:text-base text-gray-300">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm sm:text-base"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2 text-sm sm:text-base text-gray-300">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm sm:text-base"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2 text-sm sm:text-base text-gray-300">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm sm:text-base"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2 text-sm sm:text-base text-gray-300">Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm sm:text-base"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              <div className="card-actions justify-center mt-6">
                <button
                  className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 w-full sm:w-auto"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview Card - Shows below form on mobile, beside form on desktop */}
        <div className="w-full lg:w-auto flex justify-center">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-[9999]">
          <div className="alert bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
