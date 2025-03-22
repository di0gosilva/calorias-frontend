"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const { data: session } = useSession()
  if(!session) return null

  return (
    <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sair
      </Button>
  )
}

