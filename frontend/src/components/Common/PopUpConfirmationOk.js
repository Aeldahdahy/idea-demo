import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePopup } from '../../redux/checkpopupSlice';

function PopUpConfirmationOk() {
    const dispatch = useDispatch();
    const { isOpen, message, buttonText, type, gif } = useSelector((state) => state.checkPopup);
    const videoRef = useRef(null); // Reference for the video element

    // Ensure the GIF/video reloads when the popup opens
    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.currentTime = 0; // Reset video to start
            videoRef.current.play(); // Ensure it plays
        }
    }, [isOpen]);

    if (!isOpen) return null; // Don't render if popup is closed

    return (
        <div className='PopUpContainer'>
            <div className='PopUpOverlay' onClick={() => dispatch(closePopup())}></div>
            <div className={`PopUpContent ${type}`}>
                {gif && (
                    <video ref={videoRef} src={gif} autoPlay loop muted playsInline preload="auto" />
                )}
                <span>{message}</span>
                <button onClick={() => dispatch(closePopup())}>{buttonText}</button>
            </div>
        </div>
    );
}

export default PopUpConfirmationOk;
