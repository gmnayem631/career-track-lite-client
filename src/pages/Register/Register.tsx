import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Check } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirebaseError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setSubmitting(true);
    try {
      await createUser(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setFirebaseError("An account with this email already exists.");
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFirebaseError("");
    try {
      await googleSignIn();
    } catch (err: any) {
      setFirebaseError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold text-[#1E2A4A] mb-6">
        Create your account
      </h1>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8)
              return "Password must be at least 8 characters";
            if (!/[A-Z]/.test(value))
              return "Password must contain at least one uppercase letter";
            if (!/[0-9]/.test(value))
              return "Password must contain at least one number";
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        {firebaseError && (
          <p className="text-sm text-[#C1554A]">{firebaseError}</p>
        )}

        <Button
          type="submit"
          isDisabled={submitting}
          className="bg-[#3D7A6E] text-white hover:bg-[#336a5f] w-full"
        >
          <Check size={16} />
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </Form>
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-[#D8DCE3]" />
        <span className="text-xs text-[#8B93A1]">OR</span>
        <div className="flex-1 h-px bg-[#D8DCE3]" />
      </div>

      <Button
        type="button"
        variant="secondary"
        onPress={handleGoogleSignIn}
        className="w-full border border-[#D8DCE3]"
      >
        Continue with Google
      </Button>

      <p className="mt-6 text-sm text-center text-[#3A3F4B]">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[#3D7A6E] font-medium">
          Log in
        </Link>
      </p>
    </>
  );
};

export default Register;
