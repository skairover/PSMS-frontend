import React from 'react'
import { Link } from 'react-router-dom';
import {MdShield, MdWarning, MdOutlineInfo, MdEmail, MdPhone, MdLocationOn} from 'react-icons/md';
import {FaChartLine, FaCheck} from 'react-icons/fa';
import { CiGrid41 } from "react-icons/ci";
import {GoHome} from "react-icons/go";
import {FaRegMessage} from 'react-icons/fa6';
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled, TbCircleNumber4Filled } from "react-icons/tb";


const Home = () => {

  const navigation = [
    { name: 'Home', href: '#home', icon: <GoHome size={20} /> },
    { name: 'Features', href: '#features', icon: <CiGrid41 size={20} /> },
    { name: 'How it works', href: '#how-it-works', icon: <MdOutlineInfo size={20} /> },
    { name: 'Contact', href: '#contact', icon: <FaRegMessage size={18} /> },
  ]

  const features = [
    { title: "Anomaly Detection and Security", description: "reducing druh theft and tampering with central warehouses and ensuring that drugs reach only those who are entitled to them.", icon: <MdShield size={32} /> },
    { title: "Warning About Drug Ineractions", description: "Displays warnings when there are potential interactions between medications to ensure safe use.", icon: <MdWarning size={32} /> },
    { title: "AI-Driven Demand Forecasting", description: "Ensuring uninterrupted supply of vital medicines and reducing waste caused by accumulation of unwanted medicines.", icon: <FaChartLine size={32} /> },
    { title: "Smart Prescreption Validation", description: "Speed up dispensing, reduce human error in reading prescriptions and fully degitise medical records.", icon: <FaCheck size={32} /> }
  ]

  const steps = [
    { title: "Verification", description: "The user enters the recovery card if the medicine is for a patient, or the identification card number if it is for a worker", icon: <TbCircleNumber1Filled size={32} /> },
    { title: "Add Medications", description: "The user record the prescriped drugs", icon: <TbCircleNumber2Filled size={32} /> },
    { title: "Check Interactions", description: "the system analyzes medications and detects conficts", icon: <TbCircleNumber3Filled size={32} /> },
    { title: "Recieve Alerts", description: "Users receive warnings Of the medications conflict or the medicine is expiring", icon: <TbCircleNumber4Filled size={32} /> }
  ]

  return (
    <div className='flex flex-col items-center justify-center bg-[#d6e8e7] text-[#4F5E66] w-full'>
      
      {/* Header */}
      <header className="w-full border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-bold text-lg">PharmaFlow</div>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item, i) => (
              <a key={i} href={item.href} className="flex items-center gap-1 hover:text-[#1F2528]">{item.icon}{item.name}</a>
            ))}
            <Link to="/login" className="px-4 py-1 rounded-lg bg-[#118ae7] text-white hover:bg-[#2e6b9d]">Login</Link>
          </nav>
        </div>
      </header>
      <hr className='w-[96%] h-px bg-[#4F5E66]' />

      {/* Main */}
      <main className='w-full flex flex-col items-center px-4 md:px-8'>

        {/* Hero Section */}
        <section id="home" className="py-16 md:py-20 w-full max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#2C9AA8]">Smart Medication</h1>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">Record System</h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base">A comprehensive solution for managing medication records and ensuring patient safety.</p>
              <button className="mt-6 sm:mt-8 px-6 py-2 bg-[#118ae7] text-white rounded-lg hover:bg-[#2e6b9d]"><Link to="/login">Get Started</Link></button>
            </div>
            <img src="https://images.unsplash.com/photo-1585421514738-01798e348b17" className="rounded-lg object-cover w-full h-60 sm:h-80" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-20 bg-[#eef7f6] w-full">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-14">What makes us special</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">{feature.icon}<h3 className="font-semibold">{feature.title}</h3></div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id='how-it-works' className='py-16 md:py-20 flex flex-col items-center w-full'>
          <h2 className='text-2xl sm:text-3xl font-semibold'>How it works</h2>
          <p className='mt-2 sm:mt-4 text-sm sm:text-base text-center'>A simple process to manage and monitor patient medication with ease</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-16 w-full'>
            {steps.map((step, index) => (
              <div key={index} className="rounded-lg px-4 py-6 flex flex-col items-center bg-[#FAF9F6]">
                <div className="flex flex-col items-center gap-2">
                  {step.icon}
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm text-center">{step.description}</p>
              </div>
            ))}
          </div>
          <button className='bg-[#149DB5] hover:bg-[#1396ac] transition delay-150 duration-300 rounded-2xl text-white mt-8 sm:mt-16 px-6 py-2'>Start managing medications →</button>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 w-full max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">Contact Us</h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            
            {/* Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1 flex flex-col gap-4">
              <h4 className='text-xl font-bold'>Contact Information</h4>
              <div className='flex items-center gap-2'><MdEmail size={24} className='text-blue-500' /><div><p className='font-semibold'>Email</p><p className='text-sm'>psmps@gmail.com</p></div></div>
              <div className='flex items-center gap-2'><MdLocationOn size={24} className='text-blue-500' /><div><p className='font-semibold'>Location</p><p className='text-sm'>Blida, Algeria</p></div></div>
              <div className='flex items-center gap-2'><MdPhone size={24} className='text-blue-500' /><div><p className='font-semibold'>Phone</p><p className='text-sm'>+213XXXXXXXXX</p></div></div>
              <div className='bg-[#C9E2E0] rounded-lg text-gray-700 flex flex-col justify-center items-center h-36 px-4 py-4 mt-4'>
                <p className='text-lg font-semibold text-center'>For hospitals & pharmacies</p>
                <p className='text-sm text-gray-500 mb-2 text-center'>Request a demo of the system</p>
                <button className='text-blue-500 bg-white hover:bg-gray-100 rounded-full px-3 py-1'>Request Demo</button>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm flex-1 px-4 py-6">
              <h4 className='text-xl font-bold mt-2'>Contact Us</h4>
              <form action="submit" className='flex flex-col gap-4 mt-4 md:mt-6'>
                <input type="text" className='bg-gray-200 hover:bg-gray-300 transition rounded-lg text-black px-2.5 py-1.75' placeholder='Full Name'/>
                <input type="email" className='bg-gray-200 hover:bg-gray-300 transition rounded-lg text-black px-2.5 py-1.75' placeholder='Email'/>
                <input type="text" className='bg-gray-200 hover:bg-gray-300 transition rounded-lg text-black px-2.5 py-1.75' placeholder='Subject'/>
                <textarea className='bg-gray-200 hover:bg-gray-300 transition rounded-lg text-black px-2.5 py-1.75' placeholder='Message'></textarea>
                <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2'>Send</button>
              </form>
            </div>

          </div>
        </section>

      </main>
    </div>
  )
}

export default Home;