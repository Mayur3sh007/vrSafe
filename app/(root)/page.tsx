import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async() => {

  // const loggedInUser = {firstName: 'Mayuresh', lastName: 'Chavan', email: 'mayureshc007@gmail.com'};
  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser)

  return (
    <section className='home'> {/* This className home was defined by us in global css */}
      <div className='home-content'>  
        <header className='home-header'>

          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedInUser?.name || 'Guest'}
            subtext="Access & Manage your Account or Transactions Efficiently"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        Current USer Balanace
      </div>

      <RightSidebar 
        user={loggedInUser}
        transactions={[]}
        banks={[{currentBalance : 1250},{currentBalance : 2500}]}
      />

    </section>
  )
}

export default Home