"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { sidebarLinks } from "@/constants"

const MobileNav = () => {

  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>

        <SheetTrigger>
          <Image src=" /icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer" />
        </SheetTrigger>

        {/* For this sheet content we basically copy everything from the Sidebar with few adjustments*/}
        <SheetContent side="left" className="border-none bg-white">

          <Link
            href="/"
            className='cursor-pointer items-centre gap-1 flex px-4'
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt='Horizon logo'
            />

            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
              vrSafe
            </h1>

          </Link>

          {/* We put all the Sidebar Links within the SheetClose so as to make it collasable  i.e whenever we click on a link it closes by itself*/}
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {/* Mapping Sidebar Links */}
                {sidebarLinks.map((item) => {

                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)       // We get pathname from usePathname() from nextNavigation        

                  return (
                    /* We also provide a key here as we mapping various items/links*/
                    <SheetClose asChild key={item.route}> 
                      <Link
                        href={item.route}
                        key={item.label}
                        className={
                          // className  &&    css with condition
                          cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive }) // cn() used for selective css
                        }
                      >

                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                        className={cn({
                          'brightness-[3] invert-0': isActive   //invert the Link-logos color when the links active
                        })}
                      />

                      <p className={cn("text-16 font-semibold text-black-2", { "text-white": isActive })}>
                        {item.label}
                      </p>

                      </Link>
                    </SheetClose>
                  )
                })}
                USER DATA
              </nav>
            </SheetClose>
            FOOTER
          </div>

        </SheetContent>

      </Sheet>

    </section>
  )
}

export default MobileNav