import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/doctors${filter ? `?specialization=${filter}` : ""}`).then((res) => setDoctors(res.data));
  }, [filter]);

  return (
    <div className=" container mx-auto p-6 min-h-dvh">
      <h1 className="text-2xl font-bold mb-4 text-center my-5 text-blue-600">DOCTORS</h1>
      <input
        placeholder="Filter by specialization"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-5 w-64 rounded-md"
      />
      <div className=" grid grid-cols-3 gap-5">
        {doctors.map((doc) => (
          <div key={doc.id} className="p-4 border-2 shadow-blue-800 shadow-xs border-blue-900 rounded  hover:shadow-lg transition">
            <h3 className="font-bold text-xl">Dr. <span className="uppercase">{doc.name}</span></h3>
            <p className="uppercase">{doc.specialization}</p>
            <button
              onClick={() => navigate(`/patient/doctor/${doc.id}`)}
              className="mt-2 bg-blue-800 text-white px-4 py-1 rounded"
            >
              VIEW
            </button>
          </div>
        ))}
        {!doctors.length && <h1 className="text-center col-start-2 mt-10 text-xl">No Doctors</h1>}
      </div>
    </div>
  );
};

export default DoctorList;
