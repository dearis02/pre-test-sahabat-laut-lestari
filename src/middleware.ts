import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isUserLoggedIn } from './services/auth'

const PUBLIC_ROUTE = ["/login"]

export function middleware(request: NextRequest) {
    const { nextUrl } = request

    if (PUBLIC_ROUTE.includes(nextUrl.pathname)) {
        return NextResponse.next()
    } else if (nextUrl.pathname === '/') {
        return NextResponse.next()
    }

    const isLoggedIn = isUserLoggedIn()
    if (isLoggedIn) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
    matcher: ['/species/create'],
}