import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate(); 
    useEffect(()=>{
        navigate("/login");
    }, []);
    return null;
}

function Protected({auth, children }) {  
    console.log("auth",auth);
    return auth ? children : <Logout/>
}
export default Protected