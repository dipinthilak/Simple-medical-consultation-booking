import { db } from "../config/db.js";




export const getAvailability = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  try {
    const weekday = new Date(date).getDay();

    const [override] = await db.query(
      "SELECT * FROM overrides WHERE doctor_id=? AND date=?",
      [id, date]
    );

    if (override.length && override[0].is_closed) return res.json([]);

    const schedule = override.length
      ? override[0]
      : (
          await db.query(
            "SELECT * FROM office_hours WHERE doctor_id=? AND weekday=?",
            [id, weekday]
          )
        )[0][0];

    if (!schedule) return res.json([]);

    const slots = [];
    let start = new Date(`${date}T${schedule.start_time}`);
    let end = new Date(`${date}T${schedule.end_time}`);
    while (start < end) {
      const next = new Date(start.getTime() + 30 * 60000);
      
      slots.push({
        start_time: start.toTimeString().slice(0, 8),
        end_time: next.toTimeString().slice(0, 8),
      });
      start = next;
    }

    const [booked] = await db.query(
      "SELECT start_time, end_time FROM appointments WHERE doctor_id=? AND date=?",
      [id, date]
    );

    console.log("booked-----",...booked);


    

    const available = slots.filter(
      (s) => !booked.some((b) => b.start_time === s.start_time)
    );

    console.log(available);
    

    res.json(available);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const bookAppointment = async (req, res) => {
  let { doctor_id, date, start_time, end_time } = req.body;
  start_time=start_time.slice(0,5)
  end_time=end_time.slice(0,5)

  console.log("doctor_id, date, start_time, end_time ",doctor_id, date,... start_time.slice(0,3),... end_time.slice(0,3) );
  

  const patient_id = req.user.id;

  try {
    const [existing] = await db.query(
      "SELECT * FROM appointments WHERE doctor_id=? AND date=? AND start_time=?",
      [doctor_id, date, start_time]
    );

    if (existing.length)
      return res.json({ message: "Slot already booked" });

    await db.query(
      "INSERT INTO appointments (doctor_id, patient_id, date, start_time, end_time) VALUES (?,?,?,?,?)",
      [doctor_id, patient_id, date, start_time, end_time]
    );

    res.json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
