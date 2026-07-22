import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, Input, Label, TextField, Spinner } from "@heroui/react";
import { toast } from "sonner";
import { apiFetch } from "../../lib/api";

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

const sourceOptions = [
  "LinkedIn",
  "Bdjobs",
  "Indeed",
  "Wellfound",
  "Facebook",
  "Referral",
  "Other",
];
const statusOptions = [
  "Saved",
  "Applied",
  "Assessment",
  "Interview",
  "Rejected",
  "Offer",
];

const EditApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/applications/${id}`);
      setApplication(data);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to load application";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    const body = {
      companyName: formData.get("companyName") as string,
      jobTitle: formData.get("jobTitle") as string,
      jobUrl: (formData.get("jobUrl") as string) || null,
      source: formData.get("source") as string,
      status: formData.get("status") as string,
      applicationDate: formData.get("applicationDate") as string,
      notes: (formData.get("notes") as string) || null,
    };

    setSubmitting(true);
    try {
      await apiFetch(`/applications/${id}`, { method: "PATCH", body });
      toast.success("Application updated successfully");
      navigate("/applications");
    } catch (err: any) {
      const errorMsg = err.message || "Failed to update application";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 text-center text-[#3A3F4B]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="max-w-xl mx-auto p-8 my-8 rounded-md text-center">
        <p className="text-[#C1554A] mb-4">Application not found</p>
        <Button
          className="bg-[#3D7A6E] text-white hover:bg-[#336a5f]"
          onClick={() => navigate("/applications")}
        >
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 my-8 rounded-md bg-[#e0dddd]">
      <h1 className="text-xl font-bold text-[#1E2A4A] mb-6">
        Edit Application
      </h1>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="companyName"
          defaultValue={application.companyName}
        >
          <Label>Company name</Label>
          <Input placeholder="Google" />
        </TextField>

        <TextField
          isRequired
          name="jobTitle"
          defaultValue={application.jobTitle}
        >
          <Label>Job title</Label>
          <Input placeholder="Frontend Engineer" />
        </TextField>

        <TextField
          name="jobUrl"
          type="url"
          defaultValue={application.jobUrl || ""}
        >
          <Label>Job post URL</Label>
          <Input placeholder="https://..." />
        </TextField>

        <div>
          <Label>Application source</Label>
          <select
            name="source"
            required
            defaultValue={application.source}
            className="w-full border border-[#D8DCE3] rounded-md px-3 py-2 mt-1"
          >
            {sourceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Status</Label>
          <select
            name="status"
            defaultValue={application.status}
            className="w-full border border-[#D8DCE3] rounded-md px-3 py-2 mt-1"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <TextField
          isRequired
          name="applicationDate"
          type="date"
          defaultValue={application.applicationDate}
        >
          <Label>Application date</Label>
          <Input />
        </TextField>

        <div>
          <Label>Notes</Label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={application.notes || ""}
            className="w-full border border-[#D8DCE3] rounded-md px-3 py-2 mt-1"
          />
        </div>

        {error && <p className="text-sm text-[#C1554A]">{error}</p>}

        <div className="flex gap-3">
          <Button
            type="submit"
            isDisabled={submitting}
            className="bg-[#3D7A6E] text-white hover:bg-[#336a5f] flex-1"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onPress={() => navigate("/applications")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditApplications;
