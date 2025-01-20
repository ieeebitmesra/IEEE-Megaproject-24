"use client";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React from "react";
import { Vortex } from "../../components/ui/vortex";

const HeroSectionHeader = () => {
  const { session } = useAuthStore();

  return (
    <div>
      <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[40rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h1 className=" text-2xl md:text-6xl font-bold text-center">
            BitOverflow
          </h1>

          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Unite, Share, Discover: Your Campus Community Awaits!
          </p>
          <div className="flex items-center justify-center gap-4">
            {session ? (
              <Link href="/questions/ask">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Ask a question
                  </span>
                </ShimmerButton>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Sign up
                    </span>
                  </ShimmerButton>
                </Link>
                <Link
                  href="/login"
                  className="relative rounded-full border border-neutral-200 px-8 py-3 font-medium text-black dark:border-white/[0.2] dark:text-white"
                >
                  <span>Login</span>
                  <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </Link>
              </>
            )}
          </div>
        </Vortex>
      </div>
    </div>
  );
};

export default HeroSectionHeader;
