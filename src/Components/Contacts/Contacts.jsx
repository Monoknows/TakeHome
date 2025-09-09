export function Contacts() {
  const contactInfo = [
    { label: "Email", value: "Jonbernabe8@gmail.com" },
    { label: "Phone Number", value: "09683194750" },
    { label: "Address", value: "Purok 3 Lagundi Plaridel Bulacan" },
  ];

  return (
    <section
      id="contacts"
      className="max-w-4xl mx-auto my-12 px-6 py-8 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-lg shadow-lg border-l-4 border-green-400"
    >
      <h2 className="text-2xl md:text-3xl font-mono text-green-300 mb-4">
        Contacts
      </h2>
      <div className="space-y-3 text-green-100">
        {contactInfo.map((info, idx) => (
          <p key={idx}>
            <strong className="text-green-200">{info.label}:</strong>{" "}
            {info.value}
          </p>
        ))}
      </div>
    </section>
  );
}
