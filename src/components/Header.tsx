"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { clearToken, isUserLoggedIn, setLoginSession } from "@/services/auth";
import { useRouter } from "next/navigation"
import { useStore } from "@nanostores/react";
import { $isLoggedIn } from "@/stores/auth";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const isLogIn = useStore($isLoggedIn)

    const router = useRouter()

    function handleLogout() {
        setLoginSession(false)
        clearToken()

        router.push('/login')
    }

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
    }, [isLoggedIn, isLogIn])

    return (
        <header className="w-full flex items-center justify-between bg-green-500 p-4">
            <div className="flex items-center space-x-4 hover:cursor-pointer" onClick={() => router.push('/')}>
                <div className="text-white text-3xl font-bold">Pre-Test</div>
            </div>
            <div className="flex items-center space-x-4">
                {isLoggedIn ?
                    <>
                        <span className="text-white font-bold">Admin</span>
                        <Button className="bg-red-500 text-white font-bold" onClick={handleLogout}>Logout</Button>
                    </>
                    :
                    <Link href="/login" className="bg-white text-green-500 font-bold px-4 py-2 rounded">Login</Link>
                }
            </div>
        </header>
    )
}