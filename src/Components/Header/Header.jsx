export default function Header() {
  return (
    <section id="header" className="w-full h-screen ">
      <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/it.jpg')]">
        <div className="flex items-center justify-center w-full h-full bg-black/60 text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Jon Alfred V. Bernabe</h1>
            <p className="mb-5">
              An aspiring software developer with a passion for creating
              impactful solutions to the modern world's challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
