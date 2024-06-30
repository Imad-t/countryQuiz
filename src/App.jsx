import { useState,useEffect } from 'react'
import Question from "./Question"

function App() {
  const [data,setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [index,setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // Shuffle the array
        const shuffled = result.sort(() => 0.5 - Math.random());

        setData(shuffled);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) {
    return <div className="bg-[url('./assets/bg.jpg')] min-h-screen flex items-center justify-center text-6xl text-white">Loading...</div>;
  }else if (error) { 
    return <div className="bg-[url('./assets/bg.jpg')] min-h-screen">Error: {error.message}</div>;
  }else if(data){

  return (
    
    <div className=" bg-[url('./assets/bg.jpg')] min-h-screen flex flex-col justify-center items-center">
      <Question {
        ...{
          index: index,
          setIndex: setIndex,
          question: "What is the capital of Nigeria",
          options: ["Lagos", "Abuja", "Kano", "Ibadan"],
          answer: "Abuja",
          correctCount: correctCount,
          setCorrectCount: setCorrectCount
        }
      }/>
    </div>
  )
}
}


export default App
