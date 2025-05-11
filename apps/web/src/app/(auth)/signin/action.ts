"use server";

import { z } from "zod";

import { createSClient } from "@/supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
});

export const loginUser = async ({
  email,
}: {
  email: string;
}) => {
  const loginUserValidation = loginSchema.safeParse({
    email,
  });

  if (!loginUserValidation.success) {
    return {
      error: true,
      message:
        loginUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  const supabase = createSClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  if (!data) {
    return {
      error: true,
      message: "Login failed. Please try again.",
    };
  }

  return {
    success: true,
    message: "Magic link sent to your email.",
  };
};