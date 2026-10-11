// import React, { use } from "react";
// import { useSelector } from "react-redux";

// const NavBar = () => {
//   const user = useSelector((state) => state.user);
//   console.log(user);

//   return (
//     <div className="navbar bg-base-300 shadow-sm">
//       <div className="flex-1">
//         <a className="btn btn-ghost text-xl"> 👨‍💻devTinder</a>
//       </div>
//       {/* <div className="flex gap-2"> */}
//         {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
//         {user && (
//         <div className="flex gap-2">
//           <div className="form-control">welcome, {user.name}</div>
//           <div className="dropdown dropdown-end mx-5">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img alt="user photo" src="{user.photUrl}" />
//               </div>
//             </div>
//             <ul
//               tabIndex="-1"
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </a>
//               </li>
//               <li>
//                 <a>Settings</a>
//               </li>
//               <li>
//                 <a>Logout</a>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;
 

// import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    }catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="navbar bg-base-300 shadow-sm px-2 md:px-4"> 
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-lg md:text-xl px-2">👨‍💻 <span className="hidden sm:inline">devTinder</span></Link>
      </div>

      {user && (
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden md:block text-sm lg:text-base">Welcome, {user.firstName}</div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 md:w-10 rounded-full ring-2 ring-purple-500/30 hover:ring-purple-500/50 transition-all">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow-xl border border-purple-500/30"
            >
              <li className="md:hidden border-b border-gray-700 pb-2 mb-2">
                <span className="text-purple-400 font-semibold pointer-events-none">
                  {user.firstName}
                </span>
              </li>
              <li>
                <Link to="/profile" className="justify-between hover:bg-purple-500/10">
                  Profile
                  <span className="badge badge-sm bg-purple-500/20 border-purple-500/30">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-purple-500/10">Connections</Link>
              </li>
              <li>
                <Link to="/Requests" className="hover:bg-purple-500/10">Requests</Link>
              </li>
              <li>
                <Link to="/Premium" className="hover:bg-purple-500/10">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-400 hover:bg-red-500/10">Logout</a>
              </li>
            </ul>
          </div>
        </div> 
      )}
    </div>
  );
};

export default NavBar;
