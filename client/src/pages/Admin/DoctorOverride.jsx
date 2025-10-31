import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const DoctorOverrides = () => {
  const { id } = useParams();

  const [overrides, setOverrides] = useState([]);

  const [form, setForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
    is_closed: false,
  });

  const fetchOverrides = async () => {
    const { data } = await axios.get(`/doctors/overrides/${id}`);
    setOverrides(data);
  };

  useEffect(() => {
    fetchOverrides();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("date",form.date,"-------");
    
    await axios.post("/doctors/overrides", { ...form,doctor_id:id });
    setForm({ date: "", start_time: "", end_time: "", is_closed: false });
    fetchOverrides();
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold my-5 text-center uppercase">Overrides for Doctor #{id}</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-5 items-center my-6"
      >
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          disabled={form.is_closed}
          className="border p-2 rounded"
        />

        <input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          disabled={form.is_closed}
          className="border p-2 rounded"
        />

        <label className="flex items-center gap-3 uppercase">
          <input
            type="checkbox"
            name="is_closed"
            checked={form.is_closed}
            onChange={handleChange}
          />
          Closed
        </label>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save Override
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2 uppercase">Existing Overrides</h2>
      <table className="w-full border uppercase">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 ">Date</th>
            <th className="p-2 ">Start</th>
            <th className="p-2 ">End</th>
            <th className="p-2 ">Closed?</th>
          </tr>
        </thead>
        <tbody>
          {overrides.map((o, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2 ">{o.date.toString().split("T")[0]}</td>
              <td className="p-2 ">{o.start_time || "-"}</td>
              <td className="p-2 ">{o.end_time || "-"}</td>
              <td className="p-2 ">{o.is_closed ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorOverrides;
