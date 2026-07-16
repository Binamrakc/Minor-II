function Login() {
  return (
    <div className="w-80 mx-auto mt-10 border p-5 rounded">

      <h2 className="text-2xl font-bold text-center mb-5">
        Login
      </h2>

      <input
        type="text"
        placeholder="Email or Phone Number"
        className="border w-full p-2 mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        className="border w-full p-2 mb-4"
      />

      <div className="flex justify-between">
        <button
          type="reset"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;