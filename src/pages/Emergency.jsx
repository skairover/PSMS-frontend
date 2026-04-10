import { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineEmergency, MdClose } from "react-icons/md"
import { getPatients, createPatient, deletePatient } from '../services/patientServices'

const conditions = [
  "Heart attack","Stroke","Severe bleeding","Fracture",
  "Respiratory distress","Allergic reaction","Burn","Seizure",
  "Poisoning","Other"
]
const priorities = ["Critical","High","Medium","Low"]

const priorityStyles = {
  Critical: { pill: "bg-red-50 text-red-600 border border-red-200",   dot: "bg-red-500"    },
  High:     { pill: "bg-orange-50 text-orange-600 border border-orange-200", dot: "bg-orange-500" },
  Medium:   { pill: "bg-amber-50 text-amber-600 border border-amber-200",  dot: "bg-amber-400"  },
  Low:      { pill: "bg-emerald-50 text-emerald-600 border border-emerald-200", dot: "bg-emerald-500" },
}

const inputClass =
  "w-full bg-[#F7FBFC] border border-[#daeef2] focus:border-[#37B7C3] focus:ring-2 focus:ring-[#37B7C3]/20 focus:outline-none text-[#071952] placeholder-slate-400 text-sm px-4 py-3 rounded-xl transition-all duration-200"

function Emergency() {
  const [showForm, setShowForm] = useState(false)
  const [patients, setPatients] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [condition, setCondition] = useState('')
  const [doctor, setDoctor] = useState('')
  const [arrival, setArrival] = useState('')
  const [priority, setPriority] = useState('')

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
    try {
      await deletePatient(id)
      setPatients(prev => prev.filter(p => p._id !== id))
      toast.success("Patient deleted")
    } catch { toast.error("Delete failed") }
  }

  const formatDate = (isoDate) => isoDate ? new Date(isoDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : "—"

  return (
    <Layout title="Emergency">
      <div className="px-4 sm:px-6 py-6 space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#088395] mb-0.5">Ward</p>
            <p className="text-sm text-slate-400">Manage and track urgent patient cases</p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-3 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {patients.length} Active Case{patients.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Table header row */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                <MdOutlineEmergency size={18} color="#ef4444" />
              </div>
              <span className="font-bold text-[#071952] text-sm">Patient List</span>
            </div>
          </div>

          {patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                <MdOutlineEmergency size={28} color="#cbd5e1" />
              </div>
              <p className="text-sm font-semibold text-slate-400">No patients yet</p>
              <p className="text-xs text-slate-300 mt-1">Click the + button to add an emergency case</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[700px] sm:min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Name','Age','Condition','Priority','Doctor','Arrival','Action'].map(h => (
                      <th key={h} className={`px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-slate-400 ${h === 'Action' ? 'text-center' : 'text-left'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {patients.map(pat => {
                    const ps = priorityStyles[pat.priority] || { pill: "bg-slate-100 text-slate-600 border border-slate-200", dot: "bg-slate-400" }
                    return (
                      <tr key={pat._id} className="hover:bg-slate-50/60 transition-colors duration-100">
                        <td className="px-5 py-3.5 font-semibold text-[#071952]">{pat.name}</td>
                        <td className="px-5 py-3.5 text-slate-500">{pat.age || "—"}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2.5 py-1 text-xs rounded-lg bg-[#EBF4F6] text-[#088395] font-medium">
                            {pat.condition}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg font-semibold ${ps.pill}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
                            {pat.priority}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">{pat.doctor || "—"}</td>
                        <td className="px-5 py-3.5 text-slate-500 text-xs">{formatDate(pat.arrival)}</td>
                        <td className="px-5 py-3.5 text-center">
                          <button
                            onClick={() => handleDeletePatient(pat._id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                          >
                            <AiOutlineDelete size={17} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-7 right-7 w-13 h-13 w-14 h-14 bg-gradient-to-br from-[#071952] to-[#088395] hover:from-[#088395] hover:to-[#37B7C3] text-white text-2xl font-light rounded-2xl shadow-lg shadow-[#088395]/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#088395]/40"
      >
        +
      </button>

      {/* ── MODAL ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl shadow-[#071952]/15 overflow-hidden">

            {/* Modal header */}
            <div className="relative bg-gradient-to-r from-[#071952] to-[#088395] px-7 py-5 flex items-center justify-between">
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#37B7C3]/20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-base font-bold text-white">Add Emergency Patient</h2>
                <p className="text-xs text-white/60 mt-0.5">Fill in the patient details below</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="relative z-10 w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all duration-150"
              >
                <MdClose size={17} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleAddPatient} className="px-7 py-6 space-y-4">

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Patient Name *</label>
                <input placeholder="e.g. Ahmed Benali" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Age</label>
                  <input type="number" placeholder="e.g. 45" value={age} onChange={e => setAge(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Doctor</label>
                  <input placeholder="Attending doctor" value={doctor} onChange={e => setDoctor(e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Condition *</label>
                <select value={condition} onChange={e => setCondition(e.target.value)} className={inputClass}>
                  <option value="">Select condition</option>
                  {conditions.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Priority *</label>
                <select value={priority} onChange={e => setPriority(e.target.value)} className={inputClass}>
                  <option value="">Select priority</option>
                  {priorities.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Arrival Time</label>
                <input type="datetime-local" value={arrival} onChange={e => setArrival(e.target.value)} className={inputClass} />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-[#daeef2] hover:border-slate-300 text-slate-500 hover:text-[#071952] text-sm font-medium py-3 rounded-xl transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#071952] to-[#088395] hover:from-[#088395] hover:to-[#37B7C3] text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#088395]/30 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Add Patient
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </Layout>
  )
}

export default Emergency