"use client"


import { useRouter } from "next/navigation";
import { useState } from "react"

const LoginPage = () => {

  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");
    setLoading(true)

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userName,
          password: userPassword,
        }),
      });

      if(!response.ok) {
        setError("Login failed. Check your username and password.")
          return;
      }

      const data: {token: string} = await response.json();

      localStorage.setItem("authToken", data.token);

      router.push("/profile")

    } catch(error) {
      setError(`A network error occurred. Please try again. ${error}`)
      return;
    } finally {
      setLoading(false)
    }

  };

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
            <form onSubmit={handleLogin} className="flex flex-col gap-8">

              {error && (
                <div className="text-red-600 font-medium text-center">{error}</div>
              )}

              <div>
                <h1
                  className="flex font-bold pb-4 px-2"
                >Username <span>*</span></h1>
                <input 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-4 rounded-xl outline-2 outline-gray-200 placeholder-gray-300"
                  />
              </div>
              <div>
                <h1
                  className="flex font-bold pb-4 px-2"
                >Password <span>*</span></h1>
                <input 
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-4 rounded-xl outline-2 outline-gray-200 placeholder-gray-300"
                  />
              </div>
              <div>
                <div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                    }`}
                    >
                    {loading ? "Sign in..." : "Sign in"}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage;