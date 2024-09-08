import { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useRegisterStore from "../store";
import { useShallow } from "zustand/react/shallow";

export default function RegisterStep1() {
  const [
    firstName,
    middleName,
    lastName,
    birthDate,
    seggs,
    homeAddress,
    setFirstName,
    setMiddleName,
    setLastName,
    setBirthDate,
    setSeggs,
    setHomeAddress,
  ] = useRegisterStore(
    useShallow((state) => [
      state.firstName,
      state.middleName,
      state.lastName,
      state.birthDate,
      state.seggs,
      state.homeAddress,
      state.setFirstName,
      state.setMiddleName,
      state.setLastName,
      state.setBirthDate,
      state.setSeggs,
      state.setHomeAddress,
    ])
  );

  const handleChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="firstName">
          First Name{!firstName && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          value={firstName || ""}
          onChange={handleChange(setFirstName)}
          placeholder="Sam"
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="middleName">
          Middle Name{!middleName && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          value={middleName || ""}
          onChange={handleChange(setMiddleName)}
          placeholder="Balmori"
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="lastName">
          Last Name{!lastName && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          value={lastName || ""}
          onChange={handleChange(setLastName)}
          placeholder="Dacara"
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="birthDate">
          Birth Date{!birthDate && <span className="text-red-500"> *</span>}
        </label>
        <DatePicker
          selected={birthDate ? new Date(birthDate) : null}
          onChange={(date) =>
            setBirthDate(date ? date.toISOString().split("T")[0] : "")
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="font-normal text-[0.85rem] md:text-[1.25rem] py-2 px-4 rounded-md border-2 border-border bg-white focus:outline-none focus:border-accent w-full"
          showYearDropdown
          showMonthDropdown
          dropdownMode="scroll"
          maxDate={new Date()}
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="seggs">
          Sex{!seggs && <span className="text-red-500"> *</span>}
        </label>
        <select
          id="seggs"
          value={seggs || ""}
          onChange={(e) =>
            handleChange(setSeggs)(
              e as unknown as ChangeEvent<HTMLInputElement>
            )
          }
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="homeAddress">
          Home Address{!homeAddress && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          value={homeAddress || ""}
          onChange={handleChange(setHomeAddress)}
          placeholder="House #, Street, City, Province"
        />
      </div>
    </>
  );
}
