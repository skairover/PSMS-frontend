import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import toast from 'react-hot-toast';
import api from '../services/api';
import WeeklyBarChart from '../Components/WeeklyBarChart';
import {CiPill} from 'react-icons/ci'
import { IoMdTime } from "react-icons/io";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";


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
      <section className="p-6">
        {/* Summary Cards */}
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          <div className="flex-1 bg-white text-gray-700  p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              total medicine <br />
              <p className="text-xl flex justify-center items-center mt-2 text-teal-700"><CiPill/>3000</p>
            </span>
          </div>
          <div className="flex-1 bg-white text-gray-700  p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              Expiring soon <br />
              <p className="text-xl flex justify-center items-center mt-2 text-rose-400"><IoMdTime/>3</p>
            </span>
          </div>
          <div className="flex-1 bg-white text-gray-700  p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              Low stock <br />
              <p className="text-xl flex justify-center items-center mt-2 text-amber-300"><BiSolidCoinStack/>50</p>
            </span>
          </div>
          <div className="flex-1 bg-white text-gray-700  p-5 rounded-xl flex items-center justify-between">
            <span className='text-2xl font-bold '>
              Patients today <br />
              <p className="text-xl flex justify-center items-center mt-2 text-sky-700"><FaUser/>45</p>
            </span>
          </div>
        </div>
      </section>

      {/* Charts */}  

       <section className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 bg-[#F5F5F5] dark:bg-[#181818] rounded-xl p-4 items-center justify-evenly">
          <div className="w-full lg:w-1/2">
            <p className='text-zinc-400 mb-6'>Last Week Incomes</p>
            <WeeklyBarChart
              items={incomes}
              backgroundColor={['rgba(75, 192, 192, 0.6)',  'rgba(227, 255, 255, 0.6)']}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className='text-zinc-400 mb-6'>Last Week Expenses</p>
            <WeeklyBarChart
              items={expenses}
              backgroundColor={['rgba(255, 99, 132, 0.6)', 'rgba(255, 227, 227, 0.6)']}
            />
          </div>
        </div>


      </section>

    </Layout>
  );
}

export default Dashboard;
