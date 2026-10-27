import { NextResponse, type NextRequest } from "next/server";

// Зөвхөн cookie байгаа эсэхийг хурдан шалгана (optimistic check).
// Сессийн жинхэнэ шалгалт нь src/lib/auth.ts доторх requireAdmin()-д хийгдэнэ.
const SESSION_COOKIE = "admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  // /login-оос буцааж redirect хийхгүй: cookie хуучирсан үед давталт үүсгэнэ
  if (pathname === "/login") return NextResponse.next();

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
