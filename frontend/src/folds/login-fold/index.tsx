export default function LoginFold() {
  return (
    <section>
      <div className="flex flex-grow flex-col justify-center gap-[2rem] items-center">
        <form action="" className="flex flex-col gap-[2rem] w-full max-w-[640px]">
          <div className="flex w-full justify-start items-center">
            <h1 className="text-black">
              Login<em>.</em>
            </h1>
          </div>
          <div className="flex flex-col gap-[1rem]">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" placeholder="samshh"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="8 Chars, Ab, 123, !#*" />
            </div>
          </div>
          <button id="specialButton" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
