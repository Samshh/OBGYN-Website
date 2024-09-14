import DashCard from "@/UI/DashCard";
import DataTable from "@/UI/DataTable";

export default function Dashboard() {
  const TableData = [
    {
      AppointmentID: 1,
      Patient: {
        PatientID: 1,
        FirstName: "Sam",
        LastName: "Dacara",
      },
      ETA: "17:00",
      Status: {
        StatusID: 1,
        Status: "Pending", // Pending, Done, Cancelled
      },
      Note: "Patient requested reschedule.",
    },
    {
      AppointmentID: 2,
      Patient: {
        PatientID: 2,
        FirstName: "Jane",
        LastName: "Doe",
      },
      ETA: "14:30",
      Status: {
        StatusID: 2,
        Status: "Done",
      },
      Note: "Routine check-up completed.",
    },
    {
      AppointmentID: 3,
      Patient: {
        PatientID: 3,
        FirstName: "John",
        LastName: "Smith",
      },
      ETA: "10:45",
      Status: {
        StatusID: 1,
        Status: "Pending",
      },
      Note: "Patient is running late.",
    },
    {
      AppointmentID: 4,
      Patient: {
        PatientID: 4,
        FirstName: "Emily",
        LastName: "Clark",
      },
      ETA: "09:15",
      Status: {
        StatusID: 3,
        Status: "Cancelled",
      },
      Note: "Patient cancelled due to emergency.",
    },
    {
      AppointmentID: 5,
      Patient: {
        PatientID: 5,
        FirstName: "Michael",
        LastName: "Brown",
      },
      ETA: "16:00",
      Status: {
        StatusID: 1,
        Status: "Pending",
      },
      Note: "Follow-up appointment scheduled.",
    },
    {
      AppointmentID: 6,
      Patient: {
        PatientID: 6,
        FirstName: "Olivia",
        LastName: "Davis",
      },
      ETA: "12:00",
      Status: {
        StatusID: 2,
        Status: "Done",
      },
      Note: "Blood test results delivered.",
    },
  ];
  
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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[1rem]">
          <DashCard className="h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <DashCard.Title>Appointments</DashCard.Title>
            <DashCard.Separator />
            <DashCard.Content className="overflow-y-auto">
              <DataTable className="w-full" data={TableData} />
            </DashCard.Content>
          </DashCard>
          <DashCard>
            <DashCard.Title>Patients</DashCard.Title>
            <DashCard.Separator />
            <DashCard.Content className="overflow-y-auto">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
              perspiciatis obcaecati quibusdam enim recusandae in, adipisci quo
              odit possimus harum omnis magni voluptatem a rem! Delectus minus
              ipsam quos iusto.
            </DashCard.Content>
          </DashCard>
        </div>
      </div>
    </div>
  );
}
