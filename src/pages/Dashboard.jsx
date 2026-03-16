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

  useEffect(() => {
    fetchMedicines();
  }, []);

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
            onScan={(data) => {
              console.log("QR DATA:", data);
            }}
          />
        )}
      {/* Summary Cards */}
      <section className="px-6">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              total medicine
              <p className="text-xl flex justify-center items-center mt-2 text-teal-700">
                <CiPill />{medicines.length}
              </p>
            </span>
          </div>

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Expiring soon
              <p className="text-xl flex justify-center items-center mt-2 text-rose-400">
                <IoMdTime />3
              </p>
            </span>
          </div>

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Low stock
              <p className="text-xl flex justify-center items-center mt-2 text-amber-300">
                <BiSolidCoinStack />50
              </p>
            </span>
          </div>

          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold'>
              Patients today
              <p className="text-xl flex justify-center items-center mt-2 text-sky-700">
                <FaUser />45
              </p>
            </span>
          </div>

        </div>
      </section>

      {/* Actions */}
      <section className='grid grid-cols-[2fr_3fr] gap-4 px-6 pt-4'>

        <div className='bg-white rounded-xl flex flex-col justify-start items-center px-10 font-syne'>
          <h2 className='text-sky-500'>
            Scan CHIFFA Card
          </h2>

          <button onClick={() => setShowScanner(true)} className='bg-sky-700 flex gap-2 justify-center items-center hover:bg-sky-800 transition duration-300 text-white w-full'>
            <MdOutlineDocumentScanner />Scan Card
          </button>

          <p className='text-xs text-gray-500 my-4'>
            place the card on the reader
          </p>
        </div>

        <div className='bg-white rounded-xl px-4 py-3'>
          <h4 className='text-base underline mb-4 font-bold font-syne'>
            Quick actions
          </h4>

          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Link to='/pharmacy' className='bg-cyan-50 flex px-[0.6em] py-[1.2em] items-center gap-2 hover:bg-cyan-100 transition'>
              <FaCirclePlus />add medicine
            </Link>

            <Link className='bg-cyan-50 flex px-[0.6em] py-[1.2em] items-center gap-2 hover:bg-cyan-100 transition'>
              <FaCirclePlus />check drug interactions
            </Link>

            <Link to='/dashboard' className='bg-cyan-50 flex px-[0.6em] py-[1.2em] items-center gap-2 hover:bg-cyan-100 transition'>
              <FaCirclePlus />dispense medicine
            </Link>

            <Link to='/emergency' className='bg-cyan-50 flex px-[0.6em] py-[1.2em] items-center gap-2 hover:bg-cyan-100 transition'>
              <FaCirclePlus />add new patient
            </Link>
            
          </div>
        </div>

      </section>

      {/* Chart */}
      <section className="p-6">
        <div className="flex flex-col bg-[#F5F5F5] rounded-xl p-4 items-center justify-evenly">

          <div className="w-full">
            <p className='text-zinc-600 mb-6'>
              Medicine Stock Overview
            </p>

            <WeeklyBarChart
              items={medicines}
              backgroundColor="rgba(75, 192, 192, 0.6)"
            />

          </div>

        </div>
      </section>

    </Layout>
  );
}

export default Dashboard;