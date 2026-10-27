"use server";

import { redirect } from "next/navigation";

// UI шат: backend-тэй холбогдоогүй тул шууд dashboard руу шилжүүлнэ.
// TODO: auth API-тай холбож, session cookie үүсгэх.
export async function login() {
  redirect("/dashboard");
}
