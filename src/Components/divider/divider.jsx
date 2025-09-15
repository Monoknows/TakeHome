export default function Divider({ darkMode }) {
  return (
    <div
      className={
        "overflow-hidden whitespace-nowrap border-y " +
        (darkMode
          ? " border-slate-900 bg-slate-900"
          : " border-blue-200 bg-blue-200")
      }
    >
      <div className="flex animate-marquee">
        <p
          className={`text-lg font-bold px-4 ${
            darkMode ? "text-blue-300" : "text-blue-500"
          }`}
        >
          React | JavaScript | HTML | CSS | TailwindCSS | Node.js | Python | Git
          | GitHub | VS Code | Figma | Canva | Adobe Photoshop |
        </p>
        <p
          className={`text-lg font-bold px-4 ${
            darkMode ? "text-blue-300" : "text-blue-500"
          }`}
        >
          React | JavaScript | HTML | CSS | TailwindCSS | Node.js | Python | Git
          | GitHub | VS Code | Figma | Canva | Adobe Photoshop |
        </p>
      </div>
    </div>
  );
}
