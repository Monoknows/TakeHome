import Card from "./Card";
import { Data } from "../../Data/Data";

export default function Skills({ darkMode }) {
  return (
    <section id="skills">
      <div
        className={`p-10 grid grid-cols-1  gap-6 transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-blue-200"
        }`}
      >
        <h1
          className={`text-lg font-bold px-4 text-center ${
            darkMode ? "text-blue-300" : "text-blue-500"
          }`}
        >
          Skills
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Data.map((skill) => (
            <Card
              key={skill.id}
              image={skill.image}
              title={skill.title}
              description={skill.description}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
