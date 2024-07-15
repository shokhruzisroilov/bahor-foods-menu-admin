import axios from './api'

const FoodsService = {
	async getFoods() {
		const response = await axios.get('/foods')
		return response.data
	},

	async addFood(newFood) {
		const response = await axios.post('/foods', newFood)
		return response.data
	},

	async updateFood(id, updatedFood) {
		const response = await axios.patch(`/foods/${id}`, updatedFood)
		return response.data
	},

	async deleteFood(id) {
		const response = await axios.delete(`/foods/${id}`)
		return response.data
	},
}

export default FoodsService
