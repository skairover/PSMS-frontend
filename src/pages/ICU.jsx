import React from 'react'
import Layout from '../Components/Layout'
import { MdMonitorHeart } from 'react-icons/md'

const ICU = () => {
  return (
    <Layout title="ICU">
      <div className="px-4 sm:px-6 py-6 h-full flex flex-col">

        {/* Page label */}
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#088395] mb-6">
          Ward
        </p>

        {/* Coming soon card */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center px-8 py-20">

          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#071952] to-[#088395] flex items-center justify-center shadow-lg shadow-[#088395]/25">
              <MdMonitorHeart size={30} color="white" />
            </div>
            {/* Pulse ring */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#37B7C3] border-2 border-white animate-pulse" />
          </div>

          <h2 className="text-xl font-bold text-[#071952] mb-2">ICU Module</h2>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
            The Intensive Care Unit module is currently under development and will be available soon.
          </p>

          {/* Progress bar */}
          <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-[#088395] to-[#37B7C3] rounded-full" />
          </div>
          <p className="text-[11px] text-slate-300 font-medium mt-2">In progress</p>

        </div>
      </div>
    </Layout>
  )
}

export default ICU