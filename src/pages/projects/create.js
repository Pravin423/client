import { useState } from "react";
import { createProject } from "@/utils/project";
import { useRouter } from "next/router";

export default function CreateProject() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    managerId: "",
    employees: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(form);
      router.push("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Create Project</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Project Name"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Manager ID"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, managerId: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
