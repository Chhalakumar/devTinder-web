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
    <div className="card bg-base-300 w-96 shadow-xl overflow-hidden">
      {/* IMAGE */}
      <figure className="w-full h-80">
        <img
          src={photoUrl || DEFAULT_PHOTO}
          alt="photo"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_PHOTO;
          }}
        />
      </figure>

      {/* CONTENT */}
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm opacity-80">
            {age}, {gender}
            <br />
            {about}
          </p>
        )}

        {/* <p className="opacity-80 my-0">{about}</p> */}

        <div className="card-actions justify-center my-2">
          <button
            className="btn px-4 mx-2 bg-primary btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn px-4 bg-secondary btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
