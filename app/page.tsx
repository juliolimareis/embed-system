'use client'

import {  useEffect, useState, } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useFirebase } from "@/hooks/firebase";
import Logo from "@/components/Logo";
import { browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "@/components/Loader";

export default function Login() {
  const { auth } = useFirebase();
  const { loading, user, setUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);

  async function onLogin (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await auth.setPersistence(browserLocalPersistence);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoginError(null);
        setUser(userCredential.user);
        router.replace("/module")
      })
      .catch((error) => {
        setLoginError(error.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!loading && user) {
      console.log("Login Page: User found in context. Redirecting to /module");
      router.replace("/module");
    }
  }, [user, loading, router]);

  return (
      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-20 w-auto" />

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  disabled={isLoading}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={e => setEmail(e.target.value)}
                />

              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>

                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}

              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={e => setPassword(e.target.value)}
                />

              </div>
            </div>

            <div>
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "Loading..." : "Sign in"}
                </button>
              )}
            </div>

            {loginError !== null && (
              <p className="mt-10 text-center text-sm/6 text-orange-600">
                {loginError}
              </p>
            )}
          </form>

          {/* <LoginButton /> */}

          {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
  )
}

export const LoginButton = () => {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  if (loading) {
    return <button disabled>Loading...</button>;
  }

  if (user) {
    return (
      <div>
        <span>Welcome, {user.displayName || user.email}!</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={loginWithGoogle}>Login with Google</button>;
};


