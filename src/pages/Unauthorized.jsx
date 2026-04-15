import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-600">Access denied</p>
        <h1 className="text-4xl font-bold text-slate-900 mt-4">You do not have permission for this page.</h1>
        <p className="text-slate-500 mt-4">
          Your account is signed in, but the current role does not include the permission required for this route.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex mt-8 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-700 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
