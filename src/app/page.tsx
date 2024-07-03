import React from "react";
import EmailVerifier from "../lib/email-verifier";
import { allowedEmailProviders } from "@/lib/utils";
import VerifyEmail from "@/components/VerififyEmail";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  let data = null;
  if (query) {
    const validator = new EmailVerifier(allowedEmailProviders);
    data = await validator.validateEmail(query);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-4xl w-full px-8 py-8">
        <h1 className="mb-4 text-4xl font-bold text-center">VeriMail</h1>
        <VerifyEmail />
        {data && (
          <div className="mt-8 p-6 bg-white shadow-xl border border-gray-200 rounded-md">
            <div className="flex items-center mb-4">
              <span
                className={`text-2xl mr-3 ${
                  data.status === "valid" ? "text-green-500" : "text-red-500"
                }`}
              >
                {data.status === "valid" ? "✓" : "⚠"}
              </span>
              <h2 className="text-lg font-medium">{data.status}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Domain:</p>
                <p>{data.domain}</p>
              </div>
              <div>
                <p className="font-medium">Reason:</p>
                <p>{data.reason}</p>
              </div>
              <div>
                <p className="font-medium">MX Records:</p>
                <p>{data.hasMXRecords ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="font-medium">Valid Format:</p>
                <p>{data.validFormat}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
