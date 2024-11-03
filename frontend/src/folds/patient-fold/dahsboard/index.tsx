import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DashCard from "../../../UI/DashCard";
import Modal from "../../../UI/Modal";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    StartDateTime: "",
    Note: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({
    StartDateTime: "2023-10-01T10:00",
    EndDateTime: "2023-10-01T11:00",
    StatusID: 1,
    Note: "Initial consultation",
  });
  const [PatientID, setPatientId] = useState<number>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidAppointmentTime = (startDateTime: Date) => {
    const now = new Date();
    if (startDateTime < now) {
      return false;
    }

    const day = startDateTime.getDay();
    const hours = startDateTime.getHours();
    const minutes = startDateTime.getMinutes();

    if (day >= 1 && day <= 5) {
      // Monday to Friday: 9:00 - 16:00
      return (
        (hours > 9 || (hours === 9 && minutes >= 0)) &&
        (hours < 16 || (hours === 16 && minutes === 0))
      );
    } else if (day === 6) {
      // Saturday: 9:00 - 13:00
      return (
        (hours > 9 || (hours === 9 && minutes >= 0)) &&
        (hours < 13 || (hours === 13 && minutes === 0))
      );
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = new Date(formData.StartDateTime);
    if (!isValidAppointmentTime(startDateTime)) {
      alert(
        "Appointment time must be within allowed hours: Mon-Fri 9:00-16:00, Sat 9:00-13:00 and cannot be in the past."
      );
      return;
    }

    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    const appointmentData = {
      PatientID: PatientID,
      ...formData,
      EndDateTime: endDateTime.toISOString(),
      StatusID: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/createAppointment",
        appointmentData
      );
      if (response.status === 201) {
        alert("Appointment booked successfully!");
        setCurrentAppointment(appointmentData);
        setIsModalOpen(false);
      } else {
        alert("Failed to book appointment.");
      }
    } catch {
      alert("Failed to book appointment.");
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const getMaxDateTime = () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const patientIdCookie = Cookies.get("PatientID");
    console.log("PatientID cookie value: ", patientIdCookie);
    const id = parseInt(patientIdCookie || "0", 10);
    setPatientId(id);
    console.log("Parsed PatientID: ", id);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <DashCard id="current-appointment">
        <h2>Current Appointment</h2>
        <p>Start: {currentAppointment.StartDateTime}</p>
        <p>End: {currentAppointment.EndDateTime}</p>
        <p>
          Status:{" "}
          {currentAppointment.StatusID === 1
            ? "Pending"
            : currentAppointment.StatusID}
        </p>
        <p>Note: {currentAppointment.Note}</p>
        <button onClick={() => setIsModalOpen(true)}>Add Booking</button>
      </DashCard>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Start DateTime:</label>
            <input
              title="StartDateTime"
              type="datetime-local"
              name="StartDateTime"
              value={formData.StartDateTime}
              onChange={handleChange}
              required
              min={getMinDateTime()}
              max={getMaxDateTime()}
            />
          </div>
          <div>
            <label>Note:</label>
            <textarea
              title="Note"
              name="Note"
              value={formData.Note}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Book Appointment</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}
