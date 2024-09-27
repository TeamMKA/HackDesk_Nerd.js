
const Navbar = () => {
  return (
    <nav className="w-full h-[7rem] my-15 flex items-center flex-between  " >
      <div className=" flex items-center justify-center " >
        <img  className="object-contain" height={100} width={100} src="/logo.png" alt="" />
      </div>

      <div>
        <ul className="flex items-center space-x-8">
          <li>
            <a href="/" className="text-lg font-semibold text-gray-800">Home</a>
          </li>
          <li>
            <a href="/" className="text-lg font-semibold text-gray-800">About</a>
          </li>
          <li>
            <a href="/" className="text-lg font-semibold text-gray-800">Services</a>
          </li>
          <li>
            <a href="/" className="text-lg font-semibold text-gray-800">Contact</a>
          </li>
        </ul>
      </div>

      <div className="black_btn" >
        <button className="" >
          LogIn
        </button>
      </div>
    </nav>
  )
}

export default Navbar