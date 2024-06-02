import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {

  const loggedIn = {firstName: 'Mayuresh', lastName: 'Chavan', email: 'mayureshc007@gmail.com'};

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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        Current USer Balanace
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance : 1250},{currentBalance : 2500}]}
      />

    </section>
  )
}

export default Home