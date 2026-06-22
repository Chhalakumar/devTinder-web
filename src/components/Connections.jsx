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

    if(connections.length===0){return <h1>No Connections</h1>}


  return (
    <div className='text-center my-10'>
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {connections.map((connection) => {
            const {_id,firstName,lastName,photoUrl,age,gender,about} = connection;

            return (
                <div 
                key={_id}
                className='flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto'>
                    <div>
                        <img src={photoUrl} alt="photo" className='w-20 h-20  object-cover rounded-full' />
                    </div>
                    <div className='text-left mx-4'>
                        <h2 className='font-bold text-xl'>
                            {firstName + " " +lastName}
                        </h2>
                        {age && gender && <p>{age + " " +gender}</p>}
                        <p>{about}</p>
                    </div>
                    <Link to={"/chat/" + _id} state={{firstName,lastName,photoUrl}}>
                        <button className='btn bg-blue-500 px-3 text-white'>Chat</button>
                    </Link>
                </div>
            );
        })} 
            
    </div>
  );
};

export default Connections;