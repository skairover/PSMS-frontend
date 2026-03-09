import React from 'react'
import { Link } from 'react-router-dom';
import {MdShield, MdWarning, MdOutlineInfo} from 'react-icons/md';
import {FaChartLine, FaCheck} from 'react-icons/fa';
import { CiGrid41 } from "react-icons/ci";
import {GoHome} from "react-icons/go";
import {FaRegMessage} from 'react-icons/fa6';
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled, TbCircleNumber4Filled, } from "react-icons/tb";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";


const Home = () => {


  const navigation = [
    { name: 'Home', href: '#home', icon: <GoHome size={20} /> },
    { name: 'Features', href: '#features', icon: <CiGrid41 size={20} /> },
    { name: 'How it works', href: '#how-it-works', icon: <MdOutlineInfo size={20} /> },
    { name: 'Contact', href: '#contact', icon: <FaRegMessage size={18} /> },
  ]

  const features = [
    {
      title: "Anomaly Detection and Security",
      description: "reducing druh theft and tampering with central warehouses and ensuring that drugs reach only those who are entitled to them.",
      icon: <MdShield size={32} />
    },
    {
      title: "Warning About Drug Ineractions",
      description: "Displays warnings when there are potential interactions between medications to ensure safe use.",
      icon: <MdWarning size={32} />
    },
    {
      title: "AI-Driven Demand Forecasting",
      description: "Ensuring uninterrupted supply of vital medicines and reducing waste caused by accumulation of unwanted medicines.",
      icon: <FaChartLine size={32} />
    },
    {
      title: "Smart Prescreption Validation",
      description: "Speed up dispensing, reduce human error in reading prescriptions and fully degitise medical records.",
      icon: <FaCheck size={32} />
    }
  ]

  const steps = [
    {
      title: "Verification",
      description: "The user enters the recovery card if the medicine is for a patient, or  the identification card number if it is for a worker",
      icon: <TbCircleNumber1Filled size={32} />
    },
    {
      title: "Add Medications",
      description: "The user record the prescriped drugs",
      icon: <TbCircleNumber2Filled size={32} />
    },
    {
      title: "Check Interactions",
      description: "the system analyzes medications and detects conficts",
      icon: <TbCircleNumber3Filled size={32} />
    },
    {
      title: "Recieve Alerts",
      description: "Users receive warnings Of the medications conflict or the medicine is expiring",
      icon: <TbCircleNumber4Filled size={32} />
    }
  ]

  return (
    <div className='max-w-screen h-full flex flex-col justify-center items-center bg-[#d6e8e7] text-[#4F5E66]'>
      <header className="w-full border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          <div className="font-bold text-lg">
            PharmaFlow
          </div>

          <nav className="flex items-center gap-6">
            {navigation.map((item, i) => (
              <a key={i} href={item.href} className="flex items-center gap-1 hover:text-[#1F2528]">
                {item.icon}
                {item.name}
              </a>
            ))}

            <Link
              to="/login"
              className="px-4 py-1 rounded-lg bg-[#118ae7] text-white hover:bg-[#2e6b9d]"
            >
              Login
            </Link>
          </nav>

        </div>
      </header>
      <hr className='w-[96%] h-px bg-[#4F5E66] ' />
      <main className='w-full h-full flex flex-col items-center justify-center px-8'>

        <section id="home" className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#2C9AA8]">
                Smart Medication
              </h1>
              <h2 className="text-3xl font-bold mt-2">
                Record System
              </h2>
              <p className="mt-6 text-sm">
                A comprehensive solution for managing medication
                records and ensuring patient safety.
              </p>
              <button className="mt-8 px-6 py-2 bg-[#118ae7] text-white rounded-lg hover:bg-[#2e6b9d]">
                Get Started
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1585421514738-01798e348b17"
              className="rounded-lg object-cover w-full h-80"
            />
          </div>
        </section>

        <section id="features" className="py-20 bg-[#eef7f6]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-14">
              What makes us special
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    {feature.icon}
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id='how-it-works' className='h-120  flex flex-col justify-center items-center'>
          <h2 className='text-3xl font-semibold'>How it works</h2>
          <p>A simple process to manage and monitor patient medication with ease</p>
          <div className='h-48 gap-6 grid grid-cols-4 px-4 mt-16'>
            {steps.map((step, index) => (
              <div className=" rounded-lg px-4 py-6 flex flex-col items-center bg-[#FAF9F6]" key={index}>
                <div className="flex items-center gap-2">
                  <div className="icon">{step.icon}</div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="mt-6 text-sm">{step.description}</p>
              </div>
            ))}

          </div>
          <button className='bg-[#149DB5] hover:bg-[#1396ac] transition delay-150 duration-300 rounded-2xl text-white mt-16'>start managing medications →</button>
        </section>

        <section id="contact" className="py-20 w-[48em]  ">
          <div className=" mx-auto px-6 flex flex-col   ">
            <h2 className="text-3xl font-semibold text-center mb-10">
              Contact Us
            </h2>

            <div className="flex justify-evenly gap-12  ">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-evenly h-120 w-full " >
                <h4 className='text-xl font-bold'>contact information</h4>
                <div className='flex '>
                  <MdEmail size={26} className='text-blue-500'/>
                  <span className='ml-2'>
                    <p className='font-semibold'>Email</p>
                    <p className='text-sm'>psmps@gmail.com</p>
                  </span>
                </div>
                <div className='flex '>
                  <MdLocationOn size={28} className='text-blue-500'/>
                  <span className='ml-2'>
                    <p className='font-semibold'>Location</p>
                    <p className='text-sm'>Blida, Algeria</p>
                  </span>
                </div>
                 <div className='flex '>
                  <MdPhone size={28} className='text-blue-500'/>
                  <span className='ml-2'>
                    <p className='font-semibold'>Phone</p>
                    <p className='text-sm'>+213XXXXXXXXX</p>
                  </span>
                </div>
                <div className='bg-[#C9E2E0] rounded-lg text-gray-700 flex flex-col justify-center items-center h-36 px-2 py-4'>
                  <p className='text-lg font-semibold'>for hospitals & pharmacies</p>
                  <p className='text-sm text-gray-500 mb-4'>request a demo of the system</p>
                  <button className='text-blue-500 bg-white hover:bg-gray-100 rounded-full px-0.75 py-0.5'>request demo</button>
                </div>
              </div>


              <div className="bg-white rounded-lg shadow-sm h-120 w-full px-4 py-6  ">
                <h4 className='text-xl font-bold mt-6'>contact us</h4>
                <form action="submit" className='flex flex-col gap-4 mt-20'>
                  <input type="text"  className='bg-gray-200 hover:bg-gray-300 transition delay-150 duration-300 rounded-lg text-black px-2.5 py-1.75' placeholder='Full Name'/>
                  <input type="email"  className='bg-gray-200 hover:bg-gray-300 transition delay-150 duration-300 rounded-lg text-black px-2.5 py-1.75' placeholder='Email'/>
                  <input type="text"  className='bg-gray-200 hover:bg-gray-300 transition delay-150 duration-300 rounded-lg text-black px-2.5 py-1.75' placeholder='Subject'/>
                  <textarea name="message" id="" className='bg-gray-200 hover:bg-gray-300 transition delay-150 duration-300 rounded-lg text-black px-2.5 py-1.75' placeholder='Message'> message</textarea>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>send</button>

                  
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}

export default Home