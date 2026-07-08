import React from 'react'


const Compo = ({ A, B, className }) => {
  return (
    
    <div className={`flex items-baseline gap-2 ${className || ''}`}>
      
      {/* Stat Number */}
      <h4 className=" animate-type bg-gradient-to-r from-blue-400 via-cyan-400 to-white bg-clip-text text-transparent text-2xl font-bold whitespace-nowrap">
        {A}
      </h4>
      
      {/* Stat Label */}
      <h4 className=" animate-type bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent text-1xl font-bold whitespace-nowrap">
        {B}
      </h4>

    </div>
  )
}

export default Compo