import ProfileCard from "@/UI/ProfileCard";
import { DoctorProfileData } from "./data";
import DashCard from "@/UI/DashCard";

export default function Profile() {
  const profile = DoctorProfileData[0];
  return (
    <div className="flex-grow flex flex-col h-auto">
      <div className="flex-col flex gap-[1rem]">
        <div className="flex flex-col justify-center items-start sticky top-0 bg-white py-[1rem]">
          <h1>
            Doctor Profile<em>.</em>
          </h1>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 gap-[1rem] lg:grid-cols-2 lg:grid-rows-1">
          <ProfileCard profile={profile} />
          <DashCard>
            <DashCard.Title className="flex items-center gap-[1rem] justify-between">Sched. <button type="button">Add leave +</button></DashCard.Title>
            <DashCard.Content>
              Add a data table here for the 
            </DashCard.Content>
          </DashCard>
        </div>
      </div>
    </div>
  );
}
