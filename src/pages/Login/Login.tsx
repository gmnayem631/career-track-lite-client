// src/pages/Login/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signInUser, googleSignIn } = useAuth();
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
      await signInUser(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") {
        setFirebaseError("Incorrect email or password.");
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("google sign in");
    setFirebaseError("");
    try {
      await googleSignIn();
    } catch (err: any) {
      setFirebaseError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold text-[#1E2A4A] mb-6">Log in</h1>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
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
          {submitting ? "Logging in..." : "Log in"}
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
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-[#3D7A6E] font-medium">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
