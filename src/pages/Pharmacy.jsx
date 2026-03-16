import { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from "react-icons/ai"
import { getMedicines, createMedicine, deleteMedicine } from '../services/medicineServices'

function Pharmacy() {

  const [showForm, setShowForm] = useState(false)
  const [medicines, setMedicines] = useState([])

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [expDate, setExpDate] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const categories = [
    'Analgesics','Antibiotics','Antipyretics','Anti-inflammatory',
    'Antihistamines','Antacids','Cardiovascular','Diabetes',
    'Respiratory','Vitamins','Vaccines','Herbal'
  ]

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    try {
      const data = await getMedicines()
      setMedicines(data)
    } catch (err) {
      console.error(err)
      toast.error('Failed to load medicines')
    }
  }

  const handleAddMedicine = async (e) => {
    e.preventDefault()

    if (!name || !category || !expDate || !quantity) {
      toast.error("Fill all required fields")
      return
    }

    try {
      const newMedicine = await createMedicine({
        name,
        category,
        expDate,
        quantity,
        price
      })

      setMedicines(prev => [...prev, newMedicine])

      setName('')
      setCategory('')
      setExpDate('')
      setQuantity('')
      setPrice('')

      setShowForm(false)

      toast.success("Medicine added")

    } catch (err) {
      toast.error("Failed to add medicine")
    }
  }

  const handleDeleteMedicine = async (id) => {
    try {
      await deleteMedicine(id)
      setMedicines(prev => prev.filter(m => m._id !== id))
      toast.success("Medicine deleted")
    } catch {
      toast.error("Delete failed")
    }
  }

  const formatDate = (isoDate) => {
    const d = new Date(isoDate)
    return d.toLocaleDateString()
  }

  return (
    <Layout title="Pharmacy">

      <main className="relative px-6 py-8 ">

        {/* PAGE TITLE */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Manage medicines in stock
          </p>
        </div>


        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {medicines.length === 0 ? (

            <p className="p-10 text-center text-gray-500">
              No medicines yet
            </p>

          ) : (

            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b">

                <tr className="text-left text-gray-600">

                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Exp Date</th>
                  <th className="px-6 py-3">Added</th>
                  <th className="px-6 py-3 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {medicines.map((med) => (

                  <tr
                    key={med._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-3">

                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {med.category}
                      </span>

                    </td>

                    <td className="px-6 py-3 font-medium text-gray-800">
                      {med.name}
                    </td>

                    <td className="px-6 py-3">
                      {med.price ? `$${med.price}` : "-"}
                    </td>

                    <td className="px-6 py-3">
                      {med.quantity}
                    </td>

                    <td className="px-6 py-3">
                      {med.expDate ? formatDate(med.expDate) : "-"}
                    </td>

                    <td className="px-6 py-3 text-gray-500">
                      {formatDate(med.createdAt)}
                    </td>

                    <td className="px-6 py-3 text-center">

                      <AiOutlineDelete
                        onClick={() => handleDeleteMedicine(med._id)}
                        className="inline w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>


        {/* FLOAT BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white text-2xl rounded-full shadow-lg flex items-center justify-center transition"
        >
          +
        </button>


        {/* MODAL */}
        {showForm && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

              <h2 className="text-lg font-semibold mb-6">
                Add Medicine
              </h2>

              <form
                onSubmit={handleAddMedicine}
                className="space-y-4"
              >

                <input
                  placeholder="Medicine name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />

                <select
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >

                  <option value="">Select category</option>

                  {categories.map(c => (
                    <option key={c}>{c}</option>
                  ))}

                </select>

                <input
                  type="date"
                  value={expDate}
                  onChange={(e)=>setExpDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  />

                </div>

                <div className="flex gap-3 pt-2">

                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg"
                  >
                    Add
                  </button>

                  <button
                    type="button"
                    onClick={()=>setShowForm(false)}
                    className="flex-1 border py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </main>

    </Layout>
  )
}

export default Pharmacy