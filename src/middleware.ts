import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routeAccessMap } from './lib/settings'
import { NextResponse } from 'next/server'



const matchers = Object.keys(routeAccessMap).map(route => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route]
}))

export default clerkMiddleware((auth, request) => {
  const { sessionClaims } = auth();
  let role = (sessionClaims?.metadate as { role: string })?.role || '';
  if (!sessionClaims) { role = 'sign-in' }
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(request) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

