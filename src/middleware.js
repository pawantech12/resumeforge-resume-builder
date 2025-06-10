import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect dashboard routes
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isDashboardRoute(req)) {
    await auth.protect(); // Redirects to Clerk login if not authenticated
  }
});

export const config = {
  matcher: [
    // Protect /dashboard and all subroutes
    "/dashboard(.*)",

    // Optional: always run for API routes
    "/(api|trpc)(.*)",

    // Skip static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
