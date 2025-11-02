const loginPage = () => {
  return (
    <main>

      <div
        className="flex items-center justify-center h-screen"
      >
        <div
          className="flex flex-row w-full max-w-[680px] gap-8"
        >

          {/* desc */}
          <div
            className="flex flex-col w-2/5"
          >
            <div>
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                Please, Sign In
              </h1>
              <span>before you explore amazing stuff in GadgetPedia</span>
            </div>
            
            <div
              className="flex flex-col items-center justify-center gap-6 border-t-2 border-gray-200 py-6 mt-6"
            >
              <div
                className="w-full px-8 py-4 rounded-xl font-medium outline-2 outline-gray-200"
              >
                Login with Google
              </div>
              <div
                className="w-full px-8 py-4 rounded-xl font-medium outline-2 outline-gray-200"
              >
                Login with Apple
              </div>

            </div>
            
            <div>
              Don’t have account? Please <span className="text-blue-400"><a href="">sign up</a></span>!
            </div>

          </div>

          {/* form */}
          <div
            className="flex flex-col w-3/5 outline-2 outline-gray-200 p-4 rounded-xl gap-8"
          >
            <div>
              <h1
                className="flex font-bold pb-4 px-2"
              >Email <span>*</span></h1>
              <input 
                type="email"
                placeholder="Email"
                className="w-full px-4 py-4 rounded-xl outline-2 outline-gray-200 placeholder-gray-300"
                />
            </div>
            <div>
              <h1
                className="flex font-bold pb-4 px-2"
              >Password <span>*</span></h1>
              <input 
                type="password"
                placeholder="Password"
                className="w-full px-4 py-4 rounded-xl outline-2 outline-gray-200 placeholder-gray-300"
                />
            </div>
            <div>
              <div>
                <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform ">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default loginPage;