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
          <DashCard className="items-center justify-center select-none">
            <h2>
              Comming Soon<em>.</em>
            </h2>
          </DashCard>
        </div>
      </div>
    </div>
  );
}