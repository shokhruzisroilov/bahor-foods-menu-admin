import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setAuth }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (username === 'shohruz' && password === '12345678') {
				setAuth(true)
				localStorage.setItem('auth', 'true')
				navigate('/')
			} else {
				alert('Login yoki parol xato')
			}
		} catch (error) {
			alert('Login yoki parol xato')
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-sm mx-auto p-6 border-[1px] border-[#deab5d26] hover:border-[#deab5d] transition-transform transform hover:scale-105'>
				<h2 className='text-2xl font-bold font-merriweather text-gray-800 mb-6 text-center'>
					Login
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-gray-700 font-merriweather'
						>
							Username
						</label>
						<input
							type='text'
							id='username'
							name='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#deab5d]'
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-gray-700 font-merriweather'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#deab5d]'
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-[#deab5d] text-white py-2 rounded-lg hover:bg-[#c8964a] focus:outline-none focus:ring-2 focus:ring-[#deab5d]'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
