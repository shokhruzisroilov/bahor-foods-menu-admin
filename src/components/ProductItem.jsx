import React from 'react'

const ProductItem = ({ filteredFood, onDelete, onEdit }) => {
	return (
		<div className='food-item bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-sm mx-auto mb-6 transition-transform transform hover:scale-105 border-[1px] border-[#deab5d26] hover:border-[1px] hover:border-[#deab5d]'>
			<img
				src={filteredFood.img}
				alt={filteredFood.name}
				className='w-full h-[150px] object-cover'
				onError={e => {
					e.target.src = 'https://via.placeholder.com/150'
				}}
			/>
			<div className='p-6'>
				<h2 className='text-lg font-bold font-merriweather text-gray-800 mb-2'>
					{filteredFood.name}
				</h2>
				<p className='text-md font-semibold font-merriweather text-gray-600'>
					{filteredFood.price}
				</p>
			</div>
			<div className='flex justify-between gap-2'>
				<button
					className='bg-blue-500 text-white py-1 w-full rounded hover:bg-blue-600'
					onClick={() => onEdit(filteredFood)}
				>
					Таҳрирлаш
				</button>
				<button
					className='bg-red-500 text-white py-1 w-full rounded hover:bg-red-600'
					onClick={() => onDelete(filteredFood._id)}
				>
					Ўчириш
				</button>
			</div>
		</div>
	)
}

export default ProductItem
