"use client";

import dynamic from "next/dynamic";

const StarsCanvas = dynamic(
  () =>
    import("@/components/main/star-background").then((m) => m.StarsCanvas),
  { ssr: false }
);

export const StarsWrapper = () => <StarsCanvas />;
