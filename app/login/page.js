"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      const email = session.user.email;
      const image = session.user.image;
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_image", image);
      router.push("/");
    }
  }, [status, session]);

  if (status === "loading") return <p className="text-white">Loading...</p>;

  return (
    <div className="py-14 px-4">
      {/* Top Heading */}
      <h1 className="text-center font-bold text-3xl text-white">
        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-10 py-4">
          Givora
        </button>
      </h1>

      {/* Main Content */}
      <div className="text-white py-14 container mx-auto flex flex-col md:flex-row items-center justify-around gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center">
          <h1 className="font-bold text-2xl md:text-3xl my-6 md:my-14">Give Hope, Build Futures</h1>
          <img
            src="https://ouch-prod-var-cdn.icons8.com/ii/illustrations/previews/392nKPp9TyZkoIQ3.webp"
            alt="illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Login Box */}
        <div className="bg-slate-900 rounded-3xl px-6 md:px-14 py-10 w-full md:w-1/2">
          <h1 className="text-center font-bold text-2xl md:text-3xl mb-8">Login to Get Started</h1>

          <div className="flex flex-col gap-4 items-center">
            {/* Google Login */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center w-full md:w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-6 w-6 mr-2" />
              <span>Continue with Google</span>
            </button>

            {/* LinkedIn */}
            <button className="flex items-center w-full md:w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bGEl9v47XieEtHyj0TqTr1tOXJmib-KHtw&s" alt="LinkedIn" className="h-6 w-6 mr-2" />
              <span>Continue with LinkedIn</span>
            </button>

            {/* Twitter */}
            <button className="flex items-center w-full md:w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img src="https://www.svgrepo.com/show/475689/twitter-color.svg" alt="Twitter" className="h-6 w-6 mr-2" />
              <span>Continue with Twitter</span>
            </button>

            {/* Facebook */}
            <button className="flex items-center w-full md:w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-6 w-6 mr-2" />
              <span>Continue with Facebook</span>
            </button>

            {/* GitHub */}
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="flex items-center w-full md:w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <img src="https://www.svgrepo.com/show/475654/github-color.svg" alt="GitHub" className="h-6 w-6 mr-2" />
              <span>Continue with GitHub</span>
            </button>

            {/* Apple */}
            <button className="flex items-center w-full md:w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img src="https://thumbs.dreamstime.com/b/apple-logo-19106337.jpg" alt="Apple" className="h-6 w-6 mr-2" />
              <span>Continue with Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

 
