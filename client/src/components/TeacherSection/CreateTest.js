import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClassService } from '../../services/classService';
import { addTestService } from '../../services/testService';

const CreateTest = () => {
  let navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [ans, setAns] = useState([]);

  const [title, setTitle] = useState();
  const [ques, setQues] = useState();
  const [firstAns, setFirstAns] = useState();
  const [sencondAns, setSecondAns] = useState();
  const [thirdAns, setThirdAns] = useState();
  const [fourthAns, setFourthAns] = useState();
  const [correctAns, setCorrectAns] = useState();
  const [classes, setClasses] = useState([]);
  const [deadline, setDeadline] = useState();
  const [factor, setFactor] = useState();
  const [classId, setClassId] = useState();

  const questionData = [...questions];
  const conrrectData = [...ans];

  useEffect(() => {
    getAllClassService().then((res) => {
      setClasses(res.data);
    });
  }, []);

  const handleSubmitTest = () => {
    const test = {
      class_id: parseInt(classId),
      deadline: deadline,
      factor: parseInt(factor),
      question: {
        title: title,
        content: questions,
        correct_ans: ans,
      },
    };
    addTestService(test)
      .then(() => {
        return navigate('/test-list');
      })
      .catch((err) => console.log('err: ', err));
  };

  const handleAddNewQuestion = () => {
    const newQues = {
      ques: ques,
      ans: [firstAns, sencondAns, thirdAns, fourthAns],
    };
    console.log(conrrectData);
    questionData.push(newQues);
    setQuestions(questionData);
    conrrectData.push(parseInt(correctAns));
    setAns(conrrectData);
  };

  return (
    <div>
      <form id="survey-form">
        <div className="form-group">
          <label id="name-label" for="name">
            Title <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="name-label" for="name">
            Deadline <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="name-label" for="name">
            Faftor <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFactor(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <p>Select class?</p>
          <select
            id="dropdown"
            name="role"
            className="form-control"
            onChange={(e) => setClassId(e.target.value)}
          >
            {classes.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>
        {questions.map((item) => {
          return (
            <div className="form-group">
              <p>{item.ques}</p>
              {item.ans.map((ans) => {
                return (
                  <p>
                    <input
                      name="user-recommend"
                      value="definitely"
                      type="radio"
                      className="input-radio"
                      checked
                    />
                    {ans}
                  </p>
                );
              })}
            </div>
          );
        })}

        <div className="form-group">
          <p>
            <input
              className="question"
              onChange={(e) => setQues(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value={0}
              type="radio"
              defaultChecked
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e) => setFirstAns(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value={1}
              type="radio"
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e) => setSecondAns(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value="definitely"
              value={2}
              type="radio"
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e) => setThirdAns(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value="definitely"
              value={3}
              type="radio"
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e) => setFourthAns(e.target.value)}
            />
          </p>
        </div>
        <div
          className="form-group submit-button submit-button__ques"
          onClick={() => handleAddNewQuestion()}
        >
          Create
        </div>
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

export default CreateTest;
