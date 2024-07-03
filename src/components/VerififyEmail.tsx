"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const handleVerify = () => {
    const params = new URLSearchParams(searchParams);
    if (email) {
      params.set("query", email);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="gap-2 flex">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email"
      />
      <Button onClick={handleVerify}>Verify</Button>
    </div>
  );
}
