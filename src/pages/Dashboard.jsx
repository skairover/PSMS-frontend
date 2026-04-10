import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import toast from 'react-hot-toast';
import api from '../services/api';
import WeeklyBarChart from '../Components/WeeklyBarChart';
import { Link } from 'react-router-dom';
import QRScanner from '../Components/QrScanner';
import { CiPill } from 'react-icons/ci';
import { IoMdTime } from "react-icons/io";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";


const quickActions = [
  { label: 'Add Medicine',      to: '/pharmacy'   },
  { label: 'Drug Interactions', to: null          },
  { label: 'Dispense Medicine', to: '/dashboard'  },
  { label: 'New Patient',       to: '/emergency'  },
];

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => { fetchMedicines(); }, []);

  const fetchMedicines = async () => {
    try {
      const res = await api.get('/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      toast.error('Failed to fetch medicines');
      console.error(err);
    }
  };

  return (
    <Layout title="Dashboard">
      {showScanner && (
        <QRScanner
          onClose={() => setShowScanner(false)}
          onScan={(data) => console.log('QR DATA:', data)}
        />
      )}

      <div className="bg-[#EBF4F6] min-h-screen px-4 sm:px-6 py-6 space-y-5">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

          {/* Total Medicines */}
          <div className="relative bg-white rounded-2xl p-5 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#088395] to-[#37B7C3]" />
            <div className="w-10 h-10 bg-[#EBF4F6] rounded-xl flex items-center justify-center mb-3 mt-1">
              <CiPill className="text-[#088395] text-xl" />
            </div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-1">Total Medicines</p>
            <p className="text-3xl font-bold text-[#071952] leading-none">{medicines.length}</p>
          </div>

          {/* Expiring Soon */}
          <div className="relative bg-white rounded-2xl p-5 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-rose-400 to-pink-300" />
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mb-3 mt-1">
              <IoMdTime className="text-rose-400 text-xl" />
            </div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-1">Expiring Soon</p>
            <p className="text-3xl font-bold text-[#071952] leading-none">3</p>
          </div>

          {/* Low Stock */}
          <div className="relative bg-white rounded-2xl p-5 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-amber-400 to-yellow-300" />
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3 mt-1">
              <BiSolidCoinStack className="text-amber-400 text-xl" />
            </div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-[#071952] leading-none">50</p>
          </div>

          {/* Patients Today */}
          <div className="relative bg-white rounded-2xl p-5 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#071952] to-[#088395]" />
            <div className="w-10 h-10 bg-[#eef1f9] rounded-xl flex items-center justify-center mb-3 mt-1">
              <FaUser className="text-[#071952] text-base" />
            </div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-1">Patients Today</p>
            <p className="text-3xl font-bold text-[#071952] leading-none">45</p>
          </div>

        </div>

        {/* ── Scan Card + Quick Actions ── */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-4">

          {/* Scan Card */}
          <div className="relative bg-gradient-to-br from-[#071952] to-[#088395] rounded-2xl p-7 overflow-hidden shadow-lg shadow-[#088395]/30 flex flex-col justify-between min-h-[190px]">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#37B7C3]/20 pointer-events-none" />
            <div className="absolute -bottom-14 right-8 w-48 h-48 rounded-full bg-white/[0.04] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white mb-1">Scan CHIFFA Card</h2>
              <p className="text-sm text-[#EBF4F6]/70">Place the card in front of the reader to begin</p>
            </div>

            <button
              onClick={() => setShowScanner(true)}
              className="relative z-10 mt-6 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-fit"
            >
              <MdOutlineDocumentScanner className="text-lg" />
              Scan Card
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-[15px] font-bold text-[#071952] whitespace-nowrap">Quick Actions</h3>
              <div className="flex-1 h-px bg-[#EBF4F6]" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {quickActions.map(({ label, to }) =>
                to ? (
                  <Link
                    key={label}
                    to={to}
                    className="flex items-center gap-2.5 bg-[#F7FBFC] border border-[#daeef2] hover:border-[#37B7C3] hover:bg-[#EBF4F6] hover:text-[#088395] hover:-translate-y-0.5 text-[#071952] text-sm font-medium px-4 py-3.5 rounded-[13px] transition-all duration-200"
                  >
                    <FaCirclePlus className="text-[#37B7C3] flex-shrink-0 text-base" />
                    {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    className="flex items-center gap-2.5 bg-[#F7FBFC] border border-[#daeef2] hover:border-[#37B7C3] hover:bg-[#EBF4F6] hover:text-[#088395] hover:-translate-y-0.5 text-[#071952] text-sm font-medium px-4 py-3.5 rounded-[13px] transition-all duration-200 text-left"
                  >
                    <FaCirclePlus className="text-[#37B7C3] flex-shrink-0 text-base" />
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

        </div>

        {/* ── Chart ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-[#071952]">Medicine Stock Overview</h3>
            <span className="text-[11px] font-semibold bg-[#EBF4F6] text-[#088395] px-3 py-1 rounded-full tracking-wide">
              Weekly
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-5">Inventory levels across all categories</p>
          <WeeklyBarChart items={medicines} backgroundColor="rgba(8,131,149,0.65)" />
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;