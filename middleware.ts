import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  const { pathname } = req.nextUrl;

  // Usuário logado tentando acessar login → manda pro dashboard
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard/home', req.url));
  }

  // Rotas públicas
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Rotas protegidas
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
