"use client";
import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { filterFormikErrors } from "@utils/formikHelpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email!").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignUp() {
  const router = useRouter();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      try {
        const response = await axios.post("/api/users", values);
        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });
  const { name, email, password } = values;
  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        crossOrigin={""}
        onChange={handleChange}
        value={name}
        onBlur={handleBlur}
      />
      <Input
        name="email"
        label="Email"
        crossOrigin={""}
        onChange={handleChange}
        value={email}
        onBlur={handleBlur}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        crossOrigin={""}
        onChange={handleChange}
        value={password}
        onBlur={handleBlur}
      />
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white"
        placeholder={""}
        disabled={isSubmitting}
      >
        Sign up
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/signin">Sign in</Link>
        <Link href="/auth/forget-password">Forget password</Link>
      </div>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
