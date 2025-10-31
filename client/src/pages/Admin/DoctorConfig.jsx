import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const DoctorConfig = () => {

  const { id,name } = useParams(); 
  const [hours, setHours] = useState([]);
  const [form, setForm] = useState({ weekday: 1, start_time: "09:00", end_time: "17:00" });

  const fetchHours = async () => {
    const { data } = await axios.get(`/doctors/officehours/${id}`);
    setHours(data);
  };

  useEffect(() => {
    fetchHours();
  },[id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/doctors/officehours", { ...form, id: id });
    fetchHours();
  };

  return (
    <div className="container p-6 mx-auto ">
      <h1 className="text-2xl font-bold my-5 uppercase text-center ">Weekly Hours for Doctor(#{id}) - {name}</h1>

      <form onSubmit={handleSubmit} className="flex gap-5 items-center my-6">
        <select
          name="weekday"
          value={form.weekday}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          {weekdays.map((day, i) => (
            <option key={i} value={i}>{day}</option>
          ))}
        </select>

        <input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2 uppercase">Current Weekly Hours</h2>
      <table className="w-full border border-gray-400 ">
        <thead className="bg-teal-50 border border-gray-400 uppercase">
          <tr>
            <th className="p-2 ">Weekday</th>
            <th className="p-2 ">Start</th>
            <th className="p-2 ">End</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((h, i) => (
            <tr key={i} className="text-center border border-gray-300 uppercase">
              <td className="p-2">{weekdays[h.weekday]}</td>
              <td className="p-2 ">{h.start_time}</td>
              <td className="p-2 ">{h.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorConfig;
