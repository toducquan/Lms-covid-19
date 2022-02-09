import React, { useState, useEffect } from 'react';
import { getTeachersService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { addClassService } from '../../services/classService';

const AddClass = () => {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [hrm, setHrm] = useState();
  const [math, setMath] = useState();
  const [english, setEnglish] = useState();
  const [literature, setLiterature] = useState();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
  }, []);

  const handleSubmitForm = () => {
      console.log('math', hrm, typeof parseInt(hrm))
    addClassService({
      name: name,
      hrm_id: parseInt(hrm),
      math_id: parseInt(math),
      english_id: parseInt(english),
      literature_id: parseInt(literature)
    })
      .then(() => {
        return navigate('/');
      })
      .catch((err) => console.log('err ', err));
  };

  return (
    <div className="add-teacher">
      <form id="survey-form">
        <div className="form-group">
          <label id="name-label" for="name">
            Name <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <p>Manager teacher?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e) => setHrm(e.target.value)}>
            {teachers.map((item) => {
                return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <div class="form-group">
          <p>Math teacher?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e) => setMath(e.target.value)}>
            {teachers.map((item) => {
                return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <div class="form-group">
          <p>English teacher?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e) => setEnglish(e.target.value)}>
            {teachers.map((item) => {
                return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <div class="form-group">
          <p>Literature teacher?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e) => setLiterature(e.target.value)}>
            {teachers.map((item) => {
                return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        
        <div
          className="form-group submit-button"
          onClick={() => handleSubmitForm()}
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default AddClass;
