'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"

function Header() {
    const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-5">
        {user && (
            <h1 className="text-2xl">{user.firstName}{`'s`} Space</h1>
        )}


        {/* Breadcrumbs */}

        <div>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
                <UserButton/>
            <SignedIn>

            </SignedIn>
        </div>
     
    </div>
  )
}

export default Header
