'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {
    try {
        //mutations / DB / Make fetch
    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (userData : SignUpParams) => {  //make the params needed for signup optional

    const {email,password,firstName,lastName} = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            userData.email,
            userData.password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);

                        //this session name should be same as the one we gave in appwrite file
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);   //this is a utils func we created which json.parse & json.stringify on user obj
                                                // Coz in nextjs we cannot pass large user obj as it is we need to stringify it

    } catch (error) {
        console.error('Error', error)
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        return null;
    }
}
