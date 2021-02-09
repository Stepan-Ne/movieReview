import React, { useState } from 'react';

function Card({ title, description, deleteMovie, updateReview }) {
  const [change, setChange] = useState(false);
  const [state, setState] = useState(description);

  const setUpdate = () => {
    if (state.trim() === title) {
      setChange(false);
      return;
    }
    updateReview(title, state);
    setChange(false);
  };

  return (
    <div className='card'>
      <h3>{title}</h3>
      {!change ? (
        <p>{description}</p>
      ) : (
        <p>
          <input
            name='review'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button onClick={setUpdate}> + </button>
        </p>
      )}

      <button onClick={() => deleteMovie(title)}>Delete</button>
      <button onClick={() => setChange(true)} disabled={change}>
        Update
      </button>
    </div>
  );
}

export default Card;