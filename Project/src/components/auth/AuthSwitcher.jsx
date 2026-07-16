import { useState } from 'react'
import Login from './Login'
import Register from './Register'

function AuthSwitcher() {
  const [view, setView] = useState('login')

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm">
      <div className="flex overflow-hidden rounded-t-[1.5rem] bg-orange-50">
        <button
          type="button"
          onClick={() => setView('login')}
          className={`flex-1 px-6 py-4 text-sm font-semibold transition ${view === 'login' ? 'bg-white text-orange-700' : 'text-slate-600'}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setView('register')}
          className={`flex-1 px-6 py-4 text-sm font-semibold transition ${view === 'register' ? 'bg-white text-orange-700' : 'text-slate-600'}`}
        >
          Register
        </button>
      </div>

      <div className="bg-white px-6 py-8 sm:px-8">
        {view === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  )
}

export default AuthSwitcher
