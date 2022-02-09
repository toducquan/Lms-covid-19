import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { studentDoTest } from '../../services/testService';

const DoTest = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [correctAns, setCorrectAns] = useState([]);
  const { testId, questions } = location.state;

  const handleSelect = (value, index) => {
    const answer = [...correctAns];
    answer[index] = parseInt(value);
    console.log(answer);
    setCorrectAns(answer);
  };

  const handleSubmitTest = () => {
    studentDoTest(testId, {
      answer: correctAns,
    })
      .then(() => {
        return navigate('/');
      })
      .catch((err) => console.log('err: ', err));
  };

  return (
    <div>
      <form id="survey-form">
        <div className="form-group">
          <label id="name-label" for="name">
            Test: {questions.title}
          </label>
        </div>
        {questions.content.map((item, key) => {
          return (
            <div className="form-group">
              <p>{item.ques}</p>
              {item.ans.map((ans, index) => {
                return (
                  <p>
                    <input
                      name={`ques-${key}`}
                      value={index}
                      type="radio"
                      className="input-radio"
                      onChange={(e) => handleSelect(e.target.value, key)}
                    />
                    {ans}
                  </p>
                );
              })}
            </div>
          );
        })}
        <div
          className="form-group submit-button"
          onClick={() => handleSubmitTest()}
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default DoTest;
