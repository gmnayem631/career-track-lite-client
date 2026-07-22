import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Spinner } from "@heroui/react";
import { toast } from "sonner";
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

interface StatusStats {
  [key: string]: number;
}

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusStats, setStatusStats] = useState<StatusStats>({});

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/applications");
      setApplications(data);

      // Calculate status statistics
      const stats: StatusStats = {};
      data.forEach((app: Application) => {
        stats[app.status] = (stats[app.status] || 0) + 1;
      });
      setStatusStats(stats);
      toast.success("Applications loaded successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const totalApplications = applications.length;
  const recentApplications = applications.slice(0, 5);

  const statusList = [
    "Saved",
    "Applied",
    "Assessment",
    "Interview",
    "Offer",
    "Rejected",
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-8 text-center text-[#3A3F4B]">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E2A4A] mb-2">Dashboard</h1>
        <p className="text-[#8B93A1]">
          Track your job applications and progress
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-white border border-[#D8DCE3] rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#1E2A4A] mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F5F7FA] rounded-lg p-4">
            <p className="text-sm text-[#8B93A1] mb-2">Total Applications</p>
            <p className="text-4xl font-bold text-[#1E2A4A]">
              {totalApplications}
            </p>
          </div>
          <div className="bg-[#F5F7FA] rounded-lg p-4">
            <p className="text-sm text-[#8B93A1] mb-2">Application Rate</p>
            <p className="text-4xl font-bold text-[#1E2A4A]">
              {totalApplications > 0
                ? ((statusStats["Applied"] || 0) +
                    (statusStats["Assessment"] || 0) +
                    (statusStats["Interview"] || 0) +
                    (statusStats["Offer"] || 0)) /
                  totalApplications
                : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white border border-[#D8DCE3] rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#1E2A4A] mb-4">
          Status Breakdown
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statusList.map((status) => (
            <div
              key={status}
              className="bg-[#F5F7FA] rounded-lg p-4 text-center border border-[#D8DCE3]"
            >
              <div
                className="inline-block w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: statusColors[status] }}
              ></div>
              <p className="text-xs text-[#8B93A1] mb-1">{status}</p>
              <p className="text-2xl font-bold text-[#1E2A4A]">
                {statusStats[status] || 0}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white border border-[#D8DCE3] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1E2A4A]">
            Recent Applications
          </h2>
          <Link to="/applications">
            <Button variant="ghost" className="text-[#3D7A6E]">
              View All →
            </Button>
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="text-center py-12 text-[#8B93A1]">
            <p className="mb-4">
              No applications yet. Get started by adding your first application.
            </p>
            <Link to="/add-application">
              <Button className="bg-[#3D7A6E] text-white hover:bg-[#336a5f]">
                + Add Application
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="bg-[#F5F7FA] border border-[#D8DCE3] rounded-lg p-4 flex items-center justify-between hover:bg-[#EBF0F5] transition"
              >
                <div className="flex-1">
                  <p className="font-semibold text-[#1E2A4A]">{app.jobTitle}</p>
                  <p className="text-sm text-[#8B93A1]">
                    {app.companyName} · {app.source}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="inline-block text-xs font-medium px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: statusColors[app.status] }}
                    >
                      {app.status}
                    </span>
                    <span className="text-xs text-[#8B93A1]">
                      {new Date(app.applicationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Link to={`/edit-application/${app.id}`}>
                  <Button size="sm" variant="secondary">
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
