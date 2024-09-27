
const Navbar = () => {


  return (
    <nav className="w-full h-[7rem] my-15 flex items-center flex-between  " >
      <div className=" flex items-center justify-center pt-7 " >
        <img  className="object-cover " height={100} width={160} src="/logo.png" alt="" />
      </div>

      <div>
        <ul className="flex items-center space-x-8">
          <li>
            <a href="/" className="text-lg font-semibold text-gray-800">Home</a>
          </li>
          <li>
            <a href="#Main" className="text-lg font-semibold text-gray-800">About</a>
          </li>
          <li>
            <a href="#main_2" className="text-lg font-semibold text-gray-800">Services</a>
          </li>
          <li>
            <a href="#faq" className="text-lg font-semibold text-gray-800">FAQ&apos;s</a>
          </li>
          <li>
            <a href="/dashboard" className="text-lg font-semibold text-gray-800">DashBoard</a>
          </li>
        </ul>
      </div>

      <div className="black_btn" >
        <button className="" >
          <a href="/signIn">
          LogIn
          </a>

        </button>
      </div>
    </nav>
  )
}

export default Navbar