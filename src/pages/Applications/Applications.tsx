import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Spinner } from "@heroui/react";
import { apiFetch } from "../../lib/api";
import { statusColors } from "../../constants/statusColors";

interface Application {
  id: number;
  companyName: string;
  jobTitle: string;
  jobUrl: string | null;
  source: string;
  status: string;
  applicationDate: string;
  notes: string | null;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/applications");
      setApplications(data);
    } catch (err: any) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Delete this application? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await apiFetch(`/applications/${id}`, { method: "DELETE" });
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete application");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-[#3A3F4B]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-[#C1554A]">{error}</div>;
  }

  return (
    <div className="max-w-6xl h-screen mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1E2A4A]">Your Applications</h1>
        <Link to="/add-application">
          <Button className="bg-[#3D7A6E] text-white hover:bg-[#336a5f]">
            + Add Application
          </Button>
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-16 text-[#8B93A1]">
          No applications yet. Add your first one to get started.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-[#D8DCE3] rounded-lg p-5 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#1E2A4A]">{app.jobTitle}</p>
                <p className="text-sm text-[#3A3F4B]">
                  {app.companyName} · {app.source}
                </p>
                <span
                  className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: statusColors[app.status] }}
                >
                  {app.status}
                </span>
              </div>

              <div className="flex gap-2">
                <Link to={`/edit-application/${app.id}`}>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="secondary"
                  isDisabled={deletingId === app.id}
                  onPress={() => handleDelete(app.id)}
                  className="text-[#C1554A]"
                >
                  {deletingId === app.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
