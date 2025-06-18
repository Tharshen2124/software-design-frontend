import { UserRoleProvider } from "@/contexts/UserRoleContexts";
import "@/styles/globals.css";
import { Hanken_Grotesk } from "next/font/google";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <UserRoleProvider>
      <main className={hankenGrotesk.className}>
        <Component {...pageProps} />
      </main>
    </UserRoleProvider>
  )
}
