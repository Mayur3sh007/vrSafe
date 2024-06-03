"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomInputField from "./CustomInputField"
import { AuthFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/user.actions"

const AuthForm = ({ type }: { type: string }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = AuthFormSchema(type);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {  //see what this data gives us by hoverng over it

        setIsLoading(true);

        try {
            
            //Signup with appwrite & plaid token
            if(type === 'sign-up'){
                const newUser = await signUp(data);
                setUser(newUser)
            }

            if(type === 'sign-in'){
                // const response = await signIn({
                //     email:data.email,
                //     password:data.password
                // })

                // if(reponse) router.push('/')
            }

        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className='auth-form'>     
            <header className='flex flex-col gap-5 md:gap-8'>

                {/* Logo with link to homepage */}
                <Link
                    href="/"
                    className='cursor-pointer items-center gap-1 flex'
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Horizon logo'
                    />

                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                        vrSafe
                    </h1>

                </Link>

                {/* To show Sign-up or Sign-iN based on whether user has logged in or not */}
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link Account to your Profile'
                            : type === 'sign-in'
                                ? 'Sign-In'
                                : 'Sign-Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user
                                ? 'Link your Bank Accounts to get Started'
                                : 'Please Enter your Details'
                            }
                        </p>
                    </h1>
                </div>

            </header>

            {/* Check if User is logged In or not  if logged in give PlaidLink component else our shadcn form */}
            {
                user
                    ? (
                        <div className='flex flex-col gap-4'>
                            {/* PlaidLink Component */}
                        </div>
                    )
                    : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {type === 'sign-up' && (
                                    <>
                    
                                        <div className="flex gap-4">
                                            <CustomInputField control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                                            <CustomInputField control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                                        </div>

                                        <CustomInputField control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                                        <CustomInputField control={form.control} name='city' label="City" placeholder='Enter your city' />

                                        <div className="flex gap-4">
                                            <CustomInputField control={form.control} name='state' label="State" placeholder='Example: NY' />
                                            <CustomInputField control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                                        </div>

                                        <div className="flex gap-4">
                                            <CustomInputField control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                                            <CustomInputField control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                                        </div>

                                    </>
                                )}

                                {/* Required for both sign-up & sign-in */}
                                <CustomInputField control={form.control} name='email' label='Email' placeholder='Enter your Email' />
                                <CustomInputField control={form.control} name='password' label='Password' placeholder='Enter your Password' />

                                <div className="flex flex-col gap-4">
                                    <Button type="submit" className="form-btn" disabled={isLoading}>
                                        {isLoading
                                            ? (
                                                <>
                                                    <Loader2
                                                        size={20}
                                                        className="animate-spin"
                                                    />
                                                    &nbsp;
                                                    Loading...

                                                </>
                                            )
                                            :
                                            type === 'sign-in' ? 'SIGN-IN' : 'SIGN-UP'
                                        }
                                    </Button>
                                </div>

                                <footer className="flex justify-center gap-1">
                                    <p className="text-14 font-normal text-gray-600">
                                        {type === 'sign-in'
                                            ? "Don't have an account?"
                                            : "Already have an account?"}
                                    </p>
                                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                                        {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                                    </Link>
                                </footer>

                            </form>
                        </Form>
                    )
            }

        </section>
    )
}

export default AuthForm