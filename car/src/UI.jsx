import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import Price from './Price.jsx'
import Compo from './compo.jsx'
import Starfield from './Starfield.jsx'
import Price2 from './Price2.jsx'
import Price3 from './Price3.jsx'

const UI = () => {
  const navigate = useNavigate(); 
  const [openFaq, setOpenFaq] = useState(-1);

  const faqData = [
    {
      question: "How does the Smart Parking pass work?",
      answer: "Once you purchase a pass (Basic, Premium, or Ultimate), a digital parking permit is instantly attached to your account. You can navigate to any of our registered companion spots, scan your entry barcode, and park without dealing with paper tickets or manual payments."
    },
    {
      question: "Can I cancel or upgrade my subscription any time?",
      answer: "Absolutely. You can easily upgrade or cancel your subscription directly from your user dashboard. Upgrades take effect instantly, and cancellations will remain active until the end of your current billing period."
    },
    {
      question: "What happens if a parking spot is completely full?",
      answer: "Our smart dashboard tracks real-time spot occupancy. If a chosen location is reaching full capacity, the application will proactively ping your system and reroute you to the nearest available premium spot automatically."
    },
    {
      question: "Is my payment information fully secure?",
      answer: "Yes, security is our top priority. All payments are securely routed and handled using industry-grade, bank-level encryption. We never store your full card numbers or sensitive banking data on our local servers."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  // Helper function for clean, smooth internal scrolling
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    /* Added html-scroll-behavior helper class indirectly by using JS smooth scrolling below */
    <div className="bg-zinc-950 min-h-screen w-full flex flex-col items-center justify-center font-sans relative select-none py-32">
      <Starfield />
      
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center w-full z-10">
        <img src="./SA_CAR.png" alt="SA Logo" className="w-12 h-12 rounded-full object-cover" />
        <nav className="flex items-center gap-8">
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/loogin">Login</Link>
          
          {/* Changed 'to="/buy"' to an anchor with smooth scroll trigger */}
          <a 
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer" 
            href="#pricing"
            onClick={(e) => scrollToSection(e, 'pricing')}
          >
            Buy
          </a>
          
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/contact">Contact</Link>
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/about">About</Link>
        </nav>
      </header>

      <div className="flex flex-col items-center text-center px-4 max-w-4xl w-full">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-widest text-zinc-300 uppercase mb-6">
          <svg className="h-3.5 w-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>Smart Parking <span className="text-zinc-600 mx-1">•</span> Zero Hassle</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 flex flex-col items-center gap-2">
          <span className="bg-gradient-to-r from-cyan-400 via-yellow-400 to-green-500 bg-clip-text text-transparent">Park across anywhere</span>
          <span className="block w-max max-w-full overflow-hidden border-r-4 border-fuchsia-500 pr-1 animate-type whitespace-nowrap bg-gradient-to-r from-cyan-400 via-orange-400 to-fuchsia-500 bg-clip-text text-transparent">
            Anytime. Instantly.
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-lg">
          Your one-stop solution for hassle-free car parking.
        </p>
        
        {/* "Get Started" can also smoothly scroll down to the pricing plans now */}
        <button 
          onClick={(e) => scrollToSection(e, 'pricing')}
          className="bg-gradient-to-r from-green-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity mb-16"
        >
          Get Started
        </button>

        <div className="flex flex-wrap items-center justify-center gap-12 mb-16">
          <Compo A="4+" B="Cities" />
          <Compo A="100+" B="Parking Spots" />
          <Compo A="1k+" B="Happy Customers" />
          <Compo A="24/7" B="Support" />
        </div>

        {/* Added id="pricing" and scroll-mt-24 so the title doesn't hide behind the absolute header */}
        <div id="pricing" className="flex flex-wrap items-center justify-center gap-12 mb-24 scroll-mt-24 z-10">
          <Price originalPrice="69/-" price="49/-" duration="1 Day" pass="Basic" />
          <Price2 originalPrice="1199/-" price="999/-" duration="1 Month" pass="Premium" />
          <Price3 originalPrice="11999/-" price="8999/-" duration="1 Year" pass="Ultimate" />
        </div>
        
        {/* FAQ Section */}
        <div className="w-full max-w-2xl text-left mb-20 z-10">
          <h2 className="text-3xl font-black tracking-tight text-white text-center mb-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-white hover:bg-zinc-900/60 transition-colors"
                >
                  <span>{item.question}</span>
                  <svg 
                    className={`h-5 w-5 text-cyan-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 border-t border-zinc-800/50' : 'max-h-0'}`}
                >
                  <p className="px-6 py-4 text-sm text-zinc-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="text-sm text-zinc-500">
          &copy; 2024 SA Car Parking. All rights reserved.
        </span>
      </div>
    </div>
  )
}

export default UI;