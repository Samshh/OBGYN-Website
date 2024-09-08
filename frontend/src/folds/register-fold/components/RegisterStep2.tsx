import { ChangeEvent } from "react";
import useRegisterStore from "../store";
import { useShallow } from "zustand/react/shallow";

export default function RegisterStep2() {
  const [
    username,
    password,
    contactNumber,
    emailAddress,
    setUsername,
    setPassword,
    setContactNumber,
    setEmailAddress,
  ] = useRegisterStore(
    useShallow((state) => [
      state.username,
      state.password,
      state.contactNumber,
      state.emailAddress,
      state.setUsername,
      state.setPassword,
      state.setContactNumber,
      state.setEmailAddress,
    ])
  );

  const handleChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="username">
          Username{!username && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          value={username || ""}
          onChange={handleChange(setUsername)}
          placeholder="samshh"
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="password">
          Password{!password && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="password"
          value={password || ""}
          onChange={handleChange(setPassword)}
          placeholder="8 Chars, Ab, 123, !#*"
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="contactNumber">
          Contact Number{!contactNumber && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          value={contactNumber || ""}
          onChange={handleChange(setContactNumber)}
          placeholder="Sam"
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="emailAddress">
          Email{!emailAddress && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="email"
          value={emailAddress || ""}
          onChange={handleChange(setEmailAddress)}
          placeholder="Sam"
        />
      </div>
    </>
  );
}
