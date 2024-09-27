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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setIsEditing(false);
  };

  return (
    <div className="p-[1.25rem] border border-border rounded-md w-fit flex flex-col justify-center items-start gap-[1rem] ">
      <div className="flex justify-between w-full items-center">
        <h2>Profile</h2>
        <button
          className="specialButton"
          type="button"
          onClick={handleEditClick}
        >
          {isEditing ? <>&times;</> : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form className="flex flex-col gap-[1.5rem]" onSubmit={handleSubmit}>
          <label className="flex items-center gap-2">
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            Middle Name:
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
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
            />
          </label>

          <label className="flex items-center gap-2">
            Sex:
            <select
              value={sex}
              onChange={(e) => setSex(Number(e.target.value))}
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            Contact Number:
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            Email Address:
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </label>

          <button type="submit" className="specialButton">
            Save
          </button>
        </form>
      ) : (
        <>
          <p>{`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`}</p>
          <p>
            <strong>Birth Date:</strong> {profile.BirthDate}
          </p>
          <p>
            <strong>Age:</strong> {profile.Age} {/* Backend-calculated */}
          </p>
          <p>
            <strong>Sex:</strong> {profile.Sex.SexName}
          </p>
          <p>
            <strong>Username:</strong> {profile.Username}
          </p>
          <p>
            <strong>Password:</strong> ********
          </p>
          <p>
            <strong>Contact Number:</strong> {profile.ContactNumber}
          </p>
          <p>
            <strong>Email Address:</strong> {profile.EmailAddress}
          </p>
        </>
      )}
    </div>
  );
}
