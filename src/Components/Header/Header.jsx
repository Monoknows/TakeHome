export default function Header({ darkMode }) {
  return (
    <section id="home">
      <header
        className={`p-15 h-150 flex items-center justify-between text-xl transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-blue-200"
        }`}
      >
        <div className="text-left">
          <h1
            className={`font-inter font-bold text-3xl transition-colors duration-300 ${
              darkMode ? "text-blue-300" : "text-blue-400"
            }`}
          >
            Jon Alfred V. Bernabe
          </h1>
          <p
            className={`text-xl transition-colors duration-300 ${
              darkMode ? "text-slate-300" : "text-blue-400"
            }`}
          >
            A passionate BSIT student with a love for coding and a constant{" "}
            <br />
            drive to learn, grow, and take on new challenges in the tech world.
          </p>
        </div>

        <div className="relative w-[350px] h-[350px]">
          <img
            className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-300 opacity-100 hover:opacity-0"
            src="./pfp.png"
            alt="profile"
          />
          <img
            className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
            src="./finn.png"
            alt="profile alt"
          />
        </div>
      </header>
    </section>
  );
}
