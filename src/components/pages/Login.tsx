"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { setLoginSession, setToken, useLogin } from "@/services/auth"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { redirect } from "next/navigation"

const formSchema = z.object({
    username: z.string().min(1, 'username is required'),
    password: z.string().min(1, "password is required").min(8, "password must be at least 8 characters long"),
})

type LoginFormData = z.infer<typeof formSchema>

export default function Login() {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = (values: LoginFormData) => {
        mutate(values)
    }

    const { mutate, isError, error, isSuccess, data } = useLogin()

    useEffect(() => {
        if (isError) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                form.setError('username', { message: error.response?.data })
            }
            form.resetField('password');
        }

        if (isSuccess) {
            setLoginSession(true)
            setToken(data?.accessToken, data?.refreshToken)
            redirect("/")
        }
    }, [isError, error, form, isSuccess, data]);


    return (
        <div className="w-full max-w-lg h-fit shadow-md px-10 py-10 rounded-md my-auto">
            <h1 className="text-3xl text-center font-bold mb-10">Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Form>
        </div>
    )
}