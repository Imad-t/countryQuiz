import Congrats from './assets/congrats.svg'
const End = () => {
    return ( 
        <div className="bg-background px-40 py-12 rounded-lg flex flex-col justify-center items-center gap-10">
            <img src={Congrats} alt="Congrats" />
            <p className='text-white text-2xl'>Congrats! You completed the quiz.</p>
            <p className='tex-white'>your answered {}/10 correctly</p>
            <button className='bg-gradient text-white p-4 rounded-lg'>Play again</button>
        </div>
     );
}
 
export default End;