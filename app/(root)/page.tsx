import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async( {searchParams : { id, page } } : SearchParamProps ) => { //In next JS we get the id from searchParams which can be used to identify curr user

  const currentPage =  Number(page as string) || 1
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  // console.log({
  //   accountsData,
  //   account
  // })

  return (
    <section className='home'> {/* This className home was defined by us in global css */}
      <div className='home-content'>  
        <header className='home-header'>

          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access & Manage your Account or Transactions Efficiently"
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
          <RecentTransactions 
          accounts = {accounts.data}
          transactions = {account?.transactions}
          appwriteItemId = {appwriteItemId}
          page = {currentPage} 
          />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0,2)}  //show 1st 2 cards
      />

    </section>
  )
}

export default Home