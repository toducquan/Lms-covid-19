import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTestsOfStudentService } from '../../services/testService';

const TestList = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    getTestsOfStudentService().then((res) => {
      console.log('data ', res.data)
      setTest(res.data);
    });
  }, []);
  return (
    <>
      <div className="admin-homepage">
        <div className="card-body">
          {test.map((item) => {
            return (
              <div className="containerr">
                <div className="card">
                  <div className="card-header test-list"></div>
                  <article className="card-content">
                    <h2 className="secondary-title manager">
                      {item.question.title}
                    </h2>
                    <div className="text">Deadline: {item.deadline}</div>
                    <div className="text">Factor: {item.factor}</div>
                  </article>
                  <footer className="card-footer">
                    <Link
                      to="/do-test"
                      state={{
                        testId: item.id,
                        questions: item.question 
                      }}
                    >
                      <button class="btn">
                        <span class="btn-text">View test</span>
                      </button>
                    </Link>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TestList;
