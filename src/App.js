import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card';

function App() {

  // State:
  const [stack, setStack] = useState('');
  let [count, setCount] = useState(0);
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  // GET
  useEffect(() => {
    axios.get('https://review-movie-sql.herokuapp.com/api/get').then((response) => {
      setMovieReviewList([...response.data]);
    });
  }, [count]);

  // POST
  const submit = () => {
    axios
      .post('https://review-movie-sql.herokuapp.com/api/insert', {
        movieName,
        movieReview,
      })
      .then((res) => {
        
        setStack(res.data);
        setCount(++count);
        setMovieName('');
        setMovieReview('');
      });
  };

// DELETE
  const deleteMovie = (movieName) => {
    axios
      .delete(`https://review-movie-sql.herokuapp.com/delete/${movieName}`)
      .then(() => {
        setCount(++count);
      });
  };

  // PUT
  const updateReview = (movieName, newReview) => {
    axios
      .put('https://review-movie-sql.herokuapp.com/api/update', {
        movieName,
        movieReview: newReview,
      })
      .then(() => {
        setCount(++count);
      });
  };

  return (
    <div className='App'>

      <h1>CRUD APP</h1>

{/* Submit Form */}

      <div className='form'>
        <label htmlFor='movieReview'>Movie name</label>
        <textarea
          type='text'
          name='movieReview'
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
            setStack('');
          }}
        />

        <label htmlFor='review'>Review</label>
        <textarea
          type='text'
          name='review'
          value={movieReview}
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        />

        <button
          onClick={submit}
          disabled={movieName && movieReview ? false : true}
        > Submit </button>

{/*If StackOverflow */}

        {stack ? <h4>Stack overflow! {stack}</h4> : null}

{/* List of Cards */}

        {movieReviewList.map((m) => (
          <Card
            key={m.id}
            title={m.movieName}
            description={m.movieReview}
            updateReview={updateReview}
            deleteMovie={deleteMovie}
          />
        ))}
      </div>
    </div>
  );
}

export default App;