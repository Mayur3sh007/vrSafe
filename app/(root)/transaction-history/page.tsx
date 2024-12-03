import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Paginations';
// import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react'

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
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
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  if (!accounts) return;
  console.log("Account Found: ", accounts)
  const accountsData = accounts?.data;
  console.log("Acc Data: ", accountsData)
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  console.log("Appwrite ID: ", appwriteItemId)
  const account = await getAccount({ appwriteItemId })
  console.log("Particular acc: " , account)

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const realTransactions = account?.transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

    const allTransactions = [...realTransactions, ...dummyTransactions];

    const currentTransactions = allTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
    );
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
            <p className="text-14 text-blue-25">
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className='transactions-account-balance'>
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          {/* <TransactionsTable
            transactions={currentTransactions}
          /> */}
          {currentTransactions ? (
              <TransactionsTable transactions={currentTransactions} />
            ) : (
              <p>No transactions found.</p>
            )}

          
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory