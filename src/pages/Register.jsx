/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRegisterUserMutation } from '../features/auth/authApi'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')

  const [registerUser, { data, isLoading, error: responseError }] =
    useRegisterUserMutation()

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm()

  // const onSubmit = async (data) => {
  //   console.log(data)
  //   registerUser({
  //     name,
  //     email,
  //     password,
  //     phone,
  //     role,
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { name, email, password, phone, role }

    console.log(data)
    registerUser(data)
  }

  useEffect(() => {
    if (responseError?.data) {
      alert(responseError.data)
    }
    if (data?.accessToken && data?.user) {
      alert('user registered')
    }
  }, [data, responseError])

  return (
    <main className='flex w-full'>
      <div className='relative items-center justify-center flex-1 hidden h-screen bg-gray-900 lg:flex'>
        <div className='relative z-10 w-full max-w-md'>
          <img src='https://i.ibb.co/sFsCmwx/jobsy-logo.png' width={150} />
          <div className='mt-16 space-y-3 '>
            <h3 className='text-3xl font-bold text-white'>
              Start growing your business quickly
            </h3>
            <p className='text-gray-300'>
              Create an account and get access to all features for 30-days, No
              credit card required.
            </p>
            <div className='flex items-center -space-x-2 overflow-hidden'>
              <img
                src='https://randomuser.me/api/portraits/women/79.jpg'
                className='w-10 h-10 border-2 border-white rounded-full'
              />
              <img
                src='https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg'
                className='w-10 h-10 border-2 border-white rounded-full'
              />
              <img
                src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f'
                className='w-10 h-10 border-2 border-white rounded-full'
              />
              <img
                src='https://randomuser.me/api/portraits/men/86.jpg'
                className='w-10 h-10 border-2 border-white rounded-full'
              />
              <img
                src='https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e'
                className='w-10 h-10 border-2 border-white rounded-full'
              />
              <p className='text-sm font-medium text-gray-400 translate-x-5'>
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-0 h-screen my-auto'
          style={{
            background:
              'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
            filter: 'blur(118px)',
          }}
        ></div>
      </div>
      <div className='flex items-center justify-center flex-1 '>
        <div className='w-full max-w-md px-4 space-y-8 text-gray-600 bg-white sm:px-0'>
          <div className=''>
            <img
              src='https://i.ibb.co/sFsCmwx/jobsy-logo.png'
              width={150}
              className='lg:hidden'
            />
            <div className='mt-5 space-y-2'>
              <h3 className='text-2xl font-bold text-gray-800 sm:text-3xl'>
                Sign up
              </h3>

              <p className=''>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-x-3'>
            <button className='flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100'>
              <svg
                className='w-5 h-5'
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_17_40)'>
                  <path
                    d='M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z'
                    fill='#4285F4'
                  />
                  <path
                    d='M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z'
                    fill='#34A853'
                  />
                  <path
                    d='M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z'
                    fill='#FBBC04'
                  />
                  <path
                    d='M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z'
                    fill='#EA4335'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_17_40'>
                    <rect width='48' height='48' fill='white' />
                  </clipPath>
                </defs>
              </svg>
              <p className='px-4 font-semibold'>Login with Google</p>
            </button>
          </div>
          <div className='relative'>
            <span className='block w-full h-px bg-gray-300'></span>
            <p className='absolute inset-x-0 inline-block px-2 mx-auto text-sm bg-white w-fit -top-2'>
              Or continue with
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* row 1 */}
            <article className='flex gap-4'>
              <div>
                <label className='font-medium'>Name</label>
                <input
                  name='name'
                  type='text'
                  // {...register('name', { required: true })}
                  required
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600'
                />
              </div>

              <div>
                <label className='font-medium'>Email</label>
                <input
                  name='email'
                  type='email'
                  // {...register('email', { required: true })}
                  required
                  placeholder='email@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600'
                />
              </div>
            </article>
            <article className='flex gap-4'></article>
            {/* end of row 1 */}

            {/* row 3 */}
            <article className='flex gap-4'>
              <div>
                <label className='font-medium'>Password</label>
                <input
                  type='password'
                  // {...register('password', { required: true })}
                  name='password'
                  required
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600'
                />
              </div>
              <div>
                <label className='font-medium'>Phone Number</label>
                <input
                  type='text'
                  // {...register('phone', { required: true })}
                  name='phone'
                  required
                  placeholder='+8801717123456'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600'
                />
              </div>
            </article>
            {/* end of row 3 */}

            {/* row 4 */}
            <article className='flex gap-4'>
              <div>
                <label className='font-medium' htmlFor='role'>
                  Register As
                </label>
                <select
                  required
                  type='text'
                  // {...register('role', { required: true })}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600'
                  name='role'
                  id='role'
                >
                  <option value='owner'>House Owner</option>
                  <option value='renter'>House Renter</option>
                </select>
              </div>
            </article>
            {/* end of row 4 */}

            <button className='w-full px-4 py-2 font-medium text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-600'>
              Create account
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Register
