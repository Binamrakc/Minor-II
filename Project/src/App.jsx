import AuthSwitcher from './components/auth/AuthSwitcher'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(248,242,232,0.9),_rgba(255,249,241,1))] px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-orange-100/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-700">Rental</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Login and Register</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Clean Nepali-style auth pages with simple navigation, proper structure, and no extra animation.
            </p>
          </div>

          <AuthSwitcher />
        </div>
      </div>
    </div>
  )
}

export default App
