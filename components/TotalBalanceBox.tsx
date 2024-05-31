import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({accounts = [], totalBanks, totalCurrentBalance} : TotlaBalanceBoxProps) => {
  return (
    <section className='total-balance'>
        <div className='total-balance-chart'>
            <DoughnutChart accounts={accounts} />
        </div>

        <div className='flex flex-col gap-6'>
            <h2 className='header-2'>
                Bank Accoutns: {totalBanks}
            </h2>
        </div>

        <div className='flex flex-col gap-2'>
            <p className='total-balance-label'>
                Total Current Balance
            </p>
        </div>
        
        <div className='total-balance-amount flex-centre gap-2'>
            <AnimatedCounter amount={totalCurrentBalance} />                    {/* {formatAmount (totalCurrentBalance)}   --> No need to format as its already formatted by CountUp*/} 
        </div>

    </section>
  )
}

export default TotalBalanceBox