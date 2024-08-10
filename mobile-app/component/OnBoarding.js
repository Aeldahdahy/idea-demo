import React, { useState } from 'react';
import backButtonImage from '../assets/image-0.22.png';
import GetStarted1 from './GetStarted1';
import GetStarted2 from './GetStarted2';
import GetStarted3 from './GetStarted3';
import GetStarted4 from './GetStarted4';
import GetStarted5 from './GetStarted5';

export default function OnBoarding({ onComplete  }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleNext = () => {
        if (currentPage < 5) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSkip = () => {
        setCurrentPage(5); 
        onComplete();
    };

    return (
        <>
            {currentPage === 1 && <GetStarted1 onNext={handleNext} onSkip={handleSkip} />}
            {currentPage === 2 && <GetStarted2 onNext={handleNext} onBack={handleBack} onSkip={handleSkip} onBackImage={backButtonImage} />}
            {currentPage === 3 && <GetStarted3 onNext={handleNext} onBack={handleBack} onSkip={handleSkip} onBackImage={backButtonImage} />}
            {currentPage === 4 && <GetStarted4 onNext={handleNext} onBack={handleBack} onSkip={handleSkip} onBackImage={backButtonImage} />}
            {currentPage === 5 && <GetStarted5 onBack={handleBack} onBackImage={backButtonImage} onComplete={onComplete} />}
        </>
    );
}
