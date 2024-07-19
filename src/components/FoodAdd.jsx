import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { categories } from '../utils/categories'
import FoodsService from '../services/foodsService'

const FoodAdd = ({ isOpen, onClose, onSave, initialFood }) => {
	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [subcategory, setSubcategory] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (isOpen && initialFood) {
			setIsEditing(true)
			setImage(initialFood.image || '')
			setName(initialFood.name || '')
			setPrice(initialFood.price || '')
			setCategory(initialFood.category || '')
			setSubcategory(initialFood.subcategory || '')
		} else {
			setIsEditing(false)
			setImage('')
			setName('')
			setPrice('')
			setCategory('')
			setSubcategory('')
		}
	}, [isOpen, initialFood])

	const handleImageUpload = async e => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'tedgqry3') // Your upload preset name

		try {
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/dj3epjudt/image/upload',
				formData
			)
			setImage(res.data.secure_url)
		} catch (error) {
			alert('Рассм юклашда хатолик: ' + error.message)
			console.log(error.response?.data)
		}
	}

	const handleSave = async () => {
		const newFoodItem = {
			img: image,
			name,
			price,
			category,
			subcategory,
		}

		try {
			let res
			if (isEditing) {
				res = await FoodsService.updateFood(initialFood._id, newFoodItem)
			} else {
				res = await FoodsService.addFood(newFoodItem)
			}
			onSave(res)
		} catch (error) {
			alert(error.response?.data || 'Тамақ сақлашда хатолик')
		}
	}

	const handleCategoryChange = e => {
		setCategory(e.target.value)
		setSubcategory('') // Reset subcategory when category changes
	}

	const subcategories =
		categories.find(cat => cat.id === category)?.subcategories || []

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-5'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-full max-h-[calc(100vh-40px)] overflow-auto'>
				<h2 className='text-2xl font-bold mb-4'>
					{isEditing ? 'Тамақни таҳрирлаш' : 'Янги тамақ қўшиш'}
				</h2>
				<form>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Категория</label>
						<select
							value={category}
							onChange={handleCategoryChange}
							className='w-full border rounded-lg p-2'
						>
							<option value=''>Категория танланг</option>
							{categories.map(cat => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					{category && subcategories.length > 0 && (
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-2'>
								Ошхонани танланг
							</label>
							<select
								value={subcategory}
								onChange={e => setSubcategory(e.target.value)}
								className='w-full border rounded-lg p-2'
							>
								<option value=''>Ошхонани танланг</option>
								{subcategories.map(sub => (
									<option key={sub.id} value={sub.id}>
										{sub.name}
									</option>
								))}
							</select>
						</div>
					)}
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>
							Рассм юклаш
						</label>
						<input
							type='file'
							onChange={handleImageUpload}
							className='w-full border rounded-lg p-2'
						/>
						{image && (
							<img
								src={image}
								alt='Food'
								className='mt-4 w-32 h-32 object-cover'
							/>
						)}
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Номи</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-full border rounded-lg p-2'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Нархи</label>
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
							Сақлаш
						</button>
						<button
							type='button'
							onClick={onClose}
							className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
						>
							Бекор қилиш
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FoodAdd
