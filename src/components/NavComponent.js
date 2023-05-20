import { Button,IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {getToken,logOut} from '../services/authorize';
import { useNavigate } from 'react-router-dom';

//---icon---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

const Navcomponent = () =>{
    const navigate = useNavigate()
    return(
        <>  
            <div className="w-full flex justify-end space-x-2 items-center">
                { getToken() ? 
                    <>  
                        <Link to="/create">
                        <IconButton size="md">
                            <FontAwesomeIcon icon={faPlus} />
                        </IconButton>
                        </Link>
                        
                        <Button onClick={()=>{logOut(),navigate('/')}} color="red" variant="outlined" size="md" >Sign out</Button>
                        
                    </>
                    :
                    <Link to="/login">
                        <Button size="md" >Sign in</Button>
                    </Link>
                }
                
            </div>
            
        </>
    )
}

export default Navcomponent