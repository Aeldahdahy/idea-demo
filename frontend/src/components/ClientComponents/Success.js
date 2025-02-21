import React from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

function Success({ setStep, AddDesignFormClass, HeaderMessage, SubTextMessage, formDirection }) {
  return (
    <form className={AddDesignFormClass} >
        <div className='SuccessverificationImage'>
          <FontAwesomeIcon icon="fa-solid fa-check" />
        </div>
        <h2>{HeaderMessage}</h2>
        <p>{SubTextMessage}</p>
        <button type="submit" onClick={() => formDirection === 'signup' ? setStep('signup') : setStep('signIn')} className="btn solid backToSignInButton">
          {formDirection === 'signup' ? 'Go To Sign In' : 'Back To Sign In'}
        </button>
      </form>
  );
}

export default Success;
