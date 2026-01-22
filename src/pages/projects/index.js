import { useEffect, useState } from "react";
import { getProjects } from "@/utils/project";
import { useAuth } from "@/context/AuthContext";

export default function ProjectsPage() {
  const { role } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {projects.length === 0 && <p>No projects found</p>}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded">
            <h2 className="font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>

            <p className="text-sm mt-2">
              Manager: {project.manager?.name || "N/A"}
            </p>

            <p className="text-sm">
              Employees: {project.employees?.length}
            </p>

            {/* ROLE-BASED UI */}
            {role !== "employee" && (
              <button className="mt-2 text-blue-600">
                Edit Project
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
