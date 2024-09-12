import useDoctorStore from "./store";
import Dashboard from "./dashboard";
import Patients from "./patients";
import Schedule from "./schedule";

export default function DoctorFold() {
  const currentTab = useDoctorStore((state) => state.currentTab);
  return (
    <section>
      {currentTab === 1 ? (
        <Dashboard />
      ) : currentTab === 2 ? (
        <Patients />
      ) : currentTab === 3 ? (
        <Schedule />
      ) : null}
    </section>
  );
}
