import { useEffect, useState, useCallback } from "react";
import DashCard from "@/UI/DashCard";
import DataTable from "@/UI/DataTable";
import Modal from "@/UI/Modal";
import axios from "axios";

interface Appointment {
  AppointmentID: number;
  PatientID: number;
  StartDateTime: string;
  EndDateTime: string;
  StatusID: number;
  Note: string;
}

interface AppointmentWithPatient extends Appointment {
  PatientName: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [appointmentData, setAppointmentData] = useState<
    AppointmentWithPatient[]
  >([]);

  const columns = [
    {
      header: "Patient Name",
      key: "PatientName",
    },
    {
      header: "ETA",
      key: (row: AppointmentWithPatient) => {
        return new Date(row.StartDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      },
    },
    { header: "Status ID", key: "StatusID" },
    { header: "Note", key: "Note" },
  ];

  const handleRowClick = (row: AppointmentWithPatient) => {
    setSelectedAppointment(row);
    setIsModalOpen(true);
  };

  const getPatientByID = async (patientID: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getPatient/${patientID}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching patient data: ", error);
    }
  };

  const getAppointemntData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/getAppointments"
      );
      const appointments: Appointment[] = response.data;

      const appointmentsWithPatient = await Promise.all(
        appointments.map(async (appointment) => {
          const patient = await getPatientByID(appointment.PatientID);
          return {
            ...appointment,
            PatientName: `${patient.FirstName} ${patient.LastName}`,
          };
        })
      );

      setAppointmentData(appointmentsWithPatient);
    } catch (error) {
      console.error("Error fetching appointment data: ", error);
    }
  }, []);

  useEffect(() => {
    getAppointemntData();
  }, [getAppointemntData]);

  return (
    <div className="flex-grow flex flex-col h-auto">
      <div className="flex-col flex gap-[1rem]">
        <div className="flex flex-col justify-center items-start sticky top-0 bg-white py-[1rem]">
          <h3>
            Hello<em>!</em>
          </h3>
          <h1>
            Dr<em>.</em> Juliet
          </h1>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 gap-[1rem] lg:grid-cols-2 lg:grid-rows-1">
          <DashCard className="h-full">
            <DashCard.Title>Appointments</DashCard.Title>
            <DashCard.Separator />
            <DashCard.Content className="overflow-x-auto">
              <DataTable<AppointmentWithPatient>
                className="w-full"
                data={appointmentData}
                columns={columns}
                onRowClick={handleRowClick}
              />
            </DashCard.Content>
          </DashCard>
          <DashCard className="items-center justify-center">
            <h2>
              Coming Soon <em>.</em>
            </h2>
          </DashCard>
        </div>
      </div>
      {isModalOpen && selectedAppointment && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center justify-between gap-[1rem]">
              <h3>Details</h3>
              <Modal.Close
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                &times;
              </Modal.Close>
            </div>
            <Modal.Separator />
            <p>
              <strong>Patient ID:</strong> {selectedAppointment.PatientID}
            </p>
            <p>
              <strong>ETA:</strong>{" "}
              {new Date(selectedAppointment.StartDateTime).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            </p>
            <div className="flex gap-[1rem] items-center justify-start">
              <label htmlFor="status">
                <strong>Status:</strong>
              </label>
              <select
                id="status"
                value={selectedAppointment.StatusID}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    StatusID: parseInt(e.target.value),
                  })
                }
              >
                <option value="1">Pending</option>
                <option value="2">Done</option>
                <option value="3">Cancelled</option>
              </select>
            </div>
            <p>
              <strong>Note:</strong> {selectedAppointment.Note}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
