import { Webhook } from "svix";
import { headers } from "next/headers";

import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!CLERK_SIGNING_SECRET) {
    throw new Error(
      "Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // 웹훅 생성
  const wh = new Webhook(CLERK_SIGNING_SECRET);

  // 헤더 확인
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // 헤더에 저장된 값이 지정했던 값과 다를 경우 에러 반환
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // 헤더에 저장된 값이 지정했던 값과 같다면 body 받아 옴
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // 웹훅 payload의 유효성 검증(가짜 웹 훅 요청인지 확인)
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Clerk에서 보낸 웹훅이 맞으면 아래 작업 진행
  const eventType = evt.type;

  // 신규 유저가 들어왔을 때
  if (eventType === "user.created") {
    const { data } = evt;
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  // 유저가 탈퇴했을 때
  if (eventType === "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("Missing user id");
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  // 유저가 정보를 변경했을 때
  if (eventType === "user.updated") {
    const { data } = evt;

    await db
      .update(users)
      .set({ name: `${data.first_name} ${data.last_name}`, imageUrl: data.image_url })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 });
}
