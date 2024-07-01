import Congrats from './assets/congrats.svg'
const End = (props) => {
    return ( 
        <div className="bg-background px-4 py-6 rounded-xl flex flex-col justify-center items-center gap-4 mx-6 sm:mx-0">
            <img src={Congrats} alt="Congrats" />
            <p className='text-white text-lg sm:text-2xl w-3/4 text-center '>Congrats! You completed the quiz.</p>
            <p className='text-white mb-6 text-center text-sm sm:text-base '>you answered {props.correctCount}/10 correctly</p>
            <button className='bg-gradient text-white text-sm sm:text-base sm:font-semibold p-4 mb-8 rounded-xl w-3/5'
                onClick={() => window.location.reload()}
                >
                Play again</button>
        </div>
     );
}
 
export default End;