import logo from "../../assets/LOGO.png";
import {Link, useParams} from "react-router";
import {itemList, ParticipantList} from "../../lib/api/BillApi.js";
import {alertError} from "../../lib/alert.js";
import {useEffectOnce, useLocalStorage} from "react-use";
import {useState} from "react";


export default function ListItems() {
    const {participantId} = useParams();
    const {kegiatanId} = useParams();
    const [token, _] = useLocalStorage("token", "");
    const [participant, setParticipant] = useState(
        //default value nya
        {
            "id" : 1,
            "name" : "Lionel Bintang",
            "cost_total" : 120000
        }
    )
    const [items, setItems] = useState([
        {
            "id" : 1,
            "item_name" : "Makan",
            "amount" : 2,
            "cost" : 40000
        }
    ])

    async function fetchItems(){
        const response = await itemList(token, kegiatanId,participantId)
        const responseBody = await response.json();
        if (response.status === 200) {

            setItems(responseBody.data)
            console.log(responseBody.data)
            //ini participant nya
            setParticipant(responseBody.data[0].participant)

        }else {
            await alertError(responseBody.errors)
        }
    }

    useEffectOnce(() => {
        fetchItems()
            .then(()=> console.log("succes fetch data item"))
    })

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


    <main className="min-h-screen bg-[#FFEAA5] flex flex-col pt-20">

        <div className="flex-1 flex flex-col items-center justify-center">
            <div
                className="w-full max-w-3xl backdrop-blur-lg rounded-2xl p-6 shadow-lg mt-2"
            >
                <div
                    className="w-full max-w-3xl bg-[#226B80]/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mx-auto"
                >

                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-[#FFEBD3]">Add Item</h2>

                        <Link to={`/dashboard/splitnow/${kegiatanId}/addItem/${participant.id}`}
                            className="px-4 py-2 text-sm rounded-lg bg-[#FFEBD3] text-[#226B80] font-semibold hover:bg-white transition"
                        >
                            + Add Item
                        </Link>
                    </div>


                    <div
                        className="bg-[#226B80]/60 rounded-xl p-3 mb-4 grid grid-cols-2 gap-4"
                    >
                        <div>
                            <p className="text-sm text-[#FFEBD3]/80 mb-1">Participant</p>
                            <p className="text-lg font-semibold text-[#FFEBD3]">
                                {participant ? participant.name : "...Loading"}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-[#FFEBD3]/80 mb-1">Total Cost</p>
                            <p className="text-lg font-semibold text-[#FFEBD3]">{participant ? participant.cost_total.toLocaleString("id-ID", {style: "currency", currency: "IDR"}) :  "...Loading"}</p>
                        </div>
                    </div>


                    <div className="bg-[#226B80]/60 rounded-xl p-6">

                        <div
                            className="grid grid-cols-[1fr_80px_120px] text-[#FFEBD3]/80 text-sm mb-3 px-4"
                        >
                            <span>Item Name</span>
                            <span className="text-center">Amount</span>
                            <span className="text-right">Cost</span>
                        </div>

                        {items ? items.map((item) => (
                            <div key={item.id}
                                className="grid grid-cols-[1fr_80px_120px] items-center bg-[#226B80]/80 rounded-lg px-5 py-4 mb-2"
                            >

                                <div className="text-[#FFEBD3] font-medium">{item.item_name}</div>

                                <div className="text-center text-[#FFEBD3]/90 font-medium">x{item.amount}</div>


                                <div className="text-right text-[#FFEBD3] font-semibold">
                                    {item.cost.toLocaleString("id-ID", {style: "currency", currency: "IDR"})}
                                </div>
                            </div>
                        )) : (
                            <div
                                className="text-center text-[#FFEBD3]/70 py-6 border border-dashed border-[#FFEBD3]/40 rounded-xl">
                                Belum ada Items
                            </div>
                        )}

                        {/*<div*/}
                        {/*    className="grid grid-cols-[1fr_80px_120px] items-center bg-[#226B80]/80 rounded-lg px-5 py-4"*/}
                        {/*>*/}

                        {/*    <div className="text-[#FFEBD3] font-medium">Makan</div>*/}


                        {/*    <div className="text-center text-[#FFEBD3]/90 font-medium">x2</div>*/}


                        {/*    <div className="text-right text-[#FFEBD3] font-semibold">*/}
                        {/*        Rp 40.000*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div*/}
                        {/*    className="grid grid-cols-[1fr_80px_120px] items-center bg-[#226B80]/80 rounded-lg px-5 py-4"*/}
                        {/*>*/}

                        {/*    <div className="text-[#FFEBD3] font-medium">Makan</div>*/}

                        {/*    <div className="text-center text-[#FFEBD3]/90 font-medium">x2</div>*/}


                        {/*    <div className="text-right text-[#FFEBD3] font-semibold">*/}
                        {/*        Rp 40.000*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-2">
                <Link to={`/dashboard/splitnow/${kegiatanId}/participant`}
                    className="bg-[#226B80] text-[#FFEBD3] font-bold text-[20px] px-9 py-2 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-20 mt-10"
                >
                    Finish
                </Link>
            </div>

        </div>
    </main>
    </div>
}