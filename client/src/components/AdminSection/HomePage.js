import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllClassService } from '../../services/classService';
import { getTeachersService } from '../../services/userService';
import '../css/adminHomePage.css';

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllClassService().then((res) => {
      setClasses(res.data);
    });
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
  }, []);

  const getNameViaId = (id) => {
    const teacher = teachers.find((item) => item?.id == id);
    return teacher?.name;
  };

  const classWithTacherName = classes.map((item) => {
    return {
      name: item?.name,
      hrm: getNameViaId(item?.hrm_id),
      math: getNameViaId(item?.math_id),
      english: getNameViaId(item?.english_id),
      literature: getNameViaId(item?.literature_id),
    };
  });

  console.log(classWithTacherName);

  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">
          <Link to="/add-class">
            <button class="btn">
              <span class="btn-text">Add Class</span>
            </button>
          </Link>
          <Link to="/teacher">
            <button class="btn">
              <span class="btn-text">Teacher List</span>
            </button>
          </Link>
        </div>
        <div className="card-body">
          {classWithTacherName.map((item) => {
            return (
              <div className="containerr">
                <div className="card">
                  <div className="card-header"></div>

                  <article className="card-content">
                    <h2 className="secondary-title">Class: {item.name}</h2>
                    <div className="text">Manager Teacher: {item.hrm}</div>
                    <div className="text">Math Teacher: {item.math}</div>
                    <div className="text">English Teacher: {item.english}</div>
                    <div className="text">
                      Literature Teacher: {item.literature}
                    </div>
                  </article>
                  <footer className="card-footer"></footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
