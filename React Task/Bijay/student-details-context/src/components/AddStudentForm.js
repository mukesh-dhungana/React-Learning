import React, { useState, useContext } from "react";
import { StudentDetailContext } from "../context/StudentDetailContext";
import { StudentListContext } from "../context/StudentListContext";
import AddedResult from "./AddedResult";
import AddStudentResultForm from "./AddStudentResultForm";
import useForm from "./validation/useForm";
import { validateInfo } from "./validation/FormValidation";

const AddStudentForm = ({ close }) => {
  

  const [, studentListDispatch] = useContext(StudentListContext);

  const [, studentResultDispatch] = useContext(StudentDetailContext);

  const [addResult, setAddResult] = useState(false);

  const [formValid, setFormValid] = useState(false)

  // const [studentInfo] = useState();
  // const [resultsInfo, setResultsInfo] = useState({});
  const [allresultsInfo, setAllResultsInfo] = useState([]);
  const handleAddResult = () => {
    setAddResult(!addResult);
  };

  const handleCancelResult = () => {
    if (addResult) {
      setAddResult(false);
    }
  };

  // const handleInputChange = e => {
  //   setStudentInfo(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleResultInfo = result => {
    console.log("Results", allresultsInfo);
    setAllResultsInfo([...allresultsInfo, result]);
    handleAddResult();
  };
  // console.log("results=> ", allresultsInfo);

  const handleSubmitForm = e => {

      const forId = Date.now();
      studentListDispatch({
        type: "ADD_STUDENT",
        payload: {
          id: forId,
          ...values,
        },
      });
      studentResultDispatch({
        type: "ADD_RESULT",
        payload: {
          id: Date.now() + 1,
          student_id: forId,
          results: [...allresultsInfo],
        },
      });
      close(false);
      // setIsSubmitting(false)
    
    
  };

  const handleDeleteResult = (resultId) => {
    console.log('Deleted', resultId, allresultsInfo);
    setAllResultsInfo(allresultsInfo.filter(res => res.id !== resultId))
  }

  const { handleChange, values, handleSubmit, errors } = useForm(
    validateInfo, handleSubmitForm
  );
  return (
    <>
      <form className="" onSubmit={(e)=>handleSubmit(e)}>
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Student Name"
              name="student_name"
              onChange={handleChange}
              value={values.student_name}
            />
            {errors.studentName && (
              <p className="errors">{errors.studentName}</p>
            )}
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Student Email"
              name="student_email"
              onChange={handleChange}
              value={values.student_email}
            />
            {errors.studentEmail && (
              <p className="errors">{errors.studentEmail}</p>
            )}
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Student Address"
              name="student_address"
              onChange={handleChange}
              value={values.student_address}
            />
            {errors.studentAddress && (
              <p className="errors">{errors.studentAddress}</p>
            )}
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Student Contact Number"
              name="student_contactNo"
              onChange={handleChange}
              value={values.student_contactNo}
            />
            {errors.studentContact && (
              <p className="errors">{errors.studentContact}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-info"
              onClick={handleAddResult}
            >
              Add Result
            </button>
          </div>
        </div>
        {allresultsInfo.length > 0 && (
          <AddedResult allresultsInfo={allresultsInfo} handleDeleteResult={handleDeleteResult} />
        )}
        {addResult && (
          <AddStudentResultForm
            handleCancelResult={handleCancelResult}
            handleResultInfo={handleResultInfo}
            handleInputChange={handleChange}
            
          />
        )}

        <div className="modal-footer form-submit-btn">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!formValid}
          >
            Save Entry
          </button>
        </div>
      </form>
    </>
  );
};

export default AddStudentForm;
