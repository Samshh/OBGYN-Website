export default function HomeNav() {
  return (
    <nav id="navHome">
      <div id="nav">
        <img className="h-[44px] md:h-[55px]" src="logo.svg" alt="" />
        <div className="flex gap-[1rem]">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </nav>
  );
}
