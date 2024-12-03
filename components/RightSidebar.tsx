import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {

    const dummyTransactions = [
        {
          id: '674f4b970010053b51df',
          name: 'Dinner at La Piazza',
          amount: '45.75',
          date: '2024-01-15T19:45:23.000+00:00',
          paymentChannel: 'card',
          category: 'Food and Drink',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e0',
          name: 'Uber Ride',
          amount: '12.50',
          date: '2024-02-08T08:12:10.000+00:00',
          paymentChannel: 'online',
          category: 'Travel',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e1',
          name: 'Payment Received from John',
          amount: '200.00',
          date: '2024-03-20T14:33:55.000+00:00',
          paymentChannel: 'bank transfer',
          category: 'Payment',
          type: 'credit',
        },
        {
          id: '674f4b970010053b51e2',
          name: 'Spotify Subscription',
          amount: '9.99',
          date: '2024-04-02T06:20:45.000+00:00',
          paymentChannel: 'online',
          category: 'default',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e3',
          name: 'Amazon Purchase',
          amount: '99.99',
          date: '2024-05-14T13:15:29.000+00:00',
          paymentChannel: 'card',
          category: 'default',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e4',
          name: 'McDonalds Meal',
          amount: '15.30',
          date: '2024-06-07T11:40:10.000+00:00',
          paymentChannel: 'card',
          category: 'Food and Drink',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e5',
          name: 'Bank Fee',
          amount: '3.00',
          date: '2024-07-22T17:22:33.000+00:00',
          paymentChannel: 'bank',
          category: 'Bank Fees',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e6',
          name: 'Netflix Subscription',
          amount: '13.49',
          date: '2024-08-11T22:10:05.000+00:00',
          paymentChannel: 'online',
          category: 'default',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e7',
          name: 'Monthly Rent',
          amount: '1200.00',
          date: '2024-09-25T00:00:00.000+00:00',
          paymentChannel: 'bank transfer',
          category: 'Transfer',
          type: 'debit',
        },
        {
          id: '674f4b970010053b51e8',
          name: 'Starbucks Coffee',
          amount: '5.75',
          date: '2024-10-10T09:15:19.000+00:00',
          paymentChannel: 'card',
          category: 'Food and Drink',
          type: 'debit',
        },
      ];

    const allTransactions = [...transactions, ...dummyTransactions];

    const categories : CategoryCount[] = countTransactionCategories(allTransactions);
    console.log(categories)

    return (
        <aside className='right-sidebar'>   {/** This right sidebar css makes it such that right sidebar is only visible for larger devices and for smaller devices it stays "hidden"  */}

            {/* Name section */}
            <section className='flex flex-col pb-8'>
                <div className='profile-banner' />
                <div className='profile'>
                    <div className='profile-img'>
                        <span className='text-5xl font-bold text-blue-500'>
                            {user.firstName[0]} {/* First Char */}
                        </span>
                    </div>
                </div>

                <div className="profile-details">
                    <h1 className='profile-name'>
                        {user.firstName}
                    </h1>
                    <p className="profile-email">
                        {user.email}
                    </p>
                </div>

            </section>

            {/* Banks Section*/}
            <section className="banks">

                <div className="flex w-full justify-between">
                    <h2 className="header-2">My Banks</h2>
                    <Link href="/" className="flex gap-2">
                        <Image
                            src="/icons/plus.svg"
                            width={20}
                            height={20}
                            alt="plus"
                        />
                        <h2 className="text-14 font-semibold text-gray-600">
                            Add Bank
                        </h2>
                    </Link>
                </div>

                {banks?.length > 0 && (
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className='relative z-10'>     {/* 1st card is above so put z = 10 */}
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && ( 
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className='mt-10 flex flex-col  flex-1 gap-6'>
                    <h2 className='header-2'>
                        Top Categories
                    </h2>

                    <div className='space-y-5'>
                        {categories.map((category,index)=>(
                            <Category key={category.name} category = {category}/>
                        ))}
                    </div>

                </div>

            </section> 

        </aside>
    )
}

export default RightSidebar