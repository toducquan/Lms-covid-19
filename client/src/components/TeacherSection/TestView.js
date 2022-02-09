import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllGradeWithTestId } from '../../services/testService';

const TestView = () => {
    const [grades, setGrades] = useState([]);
    const location = useLocation();
  const { testId } = location.state;
  useEffect(() => {
      getAllGradeWithTestId(testId).then((res) => {
          console.log('data ', res.data)
        setGrades(res.data);
      }).catch((err) => console.log('err ', err));
    }, []);
  
    return (
      <>
        <div className="admin-homepage__header">
          <Link to="/test-list">
            <button class="btn">
              <span class="btn-text">Back</span>
            </button>
          </Link>
        </div>
        <table>
          <thead>
            <th>Name</th>
            <th>Grade</th>
          </thead>
          <tbody>
            {grades.map((item) => {
              return (
                <tr>
                  <td data-label="name">{item.student_name}</td>
                  <td data-label="war">{item.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
};

export default TestView;
