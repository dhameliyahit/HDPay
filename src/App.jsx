import React from 'react'
import PayButton from './components/PayButton'

const App = () => {
  const [amt, setAmt] = React.useState(1);
  return (
    <>

      <input type="number" placeholder="Enter Amount" onChange={(e) => setAmt(e.target.value)} className="input" />

      <PayButton upiid={"heetdhameliya59@oksbi"} pn="HDPay" am={amt} />
    </>
  )
}

export default App