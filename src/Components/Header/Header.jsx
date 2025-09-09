export function Header() {
  return (
    <header
      id="header"
      className="max-w-3xl mx-auto my-6 px-4 py-6 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-lg shadow-lg border-l-4 border-green-400 flex items-center justify-between"
    >
      <div className="flex-1 pr-4 text-left">
        <h1 className="text-2xl md:text-3xl font-mono text-green-300 leading-tight">
          Hi I'm Jon Alfred!
        </h1>
        <p className="mt-1 text-sm md:text-base text-green-100 font-sans">
          A BSIT student passionate about software development, databases, and
          mobile app design.
          <br />I enjoy building projects that solve real-world problems.
        </p>
      </div>

      <img
        src="/pfp.png"
        alt="Jon Alfred profile"
        className="w-20 h-20 md:w-40 md:h-40 rounded-md border-2 border-green-400 shadow-md object-cover flex-shrink-0"
      />
    </header>
  );
}
