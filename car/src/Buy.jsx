import React from 'react'
import Starfield from './Starfield.jsx'
import Compo from './compo.jsx'

const Buy = () => {
  return (
    
    <div className="bg-zinc-950 min-h-screen w-full flex flex-col items-center justify-center font-sans relative select-none py-32">
      <Starfield />
      <div className="flex flex-wrap items-center justify-center gap-12 mb-16">
          <Compo A="4+" B="Cities" />
          <Compo A="100+" B="Parking Spots" />
          <Compo A="1k+" B="Happy Customers" />
          <Compo A="24/7" B="Support" />
        </div>
    </div>
  )
}

export default Buy
