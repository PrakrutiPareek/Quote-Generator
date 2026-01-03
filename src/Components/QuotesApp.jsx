import {useState} from "react";

const QuotesApp = () => {
  const [quote, setQuote] = useState({
    text: "Ask not what your country can do for you; ask what you can do for your country",
    author: "John Kennedy",
  });
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const NewQuote = async () => {
    const url = "https://api.api-ninjas.com/v2/randomquotes?";
    const response = await fetch(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    const data = await response.json();
    setQuote({
      text: data[0].quote,
      author: data[0].author,
    });
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const addFavorites = () => {
    const isAlreadyFav = favorites.some(
      (fav) => fav.text === quote.text && fav.author === quote.author
    );
    if (!isAlreadyFav) {
      setFavorites([...favorites, quote]);
    }
  };

  const favoritesList = favorites.map((favQuote, index) => {
    return (
      <div className="fav-quote" key={index}>
        <div className="fav-quote-delete">
          <i
            className="bx-x-circle"
            onClick={() => {
              const updatedFav = favorites.filter((item, i) => i !== index);
              setFavorites(updatedFav);
            }}
          />
        </div>
        <div className="fav-quote-content">
          <div className="fav-quote-text">{favQuote.text}</div>
          <div className="fav-quote-author">{favQuote.author}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quote.</h1>
        <i className="bx bxs-heart fav-icon" onClick={toggleFavorites}></i>
        <div className="quote">
          <p className="quote-text">
            <i className="bx bxs-quote-left" />
            {quote.text} <i className="bx bxs-quote-right right-quote" />
          </p>
          <p className="quote-author">-- {quote.author}</p>
        </div>
        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
        <div className="buttons">
          <button className="btn btn-new" onClick={NewQuote}>
            New Quote
          </button>
          <button className="btn btn-fav" onClick={addFavorites}>
            Add to Favorite
          </button>
        </div>
        {showFavorites && (
          <div className="favorites">
            <button className="btn-close">
              <i className="bx bx-x" onClick={toggleFavorites}></i>
            </button>
            {favoritesList}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;
