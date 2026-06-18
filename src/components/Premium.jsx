import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Premium = () => {

  const [isUserPremium,setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  
  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/payment/verify", {
      withCredentials: true,
    });

    if(res.data.isPremium){
    setIsUserPremium(res.data.isPremium);
    }
  };


  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true },
    );
    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Devgrams",
      description: "connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: notes.contact,
      },
      theme: {
        color: "#F37254",
      },
      handler:verifyPremiumUser,
    };

    //it shohuld open the razor pay dialog box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    "you are already a premium user") : (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-10">
      {/* Card 1 */}
      {/* <div className="card w-96 bg-base-100 shadow-sm mx-10"> */}
      <div className="card w-96 bg-gray-50 shadow-sm mx-10">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Most Popular</span>
          <div className="flex justify-between  text-gray-950">
            <h2 className="text-3xl font-bold ">Silver</h2>
            <span className="text-xl">$29/mo</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs text-gray-950 ">
            <li>Chat wit other peoples</li>
            <li>100 connection Requests per day </li>
            <li>Blue tick </li>
            <li>3 months</li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-primary btn-block bg-black text-zinc-50"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card w-96 bg-yellow-200 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Pro</span>
          <div className="flex justify-between  text-gray-950">
            <h2 className="text-3xl font-bold ">Gold</h2>
            <span className="text-xl">$49/mo</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs text-gray-950">
            <li>Chat wit other peoples</li>
            <li>Infinite connection Requests per day </li>
            <li>Blue tick </li>
            <li>6 months</li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-secondary btn-block  bg-black text-zinc-50"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
