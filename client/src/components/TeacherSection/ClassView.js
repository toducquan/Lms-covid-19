import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStudentInClassService } from '../../services/userService';

const ClassView = () => {
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const { isManager, classId } = location.state;
  console.log('manager ', isManager)
  useEffect(() => {
    getStudentInClassService(classId).then((res) => {
        setStudents(res.data);
    });
  }, []);

  return (
    <>
      <div className="admin-homepage__header">
        <Link to="/">
          <button class="btn">
            <span class="btn-text">Back</span>
          </button>
        </Link>
        {isManager && (
          <Link to="/add-teacher">
            <button class="btn">
              <span class="btn-text">Add Student</span>
            </button>
          </Link>
        )}
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Dob</th>
          <th>Total point</th>
        </thead>
        <tbody>
          {students.map((item) => {
            return (
              <tr>
                <td data-label="name">{item.name}</td>
                <td data-label="war">{item.email}</td>
                <td data-label="ba">{item.age}</td>
                <td data-label="obp">{item.dob}</td>
                <td data-label="slg">{item.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ClassView;
