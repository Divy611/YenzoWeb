import { AuthStatus } from '../App'
import React, { useState } from 'react'
import NoTextLogo from '../assets/logo_no_title.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import LoadingScreen from './loading';

const users = [
    { email: 'divy.parikh@hotmail.com', password: 'Divy@123' },
    { email: 'pandey.aditya1003@gmail.com', password: 'Aditya@123' }
];

export default function Login({ setAuthStatus }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            setAuthStatus(AuthStatus.LOGGED_IN);
            history.push('/home');
        }
        else { setMessage('Invalid email or password.'); }
        setIsLoading(false);
    };
    if (isLoading) { return <LoadingScreen />; }
    return (
        <form className="py-10 2xl:py-56 flex flex-col items-center text-center bg-[#16151A]" onSubmit={handleSubmit}>
            <img src={NoTextLogo} className='h-16 w-16' alt="" />
            <div className="flex-col py-2"><h1 className='text-white text-2xl font-semibold'>LOGIN</h1><h2 className='text-gray-500'>Welcome Back!</h2></div>
            <div className='w-1/3 px-3 py-5'>
                <div className="border border-green-600 rounded-lg">
                    <input required type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full bg-transparent p-4 rounded-lg text-md text-white' />
                </div>
            </div>
            <div className='w-1/3 px-3'>
                <div className="border border-green-600 rounded-lg">
                    <input required type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full bg-transparent p-4 rounded-lg text-md text-white' />
                </div>
            </div>
            <div className='w-1/3 px-3 py-5'>
                <button className='bg-green-600 rounded-lg w-full py-4 text-white font-semibold'>LOGIN</button>
            </div>
            {message && (<div className="text-center pb-2"><p className="text-red-500">{message}</p></div>)}
            <div className='w-1/3 px-3'>
                <button className='bg-[#1B1A1D] text-center rounded-lg w-full py-4 px-5 text-gray-300 flex items-center'>
                    <img src='https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png' alt='' className='h-8 w-8' />&nbsp;&nbsp;&nbsp;Continue with Google
                </button>
            </div>
            <div className='w-1/3 py-7'><div className="w-full h-0.5 rounded-full bg-green-600"></div></div>
            <h1 className='text-white'>Don't have an account? <a href="/home" className='text-green-600'>Sign Up Today!</a></h1>
        </form>
    )
}//eslint-disable-next-line
export function Signup({ setAuthStatus }) {
    const [email, setEmail] = useState('');//eslint-disable-next-line
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');//eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event) => { };
    if (isLoading) { return <LoadingScreen />; }
    return (
        <form className="py-10 2xl:py-56 flex flex-col items-center text-center bg-[#16151A]" onSubmit={handleSubmit}>
            <img src={NoTextLogo} className='h-16 w-16' alt="" />
            <div className="flex-col py-2"><h1 className='text-white text-2xl font-semibold'>SIGNUP</h1><h2 className='text-gray-500'>Welcome to Yenzo!</h2></div>
            <div className='w-1/3 px-3 py-5'>
                <div className="border border-green-600 rounded-lg">
                    <input required type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full bg-transparent p-4 rounded-lg text-md text-white' />
                </div>
            </div>
            <div className='w-1/3 px-3'>
                <div className="border border-green-600 rounded-lg">
                    <input required type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full bg-transparent p-4 rounded-lg text-md text-white' />
                </div>
            </div>
            <div className='w-1/3 px-3 py-5'>
                <button className='bg-green-600 rounded-lg w-full py-4 text-white font-semibold'>SIGNUP</button>
            </div>
            {message && (<div className="text-center pb-2"><p className="text-red-500">{message}</p></div>)}
            <div className='w-1/3 px-3'>
                <button className='bg-[#1B1A1D] text-center rounded-lg w-full py-4 px-5 text-gray-300 flex items-center'>
                    <img src='https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png' alt='' className='h-8 w-8' />&nbsp;&nbsp;&nbsp;Continue with Google
                </button>
            </div>
            <div className='w-1/3 py-7'><div className="w-full h-0.5 rounded-full bg-green-600"></div></div>
            <h1 className='text-white'>Don't have an account? <a href="/home" className='text-green-600'>Sign Up Today!</a></h1>
        </form>
    )
}