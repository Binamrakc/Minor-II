function Register() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Register</h2>
      <form className="mt-8 space-y-6">
        <label className="block text-sm font-medium text-slate-700">
          Full Name
          <input
            type="text"
            placeholder="Your full name"
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            placeholder="example@domain.com"
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            placeholder="Create a password"
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Confirm Password
          <input
            type="password"
            placeholder="Confirm password"
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="reset"
            className="rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
