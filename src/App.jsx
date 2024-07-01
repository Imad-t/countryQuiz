  import { useState, useEffect } from 'react';
  import Question from "./Question";
  import End from './End';

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
          const filtered = result.filter((country) => country.name.common !== 'Israel');
          const shuffled = filtered.sort(() => 0.5 - Math.random());
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
      const getRandomQuestion = (countryData) => {
        const templates = [];
      
        // Randomly select one of these questions
        const questionType = Math.floor(Math.random() * 3);
      
        switch (questionType) {
          case 0:
            templates.push(`In which country is ${countryData.capital[0]} the capital?`);
            break;
          case 1:
            templates.push(`Which country's flag is ${countryData.flag}?`);
            break;
          case 2:
            if (countryData.languages && Object.keys(countryData.languages).length > 0) {
              const languageCode = Object.keys(countryData.languages)[0]; // Assuming only one language for simplicity
              templates.push(`In which country is the official language ${countryData.languages[languageCode]}?`);
            }
            break;
          default:
            break;
        }
      
        // Return a randomly selected question template
        const randomIndex = Math.floor(Math.random() * templates.length);
        return templates[randomIndex];
      };
      
      
      

      if (data.length > 0 && index < data.length) {
        const currentCountry = data[index];
        const otherCountries = data.filter((c) => c !== currentCountry).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [currentCountry.name.common, ...otherCountries.map((c) => c.name.common)].sort(() => 0.5 - Math.random());
        const selectedQuestion = getRandomQuestion(currentCountry);
        
        setQuestion(selectedQuestion);
        setOptions(options);
        setAnswer(currentCountry.name.common);
      }
    }, [data, index]);

    const handleNextQuestion = () => {
      setIndex((prevIndex) => prevIndex + 1);
    };

    if (loading) {
      return <div className="bg-[url('./assets/bg.jpg')] min-h-screen flex items-center justify-center text-6xl text-white">Loading...</div>;
    } else if (error) {
      return <div className="bg-[url('./assets/bg.jpg')] min-h-screen">Error: {error.message}</div>;
    } else if(data) {
      console.log(data)
      return (
        <div className="bg-[url('./assets/bg.jpg')] min-h-screen flex flex-col justify-center items-center font-body">
          {index < 10 ? (
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
          ) : (
            <End correctCount={correctCount} />
          )}
        </div>
      );
    }
  }

  export default App;
