import React from 'react';
import { useFunctions } from '../../useFunctions';
function CopyRight(){
    const {signOutDistroySession} = useFunctions();
    const handleLogout = async () => {
        await signOutDistroySession();  // This handles the logout process and redirects
    };
    
    return(
        <div className='CopyRight' onClick={handleLogout}>
           Copy Right &copy; 2024 Designed by IDEA.
        </div>
    );
}

export default CopyRight;