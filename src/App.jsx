import Home from './pages/Home'
import Categories from './components/Categories'
import Footer from './components/Footer'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { categories } from './utils/categories'
import Login from './pages/auth/Login'

const App = () => {
	const [auth, setAuth] = useState(true)
	const [activeCategory, setActiveCategory] = useState(categories[0].id)
	const location = useLocation()

	const handleScroll = () => {
		const scrollPosition = window.scrollY
		const categoryElements = categories.map(category =>
			document.getElementById(category.id)
		)

		for (let i = 0; i < categoryElements.length; i++) {
			const element = categoryElements[i]
			const rect = element.getBoundingClientRect()
			const elementTop = rect.top + window.scrollY
			const elementBottom = elementTop + rect.height

			if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
				setActiveCategory(categories[i].id)
				break
			}
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (location.hash) {
			const categoryId = location.hash.substring(1) // Remove the '#'
			document
				.getElementById(categoryId)
				?.scrollIntoView({ behavior: 'smooth' })
			setActiveCategory(categoryId)
		}
	}, [location])

	return (
		<>
			{auth ? (
				<div>
					<Categories categories={categories} activeCategory={activeCategory} />
					<div>
						<Routes>
							<Route path='/' element={<Home />} />
						</Routes>
					</div>
					<Footer />
				</div>
			) : (
				<Login auth={auth} setAuth={setAuth} />
			)}
		</>
	)
}

export default App
