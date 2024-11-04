import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DashCard from "../../../UI/DashCard";
import Modal from "../../../UI/Modal";

interface Appointment {
  StartDateTime: string;
}

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
  const [isDoctorIn, setIsDoctorIn] = useState(true);

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

  const checkDoctorAvailability = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (day >= 1 && day <= 5) {
      // Monday to Friday: 9:00 - 16:00
      if (
        (hours > 9 || (hours === 9 && minutes >= 0)) &&
        (hours < 16 || (hours === 16 && minutes === 0))
      ) {
        setIsDoctorIn(true);
      } else {
        setIsDoctorIn(false);
      }
    } else if (day === 6) {
      // Saturday: 9:00 - 13:00
      if (
        (hours > 9 || (hours === 9 && minutes >= 0)) &&
        (hours < 13 || (hours === 13 && minutes === 0))
      ) {
        setIsDoctorIn(true);
      } else {
        setIsDoctorIn(false);
      }
    } else {
      setIsDoctorIn(false);
    }
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

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const patientIdCookie = Cookies.get("PatientID");
    console.log("PatientID cookie value: ", patientIdCookie);
    const id = parseInt(patientIdCookie || "0", 10);
    setPatientId(id);
    console.log("Parsed PatientID: ", id);
  }, []);

  useEffect(() => {
    const getPatientAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/getPatientAppointments/${PatientID}`
        );
        if (response.data && response.data.length > 0) {
          const appointments = response.data.sort(
            (a: Appointment, b: Appointment) =>
              new Date(b.StartDateTime).getTime() -
              new Date(a.StartDateTime).getTime()
          );
          setCurrentAppointment(appointments[0]);
        }
      } catch (error) {
        console.error("Failed to fetch appointments: ", error);
      }
    };
    if (PatientID) {
      getPatientAppointments();
    }
  }, [PatientID]);

  useEffect(() => {
    checkDoctorAvailability();
    const interval = setInterval(checkDoctorAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-[1rem]">
      <h1>
        Dashboard<em>.</em>
      </h1>
      <div className="grid grid-rows-2 gap-[1rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 gap-[1rem]">
          <DashCard>
            <h2>Prescription</h2>
            <h2 className="text-border">
              Comming Soon<em>.</em>
            </h2>
          </DashCard>
          <DashCard>
            <h2>Diagnosis</h2>
            <h2 className="text-border">
              Comming Soon<em>.</em>
            </h2>
          </DashCard>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 gap-[1rem]">
          <DashCard id="current-appointment">
            <DashCard.Title>Upcoming Appointment</DashCard.Title>
            <DashCard.Separator />
            <DashCard.Content className="gap-[0.5rem] flex flex-col overflow-auto">
              <p>
                <strong>Start:</strong>{" "}
                {formatDateTime(currentAppointment.StartDateTime)}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {formatDateTime(currentAppointment.EndDateTime)}
              </p>
              <p>
                <strong>Status: </strong>
                {currentAppointment.StatusID === 1
                  ? "Pending"
                  : currentAppointment.StatusID}
              </p>
              <p>
                <strong>Note: </strong>
                {currentAppointment.Note}
              </p>
            </DashCard.Content>
          </DashCard>
          <div className="grid grid-rows-2 gap-[1rem] w-full">
            <DashCard>
              <DashCard.Title>
                The Doctor is{" "}
                <span className="text-accent">{isDoctorIn ? "IN" : "OUT"}</span>
              </DashCard.Title>
              <DashCard.Separator />
              <DashCard.Content>
                <p>
                  <strong>Clinic Hours</strong>
                </p>
                <p>
                  Mon. - Fri. 9:00 - 16:00{" "}
                  <span className="text-border">|</span> Sat. 9:00 - 13:00
                </p>
              </DashCard.Content>
            </DashCard>
            <button
              className="h-full uppercase specialButton"
              onClick={() => setIsModalOpen(true)}
            >
              Add Booking
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <label>Select date & time:</label>
            <input
              title="StartDateTime"
              type="datetime-local"
              name="StartDateTime"
              value={formData.StartDateTime}
              onChange={handleChange}
              required
              min={getMinDateTime()}
              max={getMaxDateTime()}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label>Note:</label>
            <textarea
              title="Note"
              name="Note"
              value={formData.Note}
              onChange={handleChange}
              className="border border-border rounded-lg p-[0.5rem]"
            />
          </div>
          <div className="grid grid-cols-2 gap-[1rem]">
            <button className="specialButton" type="submit">
              Book Appointment
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}