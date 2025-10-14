"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotFound } from "@/contexts/NotFoundContext";
import { useEffect } from "react";

export const NotFoundPage = () => {
  const router = useRouter();
  const { setIsNotFound } = useNotFound();

  useEffect(() => {
    setIsNotFound(true);
    return () => setIsNotFound(false);
  }, [setIsNotFound]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className=" bg-white flex items-center justify-center px-4" data-testid="not-found">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-blue-primary font-dm-sans leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-gray font-dm-sans mb-4">
            Page Not Found
          </h2>
          <p className="text-base text-placeholder-gray font-dm-sans leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto bg-white border border-placeholder-gray text-text-gray font-dm-sans font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto bg-blue-primary text-white font-dm-sans font-medium px-6 py-3 rounded-lg hover:bg-dark-blue transition-colors duration-200 inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8">
          <p className="text-sm text-placeholder-gray font-dm-sans">
            Need help? Contact our{" "}
            <Link href="/support" className="text-blue-primary hover:underline">
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
