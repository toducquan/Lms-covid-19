import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeachersService } from '../../services/userService';
import { getAllClassOfTeacher } from '../../services/classService';
import { getUserService } from '../../services/authService';

const HomePageTeacher = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    getAllClassOfTeacher().then((res) => {
      setClasses(res.data);
    });
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
    getUserService().then((res) => {
        setTeacher(res.data)
    })
  }, []);

  const getNameViaId = (id) => {
    const teacher = teachers.find((item) => item?.id == id);
    return teacher?.name;
  };

  const classWithTacherName = classes.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      hrm_id: item?.hrm_id,
      hrm: getNameViaId(item?.hrm_id),
      math: getNameViaId(item?.math_id),
      english: getNameViaId(item?.english_id),
      literature: getNameViaId(item?.literature_id),
    };
  });

  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">
          <Link to="/add-class">
            <button class="btn">
              <span class="btn-text">Teacher Information</span>
            </button>
          </Link>
          <Link to="/test-list">
            <button class="btn">
              <span class="btn-text">Test List</span>
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
                    <h2 className="secondary-title manager">
                      Class: {item.name}
                      {teacher.id = item.hrm_id && (<span>(Manager)</span>)}
                    </h2>
                    <div className="text">Manager Teacher: {item.hrm}</div>
                    <div className="text">Math Teacher: {item.math}</div>
                    <div className="text">English Teacher: {item.english}</div>
                    <div className="text">
                      Literature Teacher: {item.literature}
                    </div>
                  </article>
                  <footer className="card-footer">
                    <Link
                      to="/view-class"
                      state={{
                        isManager: true,
                        classId: item.id,
                      }}
                    >
                      <button class="btn">
                        <span class="btn-text">View class</span>
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

export default HomePageTeacher;
