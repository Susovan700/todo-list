import { verifyjwt } from "../util/jwtutil";

export async function AuthMiddleware(request) {
  const rawToken = request.headers.get("authorization");
  const token = rawToken?.replace("Bearer ", "");

  if (!token) {
    return new Response(JSON.stringify({ message: "Token Missing" }), { status: 401 });
  }

  try {
    const user = await verifyjwt(token);
    return { user }; // success
  } catch (err) {
    return new Response(JSON.stringify({ message: "Invalid Token" }), { status: 403 });
  }
}
