"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { clearToken, isUserLoggedIn, setLoginSession } from "@/services/auth";
import { redirect } from "next/navigation"
import { useStore } from "@nanostores/react";
import { $isLoggedIn } from "@/stores/auth";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const isLogIn = useStore($isLoggedIn)

    function handleLogout() {
        setLoginSession(false)
        clearToken()

        redirect("/")
    }

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
    }, [isLoggedIn, isLogIn])

    return (
        <header className="flex items-center justify-between bg-green-500 p-4">
            <div className="flex items-center space-x-4">
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