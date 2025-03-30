"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [returnUrl, setReturnUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get values from search params on client side
    const errorParam = searchParams.get("error");
    const returnUrlParam = searchParams.get("returnUrl");

    if (errorParam) {
      setError(errorParam === "CredentialsSignin" 
        ? "Invalid email or password" 
        : "An error occurred. Please try again.");
    }

    if (returnUrlParam) {
      setReturnUrl(returnUrlParam);
    }
  }, [searchParams]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <LoginForm returnUrl={returnUrl || undefined} />
        </div>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
