import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Paginations'

const RecentTransactions = ({ accounts, transactions = [], appwriteItemId, page = 1 }: RecentTransactionsProps) => {

    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);

    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    console.log("Transactions in RecentTransactions: ", transactions)

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
      
      

    // const currentTransactions = transactions.slice(
    //     indexOfFirstTransaction,indexOfLastTransaction
    // )

    const realTransactions = transactions || [];
    const allTransactions = [...realTransactions, ...dummyTransactions];

    const currentTransactions = allTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
    );


    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">Recent transactions</h2>
                <Link
                    href={`/transaction-history/?id=${appwriteItemId}`}
                    className="view-all-btn"
                >
                    View all
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId}>
                            <BankTabItem
                                key={account.id}
                                account={account}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {accounts.map((account: Account) => (
                    <TabsContent
                        value={account.appwriteItemId}
                        key={account.id}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />

                        <TransactionsTable transactions={currentTransactions} />


                        {totalPages > 1 && (
                            <div className="my-4 w-full">
                                <Pagination totalPages={totalPages} page={page} />
                            </div>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    )
}

export default RecentTransactions