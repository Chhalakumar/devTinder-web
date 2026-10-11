import axios from "axios";
import {useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error,setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isLoading) return; // Prevent multiple requests
    
    try{
      setError(""); // Clear previous errors
      setIsLoading(true);
      
      const res = await axios.post(BASE_URL+"/login", {emailId, password},{withCredentials:true});
      console.log("Login response:", res.data);
      
      // Check if login was actually successful
      if (res.status === 200 && res.data) {
        dispatch(addUser(res.data));
        return navigate("/");
      } else {
        setError("Login failed - Invalid response from server");
      }
    }catch(err){
      console.error("Login error:", err);
      
      // Better error handling
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || err.response.data || `Error ${err.response.status}: Login failed`;
        setError(errorMessage);
      } else if (err.request) {
        // Network error
        setError("Network error - Cannot connect to server");
      } else {
        // Other error
        setError("Something went wrong during login");
      }
    } finally {
      setIsLoading(false);
    }
};

const handleSignUp = async () => {
    if (isLoading) return; // Prevent multiple requests
    
    try{
      setError(""); // Clear previous errors
      setIsLoading(true);
      
      const res = await axios.post(BASE_URL+"/signup", {firstName,lastName,emailId, password},{withCredentials:true});
      console.log("Signup response:", res.data);
      
      // Check if signup was successful and extract user data
      if (res.status === 200 && res.data?.data) {
        dispatch(addUser(res.data.data)); // Use res.data.data for signup
        return navigate("/");
      } else {
        setError("Signup failed - Invalid response from server");
      }
    }catch(err){
      console.error("Signup error:", err);
      
      // Better error handling
      if (err.response) {
        const errorMessage = err.response.data?.message || err.response.data || `Error ${err.response.status}: Signup failed`;
        setError(errorMessage);
      } else if (err.request) {
        setError("Network error - Cannot connect to server");
      } else {
        setError("Something went wrong during signup");
      }
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className="min-h-screen flex bg-gray-900 relative">
      {/* Background Image - Shows on mobile behind form */}
      <div 
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://aimbeat.com/wp-content/uploads/2025/08/hire-python-developer.png)',
        }}
      >
        {/* Overlay for better form readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-start px-8 md:px-16 lg:px-24 bg-transparent lg:bg-gradient-to-br lg:from-gray-900 lg:via-gray-800 lg:to-gray-900 relative z-10">
        <div className="w-full max-w-md py-12">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h1 className="text-2xl font-bold text-white">devTinder</h1>
            </div>
          </div>

          {/* Form Card */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLoginForm ? "Welcome Back" : "Create An Account"}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLoginForm ? "Sign in to continue your journey" : "Join thousands of developers finding their perfect match"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {!isLoginForm && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label pb-1">
                        <span className="label-text text-gray-300 font-medium text-sm">First Name</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        placeholder="John"
                        className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        onChange={(e)=>setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label pb-1">
                        <span className="label-text text-gray-300 font-medium text-sm">Last Name</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        placeholder="Doe"
                        className="input input-bordered w-full bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        onChange={(e)=>setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="label pb-1">
                  <span className="label-text text-gray-300 font-medium text-sm">Email Address</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={emailId}
                    placeholder="billy@gmail.com"
                    className="input input-bordered w-full pl-12 bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    onChange={(e)=>setEmailId(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="label pb-1">
                  <span className="label-text text-gray-300 font-medium text-sm">Password</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Billy1234$"
                    className="input input-bordered w-full pl-12 pr-12 bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    onChange={(e)=>setPassword(e.target.value)} 
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Test Credentials Button - Only show in login form */}
              {isLoginForm && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailId("billy@gmail.com");
                      setPassword("Billy1234$");
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                  >
                    Use Test Credentials
                  </button>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="alert alert-error bg-red-500/10 border border-red-500/50 text-red-400 animate-shake">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button 
                className={`btn btn-primary w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 ${isLoading ? 'loading' : ''}`}
                onClick={isLoginForm ? handleLogin : handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    {isLoginForm ? 'Logging in...' : 'Creating account...'}
                  </span>
                ) : (
                  isLoginForm ? "Sign In" : "Create Account"
                )}
              </button>

              {/* Toggle Form */}
              <div className="text-center pt-2">
                <p className="text-gray-400 text-sm">
                  {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                  <button
                    className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors"
                    onClick={() => {
                      setIsLoginForm((value) => !value);
                      setError("");
                    }}
                  >
                    {isLoginForm ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>

            {/* Footer text */}
            <p className="text-gray-500 text-xs mt-4">
              By continuing, you agree to devTinder's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://aimbeat.com/wp-content/uploads/2025/08/hire-python-developer.png)',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-pink-900/80 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center max-w-lg">
          {/* Hero Image/Illustration - Hidden when background image is used */}
          <div className="mb-8 relative hidden">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Code-themed illustration */}
              <div className="text-9xl opacity-80">💻</div>
              <div className="absolute top-4 right-4 text-4xl animate-bounce">❤️</div>
              <div className="absolute bottom-8 left-8 text-3xl animate-pulse">🚀</div>
              <div className="absolute top-1/3 left-6 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>👨‍💻</div>
              <div className="absolute top-1/3 right-6 text-2xl animate-bounce" style={{animationDelay: '1s'}}>👩‍💻</div>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Connect With<br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Amazing Developers
            </span>
          </h2>
          <p className="text-white text-xl mb-10 drop-shadow-lg font-medium">
            Find your coding partner, build incredible projects, and grow together in the tech community.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
           
            <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-semibold shadow-lg">
              ⚡ Instant Matching
            </div>
            <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-semibold shadow-lg">
              💬 Real-time Chat
            </div>
          </div>

          {/* Code Snippet Decoration */}
          <div className="mt-12 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-left font-mono text-sm shadow-2xl">
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <code className="text-purple-300">
              <span className="text-pink-400">const</span> <span className="text-blue-300">match</span> = <span className="text-yellow-300">findPerfectDev</span>();<br/>
              <span className="text-pink-400">if</span> (<span className="text-blue-300">match</span>.<span className="text-yellow-300">skills</span> === <span className="text-green-300">'amazing'</span>) {'{'}<br/>
              &nbsp;&nbsp;<span className="text-blue-300">startCollaboration</span>();<br/>
              {'}'}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
