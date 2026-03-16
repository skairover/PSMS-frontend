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

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => { fetchMedicines() }, []);

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
          onScan={(data) => console.log("QR DATA:", data)}
        />
      )}

      {/* Summary Cards */}
      <section className="px-4 sm:px-6 mb-6">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Total Medicine
              <p className="text-xl flex justify-center items-center mt-2 text-teal-700">
                <CiPill />{medicines.length}
              </p>
            </span>
          </div>

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Expiring Soon
              <p className="text-xl flex justify-center items-center mt-2 text-rose-400">
                <IoMdTime />3
              </p>
            </span>
          </div>

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Low Stock
              <p className="text-xl flex justify-center items-center mt-2 text-amber-300">
                <BiSolidCoinStack />50
              </p>
            </span>
          </div>

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Patients Today
              <p className="text-xl flex justify-center items-center mt-2 text-sky-700">
                <FaUser />45
              </p>
            </span>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 px-4 sm:px-6 mb-6'>

        <div className='bg-white rounded-xl flex flex-col sm:flex-row justify-start items-center px-6 py-4 sm:py-6 font-syne gap-4'>
          <div className="flex-1">
            <h2 className='text-sky-500 mb-2'>Scan CHIFFA Card</h2>
            <p className='text-xs text-gray-500 mb-4'>Place the card on the reader</p>
            <button onClick={() => setShowScanner(true)} className='bg-sky-700 flex gap-2 justify-center items-center hover:bg-sky-800 transition duration-300 text-white w-full sm:w-auto px-4 py-2 rounded-lg'>
              <MdOutlineDocumentScanner />Scan Card
            </button>
          </div>
        </div>

        <div className='bg-white rounded-xl px-4 py-3'>
          <h4 className='text-base underline mb-4 font-bold font-syne'>
            Quick actions
          </h4>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <Link to='/pharmacy' className='bg-cyan-50 flex px-3 py-4 items-center gap-2 hover:bg-cyan-100 transition rounded-lg'>
              <FaCirclePlus />Add Medicine
            </Link>

            <Link className='bg-cyan-50 flex px-3 py-4 items-center gap-2 hover:bg-cyan-100 transition rounded-lg'>
              <FaCirclePlus />Check Drug Interactions
            </Link>

            <Link to='/dashboard' className='bg-cyan-50 flex px-3 py-4 items-center gap-2 hover:bg-cyan-100 transition rounded-lg'>
              <FaCirclePlus />Dispense Medicine
            </Link>

            <Link to='/emergency' className='bg-cyan-50 flex px-3 py-4 items-center gap-2 hover:bg-cyan-100 transition rounded-lg'>
              <FaCirclePlus />Add New Patient
            </Link>
          </div>
        </div>

      </section>

      {/* Chart */}
      <section className="px-4 sm:px-6 mb-6">
        <div className="flex flex-col bg-[#F5F5F5] rounded-xl p-4 items-center justify-evenly">
          <div className="w-full">
            <p className='text-zinc-600 mb-6'>Medicine Stock Overview</p>
            <WeeklyBarChart items={medicines} backgroundColor="rgba(75, 192, 192, 0.6)" />
          </div>
        </div>
      </section>

    </Layout>
  );
}

export default Dashboard;