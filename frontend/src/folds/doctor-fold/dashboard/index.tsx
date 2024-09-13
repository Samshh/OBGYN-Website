import DashCard from "@/UI/DashCard";

export default function Dashboard() {
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
              sunt, corrupti, culpa voluptatem tempore aut ducimus aspernatur
              perferendis, harum aperiam minus excepturi alias impedit
              laudantium. Fugiat repudiandae voluptates quidem sapiente!
            </DashCard.Content>
          </DashCard>
          <DashCard>
            <DashCard.Title>Patients</DashCard.Title>
            <DashCard.Separator />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            perspiciatis obcaecati quibusdam enim recusandae in, adipisci quo
            odit possimus harum omnis magni voluptatem a rem! Delectus minus
            ipsam quos iusto.
          </DashCard>
        </div>
      </div>
    </div>
  );
}
