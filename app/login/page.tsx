'use client'
import React, { useState } from 'react'
import useAppAuth from '../context/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useAppUtils from '../context/utills'
import { FcGoogle } from 'react-icons/fc'

function SIGNIN() {

  const { handleGoogleLogin } = useAppAuth()
  const { loading, setLoading } = useAppUtils()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='flex justify-center items-center min-h-[90vh]' >
      <Card className="w-full max-w-md shadow-xl border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Bem-vindo</CardTitle>
          <CardDescription className="text-base">Entre com sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Login Button */}
          <Button
            variant="outline"
            className="w-full h-11 cursor-pointer duration-200 hover:scale-[1.01] text-base font-medium border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle className='w-30' />
            {
              loading
                ?
                'Redirecionando'
                :
                'Continuar com Google'
            }
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Email/Password Login Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <button type="button" className="text-sm text-[#39BE00] hover:underline" disabled={loading}>
                  Esqueceu a senha?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base bg-[#39BE00] font-bold hover:bg-[#39BE00] cursor-pointer duration-200 hover:scale-[1.01]" disabled={loading}>
              {loading ? "Carregando" : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <p className="text-sm text-center text-muted-foreground">
            Não tem uma conta? <button className="font-medium text-[#39BE00] hover:underline">Cadastre-se</button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SIGNIN