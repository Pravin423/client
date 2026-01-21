import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 border-b bg-white">
        <h1 className="text-xl font-bold text-blue-600">
          ScrumFlow
        </h1>

        <Link
          href="/login"
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </nav>

      {/* HERO SECTION */}
      <main className="px-10 py-20 bg-gray-50 min-h-screen">
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Scrum-Style SaaS Project Management Tool
          </h2>

          <p className="text-lg text-gray-600 mb-10">
            A scalable, role-based project management platform designed for
            Scrum teams to plan sprints, track tasks, collaborate in real time,
            and deliver efficiently.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <Feature
              title="Sprint & Task Management"
              desc="Organize work using Scrum and Kanban boards with sprint-based execution."
            />
            <Feature
              title="Team Collaboration"
              desc="Real-time 1-1 and group chat, notifications, and audit logs."
            />
            <Feature
              title="SaaS-Ready Architecture"
              desc="Role-based dashboards, analytics, and a backend built for scalability and future AI integration."
            />
          </div>

          <div className="text-sm text-gray-500">
            Backend Status:
            <span className="ml-2 font-medium text-green-600">
              {message || "Connecting..."}
            </span>
          </div>
        </section>
      </main>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {desc}
      </p>
    </div>
  );
}
