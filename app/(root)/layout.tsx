import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //If we use router we need to make the comp client side but swe dont wanna do that so.. use redirect() from next-nav
  // const router = useRouter();
  // const loggedInUser = await getLoggedInUser();
  // if(!loggedInUser) router.push('/sign-in')

  const loggedInUser = await getLoggedInUser();
  if(!loggedInUser) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedInUser} />

        <div className="flex size-full flex-col">

          <div className="root-layout">

            <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon"/>

            <div>
              <MobileNav user={loggedInUser} />
            </div>
          </div>
          {children}
        </div>
    </main>
  );
}
