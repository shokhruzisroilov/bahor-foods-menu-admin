import React, { useState, useEffect } from 'react'
import { categories } from '../utils/categories'
import FoodsService from '../services/foodsService'

const FoodAdd = ({ isOpen, onClose, onSave, initialFood }) => {
	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (isOpen && initialFood) {
			setIsEditing(true)
			setImage(initialFood.image || '')
			setName(initialFood.name || '')
			setPrice(initialFood.price || '')
			setCategory(initialFood.category || '')
		} else {
			setIsEditing(false)
			setImage('')
			setName('')
			setPrice('')
			setCategory('')
		}
	}, [isOpen, initialFood])

	const handleSave = async () => {
		const newFoodItem = {
			img: image,
			name,
			price,
			category,
		}

		try {
			let res
			if (isEditing) {
				// Agar o'zgartirish bo'lsa, `updateFood` metodidan foydalaning
				res = await FoodsService.updateFood(initialFood._id, newFoodItem)
			} else {
				// Yangi oziq-ovqat qo'shish
				res = await FoodsService.addFood(newFoodItem)
			}
			onSave(res) // Yangi oziq-ovqat ma'lumotini onSave orqali uzatish
		} catch (error) {
			alert(error.response?.data || 'Taomni saqlashda xatolik yuz berdi')
		}
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-5'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-full max-h-[calc(100vh-40px)] overflow-auto'>
				<h2 className='text-2xl font-bold mb-4'>
					{isEditing ? 'Taomni tahrirlash' : 'Yangi taom qo‘shish'}
				</h2>
				<form>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Kategoriya</label>
						<select
							value={category}
							onChange={e => setCategory(e.target.value)}
							className='w-full border rounded-lg p-2'
						>
							<option value=''>Kategoriya tanlang</option>
							{categories.map(cat => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Rasm URL</label>
						<input
							type='text'
							value={image}
							onChange={e => setImage(e.target.value)}
							className='w-full border rounded-lg p-2'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Nom</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-full border rounded-lg p-2'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Narx</label>
						<input
							type='text'
							value={price}
							onChange={e => setPrice(e.target.value)}
							className='w-full border rounded-lg p-2'
						/>
					</div>

					<div className='flex justify-end'>
						<button
							type='button'
							onClick={handleSave}
							className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2'
						>
							Saqlash
						</button>
						<button
							type='button'
							onClick={onClose}
							className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
						>
							Bekor qilish
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FoodAdd
