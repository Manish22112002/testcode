import React, { useState, useEffect } from 'react';

const ApiExample = () => {
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://testmode.ap-south-1.elasticbeanstalk.com/store-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name, // your name state
          surname: surname, // your surname state
          response: data.response,
        }),
      });
      
      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  useEffect(() => {
    // This useEffect is still here if you want to perform any other actions on mount or when name/surname changes.
  }, [name, surname]);

  const handleInputChange = (e) => {
    // Update the input values
    const { name, value } = e.target;

    // Preserve the existing data while updating the input values
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Update the input values directly
    if (name === 'name') {
      setName(value);
    } else if (name === 'surname') {
      setSurname(value);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Surname'
            name='surname'
            value={surname}
            onChange={handleInputChange}
          />
          <button type='submit'>Submit</button>
        </div>
      </form>
      <h1>API Response:</h1>
      <h1>{data.response}</h1>
    </div>
  );
};

export default ApiExample;

// o6MDAwBKIncSwffy
