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
                props.setIndex((prevIndex) => (prevIndex + 1) % 10); // Cycle through 10 questions
            }, 2000);
        }
    };

    const isCorrect = (option) => {
        return option === props.answer;
    };

    return (
        <div className="w-2/3 bg-background px-40 py-12 rounded-lg flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-gray">Country Quiz</h1>
                <ul className="flex gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <li
                            key={i}
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${i === props.index ? 'bg-gradient' : 'bg-button'}`}
                        >
                            {i + 1}
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-white ">{props.question}</p>
            <ul className="grid grid-cols-2 gap-6 w-full mb-8">
                {props.options.map((option, index) => (
                    <li
                        key={index}
                        className="bg-button hover:bg-gradient cursor-pointer h-16 w-full rounded-lg flex justify-center items-center text-white"
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
