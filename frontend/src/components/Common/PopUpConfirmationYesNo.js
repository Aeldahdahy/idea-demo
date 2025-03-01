import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePopup } from '../../redux/yesNoPopupSlice';
import { X } from 'lucide-react';

function PopUpConfirmationYesNo() {
    const dispatch = useDispatch();
    const { isOpen, message, buttonYes, buttonNo, type } = useSelector((state) => state.yesNoPopup);

    if (!isOpen) return null; // Don't render if popup is closed

    return (
        <div className='yesNoPopUpContainer'>
            {/* Overlay */}
            <div className='PopUpOverlay' onClick={() => dispatch(closePopup())}></div>


            {/* Popup Content */}
            <div className={`PopUpContent ${type}`}>

                {/* Header */}
                <div className='yesNoPopUpHeader'>
                    <span className='popupTitle'>Confirmation</span>
                    <span className='close-btn' onClick={() => dispatch(closePopup())}>
                        <X size={18} />
                    </span>
                </div>

                <span className='popupMessage'>{message}</span>
                <div className='yesNoBtnContainer'>
                    <button className='yes-btn' onClick={() => dispatch(closePopup())}>{buttonYes}</button>
                    <button className='no-btn' onClick={() => dispatch(closePopup())}>{buttonNo}</button>
                </div>
            </div>
        </div>
    );
}

export default PopUpConfirmationYesNo;
