'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link  from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({user}:SiderbarProps) => {

    const pathname = usePathname();

  return (
    <section className='sidebar'>

                    {/* Logo */}
        <nav className='flex flex-col gap-4'>
            <Link 
            href="/" 
            className='mb-12 cursor-pointer items-centre gap-2 flex'
            >
                <Image 
                src="/icons/logo.svg" 
                width={34}
                height={34}
                alt='Horizon logo'
                className='size-[24px] max-xl:size-14'
                />
                <h1 className='sidebar-logo'>
                    vrSafe
                </h1>
            </Link>

                            {/* Mapping Sidebar Links */}
            {sidebarLinks.map((item)=>{

                const isActive =   pathname === item.route || pathname.startsWith(`${item.route}/`)       // We get pathname from usePathname() from nextNavigation        

                return(
                    <Link 
                    href={item.route}
                    key={item.label}
                    className={
                        // className  &&    css with condition
                    cn ('sidebar-link', {'bg-bank-gradient' : isActive} ) // cn() used for selective css
                    }      
                    >
                    <div className="relative size-6">
                        <Image 
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({
                            'brightness-[3] invert-0': isActive   //invert the Link-logos color when the links active
                        })}
                        />
                    </div>
                    <p className={cn("sidebar-label", { "!text-white": isActive })}>
                        {item.label}
                    </p>
                    </Link>
                )
            })}

            USER

        </nav>

        Footer

    </section>
  )
}

export default Sidebar