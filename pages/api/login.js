import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { signToken } from "../../lib/auth";

// Fake database (replace with real DB)
const users = [
  {
    id: 1,
    email: "test@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user.id, email: user.email });

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
  );

  res.status(200).json({ message: "Login successful" });
}
