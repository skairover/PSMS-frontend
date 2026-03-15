import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import toast from 'react-hot-toast';
import api from '../services/api';
import WeeklyBarChart from '../Components/WeeklyBarChart';
import {CiPill} from 'react-icons/ci'
import { IoMdTime } from "react-icons/io";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";


function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const totalBalance = totalIncome - totalExpense;

  useEffect(() => {
    const loadData = async () => {
      await fetchIncomes();
      await fetchExpenses();
    };
    loadData();
  }, []);

  const fetchIncomes = async () => {
    try {
      const res = await api.get('/api/incomes');
      const total = res.data.reduce((acc, i) => acc + i.amount, 0);
      setTotalIncome(total);
      setIncomes(res.data);
    } catch (err) {
      toast.error('Failed to fetch incomes');
      console.error('Income fetch error:', err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/api/expenses');
      const total = res.data.reduce((acc, e) => acc + e.amount, 0);
      setTotalExpense(total);
      setExpenses(res.data);
    } catch (err) {
      toast.error('Failed to fetch expenses');
      console.error('Expense fetch error:', err);
    }
  };

  



  return (
    <Layout title="Dashboard">
      <section className="px-6">
        {/* Summary Cards */}
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              total medicine <br />
              <p className="text-xl flex justify-center items-center mt-2 text-teal-700"><CiPill/>3000</p>
            </span>
          </div>
          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              Expiring soon <br />
              <p className="text-xl flex justify-center items-center mt-2 text-rose-400"><IoMdTime/>3</p>
            </span>
          </div>
          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              Low stock <br />
              <p className="text-xl flex justify-center items-center mt-2 text-amber-300"><BiSolidCoinStack/>50</p>
            </span>
          </div>
          <div className="flex-1 bg-white text-gray-700 hover:shadow-lg p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              Patients today <br />
              <p className="text-xl flex justify-center items-center mt-2 text-sky-700"><FaUser/>45</p>
            </span>
          </div>
        </div>
      </section>



      <section className='  grid grid-cols-[2fr_3fr] gap-4 px-6 pt-4'>
        <div className=' bg-white rounded-xl flex flex-col justify-start items-center px-10 font-syne'>
          <h2 className='text-sky-500'>
            Scan CHIFFA Card
          </h2>
          <button className=' bg-sky-700 flex text-center gap-2 justify-center items-center hover:bg-sky-800 transition delay-150 duration-300 hover:scale-102 text-white w-full font-syne'>
             <MdOutlineDocumentScanner/>Scan Card
          </button>
          <p className='text-xs text-gray-500 my-4'>place the card on the reader</p>

        </div>
        <div className=' bg-white rounded-xl px-4 py-3'>
          <h4 className=' text-base underline mb-[1em] font-bold font-syne'>Quick actions</h4>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <button className='bg-cyan-50 flex justify-start items-center gap-2 hover:-translate-y-1 hover:bg-cyan-100 transition delay-50 duration-300'><FaCirclePlus className=''/>add medicine</button>
            <button className='bg-cyan-50 flex justify-start items-center gap-2 hover:-translate-y-1 hover:bg-cyan-100 transition delay-50 duration-300'><FaCirclePlus />check drug interactions</button>
            <button className='bg-cyan-50 flex justify-start items-center gap-2 hover:-translate-y-1 hover:bg-cyan-100 transition delay-50 duration-300'><FaCirclePlus />dispence medicine</button>
            <button className='bg-cyan-50 flex justify-start items-center gap-2 hover:-translate-y-1 hover:bg-cyan-100 transition delay-50 duration-300'><FaCirclePlus />add new patient</button>

          </div>

        </div>



      </section>


      {/* Charts */}  

       <section className="p-6">
        <div className="flex flex-col bg-[#F5F5F5] rounded-xl p-4 items-center justify-evenly">
          <div className="w-full">
            <p className='text-zinc-600 mb-6'>Statistics Overview</p>
            <WeeklyBarChart
              items={incomes}
              backgroundColor={['rgba(75, 192, 192, 0.6)',  'rgba(227, 255, 255, 0.6)']}
            />
          </div>
        </div>

      </section>

    </Layout>
  );
}

export default Dashboard;
