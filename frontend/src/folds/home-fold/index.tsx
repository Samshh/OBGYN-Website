export default function HomeFold() {
  return (
    <section>
      <div className="flex flex-col flex-grow justify-center gap-[1rem]">
        <div className="flex flex-col justify-center items-start gap-[0.5rem]">
          <p>Tel. No. 222-1965</p>
          <h1>
            Dr. Juliet Coching <span>OB/GYN</span> Clinic<span>.</span>
          </h1>
          <div className="flex gap-[0.5rem]">
            <div className="flex justify-center items-center py-[0.5rem] px-[1.5rem] rounded-full bg-accent text-white">
              <p>Sonologist</p>
            </div>
            <div className="flex justify-center items-center py-[0.5rem] px-[1.5rem] rounded-full bg-accent text-white">
              <p>HRP Specialist</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start border-border border-2 rounded-md p-[1rem] w-fit">
          <h2>
            Clinic Hours<span>.</span>
          </h2>
          <p>
            Mon. - Fri. 9:00 - 16:00 <span className="text-border">|</span> Sat.
            9:00 - 13:00
          </p>
        </div>
      </div>
    </section>
  );
}
