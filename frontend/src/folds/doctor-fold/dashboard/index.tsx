import DashCard from "@/UI/DashCard";
import DataTable from "@/UI/DataTable";
import { TableData } from "./data";

export default function Dashboard() {

  const currentDate = new Date().toLocaleDateString();

  const filteredTableData = TableData.filter((appointment) => {
    const appointmentDate = new Date(
      appointment.StartDateTime
    ).toLocaleDateString();
    return appointmentDate === currentDate;
  });

  const columns = [
    {
      header: "Patient",
      key: (row: Record<string, unknown>) => {
        const patient = row.Patient as { FirstName: string; LastName: string };
        return `${patient.FirstName} ${patient.LastName}`;
      },
    },
    { header: "ETA", key: "ETA" },
    { header: "Status", key: "Status.Status" },
    { header: "Note", key: "Note" },
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
              <DataTable
                className="w-full"
                data={filteredTableData}
                columns={columns}
              />
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
