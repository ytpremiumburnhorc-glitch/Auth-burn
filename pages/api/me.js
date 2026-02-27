import { verifyToken } from "../../lib/auth";

export default function handler(req, res) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "Not authenticated" });

  try {
    const user = verifyToken(token);
    res.status(200).json({ user });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
