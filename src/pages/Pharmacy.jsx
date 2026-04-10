import { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from "react-icons/ai"
import { MdOutlineLocalPharmacy, MdClose } from "react-icons/md"
import { getMedicines, createMedicine, deleteMedicine } from '../services/medicineServices'

const categories = [
  'Analgesics','Antibiotics','Antipyretics','Anti-inflammatory',
  'Antihistamines','Antacids','Cardiovascular','Diabetes',
  'Respiratory','Vitamins','Vaccines','Herbal'
]

const inputClass =
  "w-full bg-[#F7FBFC] border border-[#daeef2] focus:border-[#37B7C3] focus:ring-2 focus:ring-[#37B7C3]/20 focus:outline-none text-[#071952] placeholder-slate-400 text-sm px-4 py-3 rounded-xl transition-all duration-200"

function isExpiringSoon(isoDate) {
  if (!isoDate) return false
  const diff = new Date(isoDate) - new Date()
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30
}

function isExpired(isoDate) {
  if (!isoDate) return false
  return new Date(isoDate) < new Date()
}

function Pharmacy() {
  const [showForm, setShowForm] = useState(false)
  const [medicines, setMedicines] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [expDate, setExpDate] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => { fetchMedicines() }, [])

  const fetchMedicines = async () => {
    try { const data = await getMedicines(); setMedicines(data) }
    catch { toast.error('Failed to load medicines') }
  }

  const handleAddMedicine = async (e) => {
    e.preventDefault()
    if (!name || !category || !expDate || !quantity) return toast.error("Fill all required fields")
    try {
      const newMedicine = await createMedicine({ name, category, expDate, quantity, price })
      setMedicines(prev => [...prev, newMedicine])
      setName(''); setCategory(''); setExpDate(''); setQuantity(''); setPrice('')
      setShowForm(false)
      toast.success("Medicine added")
    } catch { toast.error("Failed to add medicine") }
  }

  const handleDeleteMedicine = async (id) => {
    try {
      await deleteMedicine(id)
      setMedicines(prev => prev.filter(m => m._id !== id))
      toast.success("Medicine deleted")
    } catch { toast.error("Delete failed") }
  }

  const formatDate = (isoDate) => isoDate ? new Date(isoDate).toLocaleDateString() : "—"

  const expiredCount = medicines.filter(m => isExpired(m.expDate)).length
  const expiringSoonCount = medicines.filter(m => isExpiringSoon(m.expDate)).length

  return (
    <Layout title="Pharmacy">
      <div className="px-4 sm:px-6 py-6 space-y-5">

        {/* ── Page Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#088395] mb-0.5">Inventory</p>
            <p className="text-sm text-slate-400">Manage medicines in stock</p>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-[#EBF4F6] border border-[#daeef2] text-[#088395] text-xs font-semibold px-3 py-2 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#37B7C3]" />
              {medicines.length} Total
            </div>
            {expiringSoonCount > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-semibold px-3 py-2 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {expiringSoonCount} Expiring Soon
              </div>
            )}
            {expiredCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-3 py-2 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {expiredCount} Expired
              </div>
            )}
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Card header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EBF4F6] flex items-center justify-center">
              <MdOutlineLocalPharmacy size={18} color="#088395" />
            </div>
            <span className="font-bold text-[#071952] text-sm">Medicine Stock</span>
          </div>

          {medicines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                <MdOutlineLocalPharmacy size={28} color="#cbd5e1" />
              </div>
              <p className="text-sm font-semibold text-slate-400">No medicines yet</p>
              <p className="text-xs text-slate-300 mt-1">Click the + button to add a medicine</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[640px] sm:min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Category','Name','Price','Qty','Exp Date','Added','Action'].map(h => (
                      <th key={h} className={`px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-slate-400 ${h === 'Action' ? 'text-center' : 'text-left'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {medicines.map(med => {
                    const expired = isExpired(med.expDate)
                    const expiring = isExpiringSoon(med.expDate)
                    return (
                      <tr key={med._id} className="hover:bg-slate-50/60 transition-colors duration-100">
                        <td className="px-5 py-3.5">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#EBF4F6] text-[#088395]">
                            {med.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-[#071952]">{med.name}</td>
                        <td className="px-5 py-3.5 text-slate-500">{med.price ? `$${med.price}` : "—"}</td>
                        <td className="px-5 py-3.5">
                          <span className={`font-semibold ${med.quantity < 10 ? 'text-amber-500' : 'text-[#071952]'}`}>
                            {med.quantity}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          {med.expDate ? (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                              expired   ? 'bg-red-50 text-red-500 border border-red-100' :
                              expiring  ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                          'text-slate-500'
                            }`}>
                              {formatDate(med.expDate)}
                            </span>
                          ) : "—"}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-400">{formatDate(med.createdAt)}</td>
                        <td className="px-5 py-3.5 text-center">
                          <button
                            onClick={() => handleDeleteMedicine(med._id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                          >
                            <AiOutlineDelete size={17} color='ffffff' />
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
        className="fixed bottom-7 right-7 w-14 h-14 bg-gradient-to-br from-[#071952] to-[#088395] hover:from-[#088395] hover:to-[#37B7C3] text-white text-2xl font-light rounded-2xl shadow-lg shadow-[#088395]/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#088395]/40"
      >
        +
      </button>

      {/* ── MODAL ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl shadow-[#071952]/15 overflow-hidden">

            {/* Modal header */}
            <div className="relative bg-gradient-to-r from-[#071952] to-[#088395] px-7 py-5 flex items-center justify-between overflow-hidden">
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#37B7C3]/20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-base font-bold text-white">Add Medicine</h2>
                <p className="text-xs text-white/60 mt-0.5">Fill in the medicine details below</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="relative z-10 w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all duration-150"
              >
                <MdClose size={17} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleAddMedicine} className="px-7 py-6 space-y-4">

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Medicine Name *</label>
                <input placeholder="e.g. Paracetamol 500mg" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Expiry Date *</label>
                <input type="date" value={expDate} onChange={e => setExpDate(e.target.value)} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Quantity *</label>
                  <input type="number" placeholder="e.g. 100" value={quantity} onChange={e => setQuantity(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#071952] mb-1.5">Price</label>
                  <input type="number" placeholder="e.g. 4.99" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} />
                </div>
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
                  Add Medicine
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </Layout>
  )
}

export default Pharmacy