import { useState } from "react";
import DatePicker from "react-datepicker";

interface Sex {
  SexID: number;
  SexName: string;
}

interface DoctorProfile {
  AdminID: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  BirthDate: string;
  Age: number;
  Sex: Sex;
  Username: string;
  Password: string;
  ContactNumber: string;
  EmailAddress: string;
}

interface ProfileCardProps {
  profile: DoctorProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | null>(
    new Date(profile.BirthDate)
  );
  const [firstName, setFirstName] = useState(profile.FirstName);
  const [middleName, setMiddleName] = useState(profile.MiddleName);
  const [lastName, setLastName] = useState(profile.LastName);
  const [sex, setSex] = useState(profile.Sex.SexID);
  const [username, setUsername] = useState(profile.Username);
  const [password, setPassword] = useState(profile.Password);
  const [contactNumber, setContactNumber] = useState(profile.ContactNumber);
  const [emailAddress, setEmailAddress] = useState(profile.EmailAddress);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Update the profile here
    const updatedProfile = {
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      BirthDate: birthDate?.toISOString().split("T")[0],
      Sex: sex,
      Username: username,
      Password: password,
      ContactNumber: contactNumber,
      EmailAddress: emailAddress,
    };
    console.log("Updated Profile: ", updatedProfile);
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-[1.25rem] border border-border rounded-md flex flex-col justify-center items-start gap-[1rem] ">
      <div className="flex justify-between w-full items-center">
        <h2>Profile</h2>
        <div className="flex justify-center items-center gap-[0.5rem]">
          {isEditing && (
            <button onClick={() => handleSaveClick()} type="button" className="specialButton">
              Save
            </button>
          )}
          <button
            type="button"
            onClick={handleEditClick}
          >
            {isEditing ? <>&times;</> : "Edit"}
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-[1rem] md:gap-[1.5rem]">
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Middle Name:
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Birth Date:
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="w-full"
            showYearDropdown
            showMonthDropdown
            dropdownMode="scroll"
            maxDate={new Date()}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Sex:
          <select
            value={sex}
            onChange={(e) => setSex(Number(e.target.value))}
            disabled={!isEditing}
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Contact Number:
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
          Email Address:
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            readOnly={!isEditing}
          />
        </label>
      </form>
    </div>
  );
}
