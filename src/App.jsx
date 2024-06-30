import { useState, useEffect } from 'react';
import Question from "./Question";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
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

  useEffect(() => {
    if (data.length > 0) {
      const currentCountry = data[index];
      const otherCountries = data.filter((c) => c !== currentCountry).sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [currentCountry.capital[0], ...otherCountries.map((c) => c.capital[0])].sort(() => 0.5 - Math.random());
      setQuestion(`What is the capital of ${currentCountry.name.common}?`);
      setOptions(options);
      setAnswer(currentCountry.capital[0]);
      console.log(index);
    }
  }, [data, index]);

  const handleNextQuestion = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  if (loading) {
    return <div className="bg-[url('./assets/bg.jpg')] min-h-screen flex items-center justify-center text-6xl text-white">Loading...</div>;
  } else if (error) {
    return <div className="bg-[url('./assets/bg.jpg')] min-h-screen">Error: {error.message}</div>;
  } else if (data.length > 0) {
    console.log(data);
    return (
      <div className="bg-[url('./assets/bg.jpg')] min-h-screen flex flex-col justify-center items-center">
        <Question
          index={index}
          setIndex={setIndex}
          question={question}
          options={options}
          answer={answer}
          correctCount={correctCount}
          setCorrectCount={setCorrectCount}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default App;
