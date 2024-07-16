import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { categories } from '../utils/categories'
import FoodsService from '../services/foodsService'

const FoodEdit = ({ isOpen, onClose, onSave, initialFood, getFoods }) => {
	const [img, setImg] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (isOpen && initialFood) {
			setIsEditing(true)
			setImg(initialFood.img || '') // Use 'img' for the image URL
			setName(initialFood.name || '')
			setPrice(initialFood.price || '')
			setCategory(initialFood.category || '')
		} else {
			setIsEditing(false)
			setImg('') // Clear image URL
			setName('')
			setPrice('')
			setCategory('')
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
			setImg(res.data.secure_url)
		} catch (error) {
			alert('Image upload error: ' + error.message)
			console.log(error.response?.data)
		}
	}

	const handleSave = async () => {
		const updatedFoodItem = {
			img,
			name,
			price,
			category,
		}

		try {
			await FoodsService.updateFood(initialFood._id, updatedFoodItem)
			onSave() // Notify parent component of the successful update
			getFoods() // Refresh the list of foods
		} catch (error) {
			alert(error.response?.data || 'Error updating food')
			console.log(error.response?.data)
		}
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-5'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-full max-h-[calc(100vh-40px)] overflow-auto'>
				<h2 className='text-2xl font-bold mb-4'>
					{isEditing ? 'Edit Food' : 'Add New Food'}
				</h2>
				<form>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Category</label>
						<select
							value={category}
							onChange={e => setCategory(e.target.value)}
							className='w-full border rounded-lg p-2'
						>
							<option value=''>Select Category</option>
							{categories.map(cat => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>
							Upload Image
						</label>
						<input
							type='file'
							onChange={handleImageUpload}
							className='w-full border rounded-lg p-2'
						/>
						{img && (
							<div className='mt-2'>
								<img
									src={img}
									alt='Food preview'
									className='w-full h-auto max-h-64 object-cover border rounded-lg'
								/>
							</div>
						)}
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Name</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-full border rounded-lg p-2'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>Price</label>
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
							Save
						</button>
						<button
							type='button'
							onClick={onClose}
							className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FoodEdit
