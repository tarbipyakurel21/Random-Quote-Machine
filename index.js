import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const QuoteMachine = () => {
  // State for the current quote and author
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Function to fetch a random quote and author
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.log("Error fetching the quote", error);
    }
  };

  // Fetch a new quote when the component loads
  useEffect(() => {
    fetchQuote();
  }, []);

  // Handle the new quote button
  const handleNewQuote = () => {
    fetchQuote();
  };

  // Create the Twitter share URL
  const tweetQuote = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;

  return (
    <div id="quote-box">
      <p id="text">{quote || "Loading..."}</p>
      <p id="author">{author || "Author Name"}</p>
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
      <a id="tweet-quote" href={tweetQuote} target="_blank" rel="noopener noreferrer">
        Tweet Quote
      </a>
    </div>
  );
};

// Rendering the component
ReactDOM.render(<QuoteMachine />, document.getElementById("quote-box"));
