import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import Form from '../Components/Form';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from "react-icons/ai";
import { getPatients, createPatient, deletePatient } from '../services/patientServices';

function Emergency() {
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : '';
  }, [showForm]);

  const fetchPatients = async () => {
  try {
    const data = await getPatients();
    if (!Array.isArray(data)) throw new Error('Expected array but got ' + typeof data);
    setPatients(data);
  } catch (err) {
    console.error('Error fetching patients:', err.message || err);
    toast.error('Failed to load patients');
  }
};


  const handleAddPatient = async (patient) => {
    try {
      const newPatient = await createPatient(patient);
      setPatients((prev) => [...prev, newPatient]);
    } catch (err) {
      console.error("Add patient error:", err.response?.data || err.message);
      toast.error("Failed to add patient");
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((med) => med._id !== id));
      toast.success('Patient deleted');
    } catch (err) {
      console.error('Delete failed', err.response?.data || err.message);
      toast.error('Failed to delete patient');
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Layout title="Emergency" >
         
            
            <main className="flex-1 text-black min-h-full bg-[--bg] relative">
              {showForm && (
                <div className="absolute inset-0 flex justify-center items-center z-20">
                  <div className=" bg-white rounded-xl shadow-xl z-50">
                    <Form
                      type={'patient'}
                      onAdd={(patient) => {
                        handleAddPatient(patient);
                        setShowForm(false);
                      }}
                    />
                    
                    <button
                      onClick={() => setShowForm(false)}
                      className=" text-red-900 py-[0.6em] px-[1.2em]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
    
              <button
                onClick={() => setShowForm(true)}
                className="text-white dark:text-black font-black z-50 mb-6 mr-6 bg-[#40798C] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#305B69] rounded-full w-12 h-12 flex items-center justify-center fixed right-4 bottom-4 sm:right-8 sm:bottom-8"
              >
                +
              </button>
    
<section className="mt-6 overflow-x-auto">
  {patients.length === 0 ? (
    <p className="text-gray-600 text-center py-10">No patients yet.</p>
  ) : (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Category</th>
          <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
          <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Price</th>
          <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Quantity</th>
          <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Exp Date</th>
          <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Added On</th>
          <th className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {patients.map((pat) => (
          <tr key={pat._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
              <span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                {pat.category}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{pat.name}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{pat.price ? `$${patients.price}` : '-'}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{pat.quantity}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{pat.expDate ? formatDate(pat.expDate) : '-'}</td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">{formatDate(pat.createdAt)}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <AiOutlineDelete
                className="w-6 h-6 p-1 rounded-lg cursor-pointer hover:bg-red-200 dark:hover:bg-red-700 transition duration-200 ease-in-out"
                onClick={() => handleDeletePatient(pat._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</section>
            </main>
          
          </Layout>
  );
}

export default Emergency;
