import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import RedirectLogin from "./components/RedirectLogin.jsx";
import UserRegister from "./components/User/UserRegister.jsx";
import UserLogin from "./components/User/UserLogin.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import UserLogout from "./components/User/UserLogout.jsx";
import SplitNow from "./components/SplitBill/SplitNow.jsx";
import CreateEvent from "./components/SplitBill/CreateEvent.jsx";
import ListParticipant from "./components/SplitBill/ListParticipant.jsx";
import AddParticipant from "./components/SplitBill/AddParticipant.jsx";
import AddItem from "./components/SplitBill/AddItem.jsx";
import SummaryBill from "./components/Result/SummaryBill.jsx";
import ListItems from "./components/SplitBill/ListItems.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
       <Routes>

               <Route path="/" element={<RedirectLogin/>}/>
               <Route path="/register" element={<UserRegister/>}/>
               <Route path="/login" element={<UserLogin/>}/>

           <Route path="/dashboard">
               <Route path="user">

                   <Route path="profile" element={<UserProfile/>}/>
                   <Route path="logout" element={<UserLogout/>} />
               </Route>

               <Route path="splitnow">
                    <Route index element={<SplitNow/>}/>
                    <Route path="create" element={<CreateEvent/>}/>
                    <Route path=":kegiatanId">
                            <Route path="participant" element={<ListParticipant/>}/>
                            <Route path="add" element={<AddParticipant/>}/>
                            <Route path="addItem">
                                <Route path=":participantId" >
                                    <Route index element={<AddItem/>}/>
                                    <Route path="items" element={<ListItems/>}/>
                                </Route>
                            </Route>
                            <Route path="summary" element={<SummaryBill/>}/>
                    </Route>
               </Route>

           </Route>
       </Routes>
   </BrowserRouter>
  </StrictMode>,
)
