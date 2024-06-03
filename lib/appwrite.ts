"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

// Regular user
export async function createSessionClient() {

  /* 1st creates a new client with our env vars */
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)    //add exclamation at end to let ts know that we have those env vars
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  /* Then gets cookies from our sessions */
  const session = cookies().get("appwrite-session");

  // if no cookie throw error
  if (!session || !session.value) {
    throw new Error("No session");
  }

// Else attach session to our client
  client.setSession(session.value);

  // Then return the acc
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Admin
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
        return new Databases(client);
    },
    get user() {
        return new Users(client);
    }
  };
}