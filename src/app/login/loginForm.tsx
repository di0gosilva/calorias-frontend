"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoginForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if(session) {
      router.push("/meals")
    }
  }, [session, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if(!res.ok) throw new Error(data.message || "Login falhou")

      localStorage.setItem("token", data.token)

      toast.success("Login realizado com sucesso!")
      router.push("/meals")
    } catch(error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao fazer login.")
      } else {
        toast.error("Erro ao fazer login.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[360px] mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-xl text-center">Entrar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <Button
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/meals` })}
            variant="secondary"
          >
            Entrar com Google
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
