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
    <div className="navbar bg-base-300 shadow-sm"> 
      <div className="flex-1">
        <Link  to="/" className="btn btn-ghost text-xl">👨‍💻devTinder</Link>
      </div>

      {user && (
        <div className="flex gap-2">
          <div className="form-control">Welcome,{user.firstName}</div>

          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {/* ❗ Corrected photourl and removed extra quotes */}
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/Requests">Requests</Link>
              </li>
              <li>
                <Link to="/Premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div> 
      )}
    </div>
  );
};

export default NavBar;
