import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full h-[7rem] my-15 flex items-center flex-between">
      <div className="flex items-center justify-center pt-7">
        <img
          className="object-cover mb-5"
          height={150}
          width={150}
          src="/logog.png"
          alt=""
        />
      </div>

      <div>
        <ul className="flex items-center space-x-8">
          <li>
            <a href="/" className="text-lg font-semibold text-gray-800">
              Home
            </a>
          </li>
          <li>
            <a href="#Main" className="text-lg font-semibold text-gray-800">
              About
            </a>
          </li>
          <li>
            <a href="#main_2" className="text-lg font-semibold text-gray-800">
              Services
            </a>
          </li>
          <li>
            <a href="#faq" className="text-lg font-semibold text-gray-800">
              FAQ&apos;s
            </a>
          </li>
          <li>
            <a href="/llama" className="text-lg font-semibold text-gray-800">
              Chatbot
            </a>
          </li>
          {
            isLoggedIn && (
              <li>
                <a href="/dashboard" className="text-lg font-semibold text-gray-800">
                  DashBoard
                </a>
              </li>
            )
          }
          {
            isLoggedIn && (
              <li>
                <a href="/create-Meet" className="text-lg font-semibold text-gray-800">
                  Create Meet
                </a>
              </li>
            )
          }
        </ul>
      </div>

      <div className="black_btn">
        <button onClick={isLoggedIn ? handleSignOut : null}>
          <a href={isLoggedIn ? "/dashboard" : "/signIn"}>
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;