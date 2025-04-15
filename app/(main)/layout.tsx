"use client"

import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import Menu from "@/components/Menu";
import Loader from "@/components/Loader";

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      console.log("Main Layout: Auth loading finished, user not found. Redirecting to /");
      router.replace("/");
    }
  }, [router, user, loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl text-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Menu>
      {children}
    </Menu>
  );
}
