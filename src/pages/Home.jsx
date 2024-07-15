import React, { useEffect, useState } from 'react'
import { categories } from '../utils/categories'
import ProductItem from '../components/ProductItem'
import FoodsService from '../services/foodsService'
import FoodAdd from '../components/FoodAdd'
import FoodEdit from '../components/FoodEdit'

const Home = () => {
	const [foodsData, setFoodsData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [editModalOpen, setEditModalOpen] = useState(false)
	const [currentFood, setCurrentFood] = useState(null)

	const getFoods = async () => {
		try {
			const data = await FoodsService.getFoods()
			if (Array.isArray(data)) {
				setFoodsData(data)
			} else {
				console.error('Data is not in expected format:', data)
			}
		} catch (err) {
			setError(err.message || 'Failed to fetch foods')
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getFoods()
	}, [])

	const handleSave = newFoodItem => {
		setFoodsData(prevFoods => [...prevFoods, newFoodItem])
		setModalOpen(false)
	}

	const handleEdit = foodItem => {
		setCurrentFood(foodItem)
		setEditModalOpen(true)
	}

	const handleDelete = async id => {
		try {
			await FoodsService.deleteFood(id)
			setFoodsData(prevFoods => prevFoods.filter(food => food._id !== id))
		} catch (err) {
			setError(err.message || 'Failed to delete food')
		}
	}

	const handleUpdate = () => {
		setEditModalOpen(false)
		setCurrentFood(null)
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				Loading...
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				Error: {error}
			</div>
		)
	}

	return (
		<div className='py-10'>
			<div className='text-center mb-6'>
				<button
					className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 fixed bottom-4 right-4 z-50'
					onClick={() => setModalOpen(true)}
				>
					+
				</button>
			</div>
			{categories.map(category => (
				<div key={category.id} id={category.id} className='pt-[100px]'>
					<h2 className='pb-8 px-4 text-[#2b191] font-cormorant font-[800] text-2xl'>
						{category.name}
					</h2>
					<div className='foods-grid grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4'>
						{foodsData
							.filter(food => food?.category === category.id)
							.map(filteredFood => (
								<ProductItem
									key={filteredFood._id}
									filteredFood={filteredFood}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							))}
					</div>
				</div>
			))}
			<FoodAdd
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={handleSave}
			/>
			{currentFood && (
				<FoodEdit
					isOpen={editModalOpen}
					onClose={() => setEditModalOpen(false)}
					onSave={handleUpdate}
					initialFood={currentFood}
					getFoods={getFoods}
				/>
			)}
		</div>
	)
}

export default Home
