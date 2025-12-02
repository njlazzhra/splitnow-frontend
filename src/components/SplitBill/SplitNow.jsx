import {Link} from "react-router";
import logo from '../../assets/LOGO.png';

export default function SplitNow () {

    return <div className="m-0 p-0">
    <nav className="w-full bg-[#226B80] text-white fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <div className="flex items-center">
                <img src={logo} alt="Logo" className="2xl:h-15 h-10 w-auto"/>
            </div>

            <div className="flex items-center space-x-4">

                <Link to="#"
                   className="px-4 py-2 rounded-lg  font-medium text-[24px] transition-all duration-300 bg-[#FFEBD3] text-[#226B80]">
                    Home
                </Link>

                <Link to="#"
                   className="px-4 py-2 rounded-lg text-[#FFEBD3] font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] hover:text-[#226B80]">
                    New Split
                </Link>

                <Link to="/dashboard/user/profile"
                   className="px-4 py-2 rounded-lg btn-animate hover:underline font-medium text-[24px] transition-all duration-300 ">
                    Profile
                </Link>

            </div>

        </div>
    </nav>

    <main className="min-h-screen bg-[#FFEAA5] flex flex-col pt-20">

        <div className="flex-1 flex flex-col items-center justify-center space-y-4 ">
            <h1 className="text-[40px] font-semibold text-[#40A798] font-alice ">
                Split Bills Fast
            </h1>

            <h1 className="text-[28px] font-poppins font-medium text-gray-800 tracking-[2px] pb-3">
                No Math, No Stress.
            </h1>


            <button
                className="bg-[#226B80] text-[#FFEBD3] font-bold text-[30px] font-poppins
         px-20 py-3 rounded-3xl mt-8
          btn-animate"
            >
                Split now
            </button>
        </div>
        <div
            className="flex-1 relative flex items-end justify-center  bg-[url('../src/assets/bg-money.png')] bg-contain bg-no-repeat 2xl:bg-repeat bg-bottom ">
        </div>

    </main>


    </div>
}