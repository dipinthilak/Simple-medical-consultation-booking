import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const DoctorDetail = () => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [doctor,setDoctor]=useState('');
  useEffect(()=>{
    axios.get(`/doctors/doctor${id? `?id=${id}`:""}`).then((res)=>{
      setDoctor(res.data[0])})
  },[id])
  
  const fetchSlots = async () => {
    if (!date) return;
    const { data } = await axios.get(`/appointments/${id}/availability?date=${date}`);
    setSlots(data);
  };
  
  const bookSlot = async (slot) => {
    await axios.post("/appointments/book", {
      doctor_id: id,
      date,
      start_time: slot.start_time,
      end_time: slot.end_time,
    }).then((response)=>{
      if(response.message){
        alert(response.message)
      }
    })
    fetchSlots();
  };


  return (
    <div className="container p-6 mx-auto">
      <div className="flex flex-row gap-5 text-2xl  border-b-2 rounded-md p-5 border-b-blue-500 max-w-max mb-5 ">
      <h1 className="font-semibold text-amber-950">Dr. <span className="uppercase">{doctor.name}</span></h1>
      <h1 className="text-gray-700 uppercase">| {doctor.specialization}</h1>
      </div>

      <div className="flex flex-row gap-5 items-baseline border w-max p-1 rounded-md">

      <h1 className="text-xl  uppercase">Select Date</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className=" p-2border border-gray-500 rounded-md text-gray-700 text-xl border"
        />
      <button onClick={fetchSlots} className="bg-blue-600 text-white p-2 rounded ml-2 uppercase ">
        Check Slots
      </button>
        </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {slots.length ? (
          slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => bookSlot(slot)}
              className="border p-3 rounded hover:bg-green-500 hover:text-white transition"
            >
              {slot.start_time} - {slot.end_time}
            </button>
          ))
        ) : (
          <p className="col-start-2 text-center text-xl text-red-600 font-semibold">NO SLOTS AVAILABLE !</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;
