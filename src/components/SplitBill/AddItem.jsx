import logo from "../../assets/LOGO.png";
import {Link, useNavigate, useParams} from "react-router";
import bgMoney from "../../assets/bg-money.png";
import {createItem, CreateKegiatan} from "../../lib/api/BillApi.js";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {useState} from "react";
import {useLocalStorage} from "react-use";


export default function AddItem() {

    const [item_name, setItemName] = useState('')
    const [amount, setAmount] = useState('')
    const [cost, setCost] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [token, _] = useLocalStorage("token", "")
    const navigate = useNavigate();
    const {kegiatanId} = useParams();
    const {participantId} = useParams();

    async function handleSubmit(e) {
        e.preventDefault();

        if (isSubmitting) return; // Prevent double submission
        setIsSubmitting(true); // Disable button

        const response = await createItem(token,kegiatanId,participantId,item_name, amount, cost);
        const responseBody = await response.json();
        console.log(responseBody)
        if(response.status === 201){
            await alertSuccess("Berhasil menambahkan item yang anda beli")
            navigate({
                pathname : `/dashboard/splitnow/${kegiatanId}/addItem/${participantId}/items`,
            })
        }else{
            console.log(responseBody.taxPercentage)
            await alertError("silahkan login terlebih dahulu "+ responseBody.error)
        }

        setTimeout(() =>{
            setIsSubmitting(false)
        },2000)

    }

    return <div className="m-0 p-0">


        <nav className="w-full bg-[#226B80] text-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="2xl:h-15 h-10 w-auto"/>
                </div>
                <div className="flex items-center space-x-4">

                    <Link to="/dashboard/splitnow"
                          className=" px-4 py-2 rounded-lg text-[#FFEBD3] btn-animate  font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] hover:text-[#226B80]">
                        Home
                    </Link>

                    <Link to="/dashboard/splitnow/create"
                          className="px-4 py-2 rounded-lg  font-medium text-[24px] transition-all duration-300 bg-[#FFEBD3] text-[#226B80]">
                        New Split
                    </Link>

                    <Link to="/dashboard/user/profile"
                          className="px-4 py-2 rounded-lg btn-animate  font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] hover:text-[#226B80] ">
                        Profile
                    </Link>
                </div>
            </div>
        </nav>



        <main className="min-h-screen bg-[#FFEAA5] flex flex-col pt-24">


        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg">

                <h2 className="text-3xl font-bold text-[#226B80] mb-6 text-center font-poppins">
                    Tambah Item
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>
                        <label className="block text-[#226B80] font-medium mb-1">
                            Item Name
                        </label>
                        <input
                            onChange={(e) => setItemName(e.target.value)}
                            type="text"
                            name="item_name"
                            placeholder="Contoh: Nasi Goreng"
                            className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50
                   focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50"/>
                    </div>

                    <div>
                        <label className="block text-[#226B80] font-medium mb-1">
                            Amount
                        </label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            name="amount"
                            min="1"
                            placeholder="Contoh: 2"
                            className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50
                   focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50"/>
                    </div>


                    <div>
                        <label className="block text-[#226B80] font-medium mb-1">
                            Cost
                        </label>
                        <input
                            onChange={(e) => setCost(e.target.value)}
                            type="number"
                            name="cost"
                            min="0"
                            step="0.01"
                            placeholder="Contoh: 15000"
                            className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50
                   focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50"/>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-[#226B80] text-[#FFEBD3]
                   font-bold font-poppins btn-animate hover:bg-[#1A5363]">
                            Tambah Item
                        </button>
                    </div>

                </form>
            </div>
        </div>


            <div
                className="flex-1 relative flex items-end justify-center bg-contain bg-no-repeat 2xl:bg-repeat bg-bottom"
                style={{ backgroundImage: `url(${bgMoney})` }}
            >
            </div>


        </main>

    </div>
}