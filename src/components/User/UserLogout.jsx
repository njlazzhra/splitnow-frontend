import {useEffectOnce, useLocalStorage} from "react-use";
import {userLogout} from "../../lib/api/UserApi.jsx";

import {useNavigate} from "react-router";
import {alertError} from "../../lib/alert.js";

export default function UserLogout(){

    const [token, setToken] = useLocalStorage("token", "")
    const navigate = useNavigate()

    async function handleLogout(){
        //langsung aja suruh si fetch api tadi untuk request logout
        /* await navigate({
             pathname : '/login'
         }) */

        // diatas untuk uji coba tanpa server

        const response = await userLogout(token)
        const responseBody = await response.json()
        console.log(responseBody)
        if(response.status === 200){
            setToken("")
            await navigate({
                pathname : '/login'
            })

        }else {
            await alertError(responseBody.errors)
        }
    }

    useEffectOnce(() => {
        handleLogout()
            .then( () => console.log("logout succesfully"))
    })

    return <>

    </>
}