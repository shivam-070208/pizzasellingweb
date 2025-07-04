import React, { useEffect, useState } from 'react'
import { useContextValues } from '../Helpers/Contextprovider'
import { Navbar } from '../Components'
import { useNavigate } from 'react-router'

const User = () => {
  const [User, suser] = useState(null)
  const [navOptions, snavOptions] = useState([])
  const { user } = useContextValues()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      suser(user)
      snavOptions([
        { label: 'Orders', icon: '🧾', href: '/orders' },
        { label: 'Cart', icon: '🛒', href: '/cart' },
        ...(user.role === 'Seller' ? [{ label: 'Your Items', icon: '🍕', href: '/Items' }] : [])
      ])
    }
  }, [user])

  if (!User || navOptions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100">
        <div className="text-2xl text-gray-500 animate-pulse">Loading user info...</div>
      </div>
    )
  }

  return (
    <div key={1} className="min-h-screen w-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 pb-16">
      <Navbar />
      {/* Secondary Navbar */}
      <div className="w-full flex justify-center bg-white/80 shadow-md py-3 sticky top-20 z-40">
        <div className="flex gap-6">
          {navOptions.map(opt => (
            <button
              key={opt.label} onClick={()=> navigate(opt.href)}
              className="flex cursor-pointer items-center gap-1 px-4 py-2 rounded-full font-bold text-md text-yellow-700 bg-yellow-100 hover:bg-yellow-300 shadow transition-all duration-200"
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>
      {/* User Card */}
      <div className="flex items-center justify-center pt-32">
        <div className="relative max-w-2xl w-full bg-white/95 rounded-3xl shadow-2xl md:p-12 p-3 flex flex-col items-center border-4 border-yellow-300 overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[url('/heroic/veggie.png')] bg-contain bg-no-repeat opacity-10 animate-spin-slow"></div>
          <div className="absolute -bottom-12 -right-12 md:w-48 md:h-48 w-44 h-44 bg-[url('/heroic/italian.png')] bg-contain bg-no-repeat opacity-10 animate-spin-slow-reverse"></div>
          {User.image ? (
            <img
              src={User.image}
              alt="User avatar"
              className="md:w-32 md:h-32 w-29 h-29 cursor-pointer rounded-full mb-4 border-4 border-pink-400 shadow-xl object-cover bg-yellow-100"
            />
          ) : (
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(User.Email)}`}
              alt="avatar"
              className="md:w-32 md:h-32 w-29 h-29 cursor-pointer rounded-full mb-4 border-4 border-yellow-400 shadow-xl bg-yellow-100"
            />
          )}
          <h2 className="md:text-4xl text-2xl  font-extrabold text-yellow-700 mb-1 tracking-widest drop-shadow-lg text-center animate-pulse">
            {User.Name}
          </h2>
          <div className="text-lg text-gray-700 mb-2 text-center">
            <span className="font-semibold">Email:</span> {User.Email}
          </div>
          
          {User.role === 'Seller' && (
            <>
              <div className="text-lg text-gray-700 mb-2 text-center">
                <span className="font-semibold">Organisation:</span> {User.Organisation || <span className="italic text-gray-400">N/A</span>}
              </div>
              <div className="text-lg text-gray-700 mb-2 text-center">
                <span className="font-semibold">Address:</span> {User.Address || <span className="italic text-gray-400">N/A</span>}
              </div>
              <div onClick={()=>navigate('/Dashboard')} className="mt-6 px-8 py-3 bg-gradient-to-r cursor-pointer from-green-400 to-yellow-400 text-white text-xl font-bold rounded-full shadow-lg  animate-bounce-slow">
                Seller Dashboard
              </div>
            </>
          )}
          {User.role !== 'Seller' && (
            <div className="w-full flex flex-col items-center mt-8">
              <div className="text-xl text-pink-600 font-bold mb-2 animate-pulse">Want to sell your own pizzas?</div>
              <button onClick={()=>navigate('/createseller')} className="px-10 py-3 bg-gradient-to-r cursor-pointer from-yellow-400 to-pink-400 text-white text-2xl font-extrabold rounded-full shadow-lg hover:scale-110 transition-transform duration-200 animate-bounce">
                Become a Seller
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-reverse 14s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        .animate-bounce-slow { animation: bounce 2.5s infinite; }
      `}</style>
    </div>
  )
}

export default User