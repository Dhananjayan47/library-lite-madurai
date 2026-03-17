<<<<<<< HEAD
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const AdminLogin = () => {
    const navigate= useNavigate()
    const [fieldInputs, setFieldInputs] = useState({ name:'', password:''});
    const [disableBtn, setDisableBtn] = useState(false);
    const [errNotify, setErrNotify] = useState({ show:false,msg:'' });
    const location = useLocation();
    const exitMsg = location.state;
    const dummyId={name:'vijay', password:'2026'}
   const handleInput =(e)=>{
    const {name,value}=e.target;
=======

import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
>>>>>>> ca208d97dce73e66a1029c804853498745d059c0

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="bg-secondary col-12 col-md-6 col-lg-4 p-4 text-light border rounded shadow-sm">
            <h3 className="mb-4">Admin Login</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="userName"
                  className="form-control border border-2 "
                  placeholder="Enter admin username"
                />

<<<<<<< HEAD
   const handleValidation= (e)=>{
    e.preventDefault()
    setDisableBtn(true);
    if(fieldInputs.name === dummyId.name && fieldInputs.password ===dummyId.password){
        navigate('/admin-page');
        return;
    }
    setErrNotify( {show:true,msg:'Wrong identity'} )
    setTimeout(() => {
        setErrNotify({ show:false,msg:'' });
        setDisableBtn(false)
    }, 1500);
   }
   
   
    return (
      <section className="flex-fill mx-4 mx-sm-1 my-5">
        <div className="container ">
          <div className="row justify-content-center">
            <div  className={`${ errNotify.show ? 'bg-danger' : 'bg-secondary'} col-12 col-md-6 col-lg-4 p-4 text-light border rounded shadow-sm`}>
              <h3 className="mb-4">Admin Login</h3>
              <form onSubmit={handleValidation}>
                <div className="mb-4">
                  <label htmlFor="userName" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={fieldInputs.name}
                    onChange={handleInput}
                    id="userName"
                    className="form-control border border-2 "
                    placeholder="Enter admin username"
                    required
                    
                  />
                
                  <label htmlFor="userPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    onChange={handleInput}
                    value={fieldInputs.password}
                    id="userPassword"
                    className="form-control border border-2 "
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <button type="submit" className=" mb-3 btn btn-primary w-100"  disabled={disableBtn} >
                  Login
                </button>
                <p >{ errNotify.show ? errNotify.msg :'Admin only page'}</p>
              </form>
            </div>
=======
                <label htmlFor="userPassword" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="userPassword"
                  className="form-control border border-2 "
                  placeholder="Enter admin password"
                />
              </div>
              <button
                onClick={() => navigate("/admin-page")}
                className=" mb-3 btn btn-primary w-100"
              >
                Login
              </button>
            </form>
>>>>>>> ca208d97dce73e66a1029c804853498745d059c0
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
