import { redirect } from "next/navigation";

export default function HomePage() {
  // Route visitors to the real authentication flow rather than the old demo inbox.
  redirect("/sign-in");
}
