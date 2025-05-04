import React from 'react';
import {useFunctions} from '../../useFunctions';

function CopyRight(){
    const {signOutDistroySession} = useFunctions();

    const handleSignOut = () => {
        signOutDistroySession();
      };

    return(
        <div className='CopyRight' onClick={handleSignOut}>
           Copy Right &copy; {new Date().getFullYear()}  Designed by IDEA.
        </div>
    );
}

export default CopyRight;