import Card from "./Card";
import { Data } from "../../Data/Data";

export default function Skills({ darkMode }) {
  return (
    <section id="skills">
      <div
        className={`p-5 h-150 transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-blue-200"
        }`}
      >
        <h1
          className={`text-2xl font-bold mb-6 text-center ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Skills
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
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
