import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { categories } from '../utils/categories'

const Categories = ({ activeCategory }) => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1920,
				settings: {
					slidesToShow: categories.length,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 350,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<nav className='fixed top-4 right-0 left-0 bg-white p-4 shadow-custom z-10'>
			<Slider {...settings}>
				{categories.map(category => (
					<div key={category.id} className='px-2'>
						<Link
							to={`/#${category.id}`}
							className={`block ${
								activeCategory === category.id
									? 'py-3 px-1 text-center bg-[#deab5d] rounded-[8px] text-base text-black font-merriweather'
									: 'py-3 px-1 text-center bg-[#deab5d26] rounded-[8px] text-base text-black font-merriweather'
							}`}
						>
							{category.name}
						</Link>
					</div>
				))}
			</Slider>
		</nav>
	)
}

const NextArrow = props => {
	const { className, style, onClick } = props
	return (
		<div
			className={className}
			style={{
				...style,
				display: 'block',
				background: '#deab5d',
				borderRadius: '50%',
				right: '-16px',
			}}
			onClick={onClick}
		/>
	)
}

const PrevArrow = props => {
	const { className, style, onClick } = props
	return (
		<div
			className={className}
			style={{
				...style,
				display: 'block',
				background: '#deab5d',
				borderRadius: '50%',
				left: '-16px',
			}}
			onClick={onClick}
		/>
	)
}

export default Categories
