import { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from "react-icons/ai"
import { getPatients, createPatient, deletePatient } from '../services/patientServices'

function Emergency() {
  const [showForm, setShowForm] = useState(false)
  const [patients, setPatients] = useState([])

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [condition, setCondition] = useState('')
  const [doctor, setDoctor] = useState('')
  const [arrival, setArrival] = useState('')
  const [priority, setPriority] = useState('')

  const conditions = [
    "Heart attack","Stroke","Severe bleeding","Fracture",
    "Respiratory distress","Allergic reaction","Burn","Seizure",
    "Poisoning","Other"
  ]
  const priorities = ["Critical","High","Medium","Low"]

  useEffect(() => { fetchPatients() }, [])

  const fetchPatients = async () => {
    try { const data = await getPatients(); setPatients(data) }
    catch { toast.error('Failed to load patients') }
  }

  const handleAddPatient = async (e) => {
    e.preventDefault()
    if (!name || !condition || !priority) return toast.error("Required fields missing")
    try {
      const newPatient = await createPatient({ name, age, condition, doctor, arrival, priority })
      setPatients(prev => [...prev, newPatient])
      setName(''); setAge(''); setCondition(''); setDoctor(''); setArrival(''); setPriority('')
      setShowForm(false)
      toast.success("Patient added")
    } catch { toast.error("Failed to add patient") }
  }

  const handleDeletePatient = async (id) => {
    try { await deletePatient(id); setPatients(prev => prev.filter(p => p._id !== id)); toast.success("Patient deleted") }
    catch { toast.error("Delete failed") }
  }

  const formatDate = (isoDate) => isoDate ? new Date(isoDate).toLocaleDateString() : "-"

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-700"
      case "High": return "bg-orange-100 text-orange-700"
      case "Medium": return "bg-yellow-100 text-yellow-700"
      case "Low": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Layout title="Emergency">
      <main className="px-4 sm:px-6 py-8 relative">

        <p className="text-sm text-gray-500 mb-4">Manage urgent cases</p>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          {patients.length === 0 ? (
            <p className="p-10 text-center text-gray-500">No patients yet</p>
          ) : (
            <table className="min-w-[700px] sm:min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Condition</th>
                  <th className="px-4 py-2">Priority</th>
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Arrival</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(pat => (
                  <tr key={pat._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{pat.name}</td>
                    <td className="px-4 py-2">{pat.age || "-"}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{pat.condition}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(pat.priority)}`}>
                        {pat.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2">{pat.doctor || "-"}</td>
                    <td className="px-4 py-2">{formatDate(pat.arrival)}</td>
                    <td className="px-4 py-2 text-center">
                      <AiOutlineDelete
                        onClick={() => handleDeletePatient(pat._id)}
                        className="inline w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white text-2xl rounded-full shadow-lg flex items-center justify-center"
        >
          +
        </button>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md sm:max-w-lg rounded-xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-6">Add Emergency Patient</h2>

              <form onSubmit={handleAddPatient} className="space-y-4">

                <input
                  placeholder="Patient name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    placeholder="Doctor"
                    value={doctor}
                    onChange={e => setDoctor(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  />
                </div>

                <select
                  value={condition}
                  onChange={e => setCondition(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Select condition</option>
                  {conditions.map(c => <option key={c}>{c}</option>)}
                </select>

                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Select priority</option>
                  {priorities.map(p => <option key={p}>{p}</option>)}
                </select>

                <input
                  type="datetime-local"
                  value={arrival}
                  onChange={e => setArrival(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg">Add Patient</button>
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 border py-2 rounded-lg">Cancel</button>
                </div>

              </form>
            </div>
          </div>
        )}

      </main>
    </Layout>
  )
}

export default Emergency