import useRegisterStore from "./store";
import { useShallow } from "zustand/react/shallow";
import RegisterStep1 from "./components/RegisterStep1";
import RegisterStep2 from "./components/RegisterStep2";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function RegisterFold() {
  const [
    step,
    goToPrevStep,
    goToNextStep,
    resetValues,

    // step 1
    firstName,
    middleName,
    lastName,
    birthDate,
    seggs,
    homeAddress,
  ] = useRegisterStore(
    useShallow((state) => [
      state.step,
      state.goToPrevStep,
      state.goToNextStep,
      state.resetValues,

      // step 1
      state.firstName,
      state.middleName,
      state.lastName,
      state.birthDate,
      state.seggs,
      state.homeAddress,
    ])
  );

  useEffect(() => {
    resetValues();
  }, [resetValues]);

  const isStep1Valid = () => {
    return (
      firstName &&
      middleName &&
      lastName &&
      birthDate &&
      seggs &&
      homeAddress
    );
  };

  return (
    <section>
      <div className="flex flex-col flex-grow justify-center items-center">
        <form id="homeForm">
          <div className="flex justify-between items-end">
            <h1>
              Register<em>.</em>
            </h1>
            <p>Step {step} of 2</p>
          </div>
          <div className="overflow-y-scroll">
            <div className="flex flex-col gap-[1rem] h-[320px] md:h-[480px]">
              {step === 1 ? (
                <RegisterStep1 />
              ) : step === 2 ? (
                <RegisterStep2 />
              ) : (
                <Navigate to="/register" />
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-[1rem]">
            {step === 2 && (
              <button type="button" onClick={() => goToPrevStep()}>
                Back
              </button>
            )}

            {step === 2 ? (
              <button
                type="button"
                onClick={() => goToNextStep()}
                className="specialButton"
              >
                Finish
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goToNextStep()}
                className="specialButton"
                disabled={!isStep1Valid()}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}