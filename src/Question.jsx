import { useState, useEffect } from 'react';
import CheckSvg from './assets/Check_round_fill.svg';
import CrossSvg from './assets/Close_round_fill.svg';

const Question = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [oneClick, setOneClick] = useState(false);

    useEffect(() => {
        // Reset the selected option and one-click state when index changes
        setSelectedOption(null);
        setOneClick(false);
    }, [props.index]);

    const handleClick = (ans) => {
        if (!oneClick) {
            setOneClick(true);
            setSelectedOption(ans);
            if (ans === props.answer) {
                props.setCorrectCount(props.correctCount + 1);
            }
            setTimeout(() => {
                props.setIndex((prevIndex) => (prevIndex + 1)); // Cycle through 10 questions
            }, 1000);
        }
    };

    const isCorrect = (option) => {
        return option === props.answer;
    };

    return (
        <div className="w-11/12 sm:w-3/4 md:w-2/3 bg-background px-4  py-4 md:py-10 rounded-xl flex flex-col justify-center items-center gap-10 ">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-gray font-bold text-xs md:text-sm">Country Quiz</h1>
                <ul className="flex gap-1 sm:gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <li
                            key={i}
                            className={`rounded-full h-5 w-5 sm:h-6 sm:w-6 md:w-10 md:h-10 lg:h-12 lg:w-12 flex items-center justify-center 
                                text-white text-xs md:text-base md:font-semibold ${i === props.index ? 'bg-gradient' : 'bg-button'}`}
                        >
                            {i + 1}
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-white font-medium text-base text-center sm:text-lg md:text-xl">{props.question}</p>
            <ul className="grid grid-cols-2 gap-4 md:gap-6 mb-8 w-5/6 sm:w-3/4 md:w-2/3">
                {props.options.map((option, index) => (
                    <li
                        key={index}
                        className="bg-button hover:bg-gradient cursor-pointer h-12 md:h-16 w-full rounded-lg flex justify-center items-center
                         text-white text-xs text-center md:text-base sm:font-semibold break-all"
                        onClick={() => handleClick(option)}
                    >
                        {option}
                        {selectedOption && (
                            <span className="ml-2">
                                {selectedOption === option && (isCorrect(option) ? <img src={CheckSvg} alt="Check svg" /> : <img src={CrossSvg} alt="Cross svg" />)}
                                {selectedOption !== option && isCorrect(option) && <img src={CheckSvg} alt="Check svg" />}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
