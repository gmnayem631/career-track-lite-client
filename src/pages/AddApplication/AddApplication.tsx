// src/pages/AddApplication/AddApplication.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { apiFetch } from "../../lib/api";

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

const AddApplication = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    const body = {
      companyName: formData.get("companyName") as string,
      jobTitle: formData.get("jobTitle") as string,
      jobUrl: (formData.get("jobUrl") as string) || undefined,
      source: formData.get("source") as string,
      status: formData.get("status") as string,
      applicationDate: formData.get("applicationDate") as string,
      notes: (formData.get("notes") as string) || undefined,
    };

    setSubmitting(true);
    try {
      await apiFetch("/applications", { method: "POST", body });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 my-8 rounded-md bg-[#e0dddd] ">
      <h1 className="text-xl font-bold text-[#1E2A4A] mb-6">Add Application</h1>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="companyName">
          <Label>Company name</Label>
          <Input placeholder="Google" />
        </TextField>

        <TextField isRequired name="jobTitle">
          <Label>Job title</Label>
          <Input placeholder="Frontend Engineer" />
        </TextField>

        <TextField name="jobUrl" type="url">
          <Label>Job post URL</Label>
          <Input placeholder="https://..." />
        </TextField>

        <div>
          <Label>Application source</Label>
          <select
            name="source"
            required
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
            defaultValue="Saved"
            className="w-full border border-[#D8DCE3] rounded-md px-3 py-2 mt-1"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <TextField isRequired name="applicationDate" type="date">
          <Label>Application date</Label>
          <Input />
        </TextField>

        <div>
          <Label>Notes</Label>
          <textarea
            name="notes"
            rows={3}
            className="w-full border border-[#D8DCE3] rounded-md px-3 py-2 mt-1"
          />
        </div>

        {error && <p className="text-sm text-[#C1554A]">{error}</p>}

        <Button
          type="submit"
          isDisabled={submitting}
          className="bg-[#3D7A6E] text-white hover:bg-[#336a5f] w-full"
        >
          {submitting ? "Saving..." : "Save Application"}
        </Button>
      </Form>
    </div>
  );
};

export default AddApplication;
