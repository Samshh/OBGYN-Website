import { useState } from "react";
import DashCard from "@/UI/DashCard";
import DataTable from "@/UI/DataTable";
import Modal from "@/UI/Modal";
import { AppointmentData } from "./data";

interface Patient {
  FirstName: string;
  LastName: string;
}

interface Status {
  Status: string;
}

interface Appointment {
  Patient: Patient;
  ETA: string;
  Status: Status;
  Note: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const columns = [
    {
      header: "Patient",
      key: (row: Record<string, unknown>) => {
        const patient = row.Patient as Patient;
        return `${patient.FirstName} ${patient.LastName}`;
      },
    },
    { header: "ETA", key: "ETA" },
    { header: "Status", key: "Status.Status" },
    { header: "Note", key: "Note" },
  ];

  const isAppointment = (
    row: Record<string, unknown>
  ): row is Record<string, unknown> & Appointment => {
    return (
      typeof row.Patient === "object" &&
      row.Patient !== null &&
      "FirstName" in row.Patient &&
      "LastName" in row.Patient &&
      typeof row.ETA === "string" &&
      typeof row.Status === "object" &&
      row.Status !== null &&
      "Status" in row.Status &&
      typeof row.Note === "string"
    );
  };

  const handleRowClick = (row: Record<string, unknown>) => {
    if (isAppointment(row)) {
      setSelectedAppointment(row);
      setIsModalOpen(true);
    } else {
      console.error("Invalid appointment data");
    }
  };

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
              <DataTable
                className="w-full"
                data={AppointmentData}
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
              <strong>Patient:</strong> {selectedAppointment.Patient.FirstName}{" "}
              {selectedAppointment.Patient.LastName}
            </p>
            <p>
              <strong>ETA:</strong> {selectedAppointment.ETA}
            </p>
            <div className="flex gap-[1rem] items-center justify-start">
              <label htmlFor="status">
              <strong>Status:</strong>
              </label>
              <select
              id="status"
              value={selectedAppointment.Status.Status}
              onChange={(e) =>
                setSelectedAppointment({
                ...selectedAppointment,
                Status: { Status: e.target.value },
                })
              }
              >
              <option value="1">Done</option>
              <option value="2">Pending</option>
              <option value="3">Cancelled</option>
              </select>
            </div>
            <p>
              <strong>Note:</strong> {selectedAppointment.Note}
            </p>
          </div>
          <Modal.Separator />
          <Modal.Close
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            Rebook
          </Modal.Close>
        </Modal>
      )}
    </div>
  );
}
