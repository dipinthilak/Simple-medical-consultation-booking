import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    status: "active",
  });

  const fetchDoctors = async () => {
    const { data } = await axios.get("/doctors/doctorlist");
    setDoctors(data);
  };

  const navigate=useNavigate()

  const addDoctor = async (e) => {
    e.preventDefault();
    await axios.post("/doctors", form);
    setForm({ name: "", specialization: "", status: "active" });
    fetchDoctors();
  };

  const changeStatus = async (id, status) => {
    await axios.post(`/doctors/changestatus/${id}/${status}`);
    fetchDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold my-5 uppercase text-center ">
        Manage Doctors
      </h1>

      <form onSubmit={addDoctor} className="flex gap-5 mb-5">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-2/12 rounded-md"
        />
        <input
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          className="border p-2 w-1/12 rounded-md"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 w-1/12 rounded-md"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="bg-green-700 text-white px-4 rounded">
          ADD NEW DOCTOR
        </button>
      </form>

      <table className="w-full border border-gray-400 ">
        <thead>
          <tr className="bg-teal-50 border border-gray-400">
            <th className="w-3/12 py-3">NAME</th>
            <th className="w-4/12">SPECIALIZATION</th>
            <th className="w-2/12">STATUS</th>
            <th className="w-1/12">DAY-HOUR </th>
            <th className="w-1/12">DAY-HOUR </th>
            <th className="w-1/12">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id} className="text-center border border-gray-300 uppercase">
              <td >{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.status}</td>
              <td>
                <button
                  onClick={() => (navigate(`/admin/settings/${doc.id}/${doc.name}`))}
                  className="px-3 py-1 my-1 rounded bg-blue-700 text-white font-semibold "
                >
                  SETTINGS
                </button>
              </td>
                            <td>
                <button
                  onClick={() => (navigate(`/admin/override/${doc.id}/${doc.name}`))}
                  className="px-3 py-1 my-1 rounded bg-amber-400 font-semibold "
                >
                  OVERRIDES
                </button>
              </td>

              <td>
                <button
                  onClick={() => changeStatus(doc.id, doc.status)}
                  className={`px-3 py-1 my-1 rounded ${
                    doc.status === "active"
                      ? "bg-red-800 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {doc.status === "active" ? "BLOCK" : "UNBLOCK"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
