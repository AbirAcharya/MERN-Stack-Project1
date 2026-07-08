import React from 'react'

// 1. Added originalPrice to the destructured props
const Price3 = ({ originalPrice, price, duration, pass }) => {
  return (
    <div className="relative group w-75 font-sans">
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-30 blur group-hover:opacity-60 transition duration-500"></div>
      
      {/* Main Card */}
      <div className="relative bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-6 text-zinc-100 flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Subtle top-right accent blur */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>

        <div>
          {/* Header Section */}
          <div className="flex items-baseline justify-between mb-6">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/50 border border-cyan-800/30 px-2.5 py-1 rounded-md">
              {pass}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Instant Access
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="mb-6">
            <div className="flex items-baseline gap-1 text-zinc-400 text-sm">
              <span>Duration:</span>
              <span className="text-zinc-200 font-semibold">{duration}</span>
            </div>
            
            {/* Price Container */}
            <div className="mt-2 flex items-baseline gap-3">
              {/* Main New Price */}
              <span className="text-5xl font-black tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                {price}
              </span>
              
              {/* 2. Strikethrough Original Price (Only renders if originalPrice is provided) */}
              {originalPrice && (
                <span className="text-lg font-medium text-zinc-500 line-through decoration-zinc-600">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-zinc-800/50 via-zinc-700/30 to-transparent my-5" />

          {/* Features List */}
          <ul className="space-y-3.5 text-sm text-zinc-400 mb-8">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Everything in Premium
                
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Interior cleaning in every month</span>
              
            </li>
          </ul>
        </div>

        {/* Call to Action Button */}
        <button className="w-full bg-zinc-100 text-zinc-950 font-semibold py-3 px-4 rounded-xl shadow-[0_1px_2px_rgba(255,255,255,0.2)_inset] hover:bg-white active:scale-[0.98] transition-all duration-200 text-center">
          Get Started
        </button>

      </div>
    </div>
  )
}

export default Price3