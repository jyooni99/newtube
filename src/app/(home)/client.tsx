"use client";

import { trpc } from "@/trpc/client";

export function PageClient() {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Antonio" });
  return <div> 데이터불러오기 {data.greeting}</div>;
}
