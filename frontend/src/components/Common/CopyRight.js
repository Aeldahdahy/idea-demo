import React from 'react';
import { useFunctions } from '../../useFunctions';

function CopyRight(){
    const {signOutDistroySession} = useFunctions();
    const handleSignOut = () => {
        signOutDistroySession();
    };
    return(
        <div className='CopyRight' onClick={handleSignOut}>
           Copy Right &copy; 2024 Designed by IDEA.
        </div>
    );
}

export default CopyRight;