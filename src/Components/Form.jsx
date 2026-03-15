import React, { useState } from 'react';

function Form({ onAdd, type }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [expDate, setExpDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !expDate || !quantity) return;
    onAdd({ name, category, expDate, quantity, price });
    setName('');
    setCategory('');
    setExpDate('');
    setQuantity(0);
    setPrice(0);
  };

 const categories = [
  'Analgesics', 'Antibiotics', 'Antipyretics', 'Anti-inflammatory',
  'Antihistamines', 'Antacids', 'Cardiovascular', 'Diabetes',
  'Respiratory', 'Vitamins', 'Vaccines', 'Herbal'
];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-black px-6 py-4 rounded-xl">
        <label htmlFor="name" className=''>Name</label>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        className="p-3  dark:bg-gray-300  rounded-xl border border-gray-300 m-1"
        onChange={(e) => setName(e.target.value)}
      />
    <label htmlFor="category" className=''>Category</label>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3  dark:bg-gray-300 rounded-xl border border-gray-300 m-1"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option className='dark:bg-gray-300' key={cat} value={cat}>{cat}</option>
        ))}
      </select>
        <label htmlFor="expDate" className=''>Exp Date</label>
      <input 
        type='date'
        name="expDate"
        value={expDate}
        onChange={(e) => setExpDate(e.target.value)}
        className="p-3  dark:bg-gray-300 rounded-xl border border-gray-300 m-1">
    
      </input>
        <label htmlFor="quantity" className=''>Quantity</label>
    <input
        type='number'
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="p-3  dark:bg-gray-300 rounded-xl border border-gray-300 m-1">
      </input>
        <label htmlFor="price" className=''>Price</label>
      <input
        type="number"
        name='price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="p-3  dark:bg-gray-300 rounded-xl border border-gray-300 m-1">
      </input>

      <button
        type="submit"
        className="bg-[#0B2027]  dark:bg-[#40798C] dark:hover:bg-[#0B2027] transition delay-150 duration-300 ease-in-out text-white rounded-xl m-1 py-[0.6em] px-[1.2em]"
      >
        Add {type}
      </button>
    </form>
  );
}

export default Form;
