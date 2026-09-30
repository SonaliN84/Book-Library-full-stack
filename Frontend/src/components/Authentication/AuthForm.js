import { useState, useRef } from "react";
import "./AuthForm.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import { ToastContainer, toast } from "react-toastify";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin && enteredPassword.trim().length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    if (isLogin) {
      axios
        .post(
          "http://127.0.0.1:8000/token",
          {
            username: enteredEmail,
            password: enteredPassword,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          history.replace("/home");
          dispatch(
            authActions.login({
              token: response.data.access_token,
              isAdmin: response.data.is_Admin,
            })
          );
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("isAdmin", response.data.is_Admin);
        })
        .catch((err) => {
          if (err.request.status == 401) {
            alert(err.response.data.detail);
          } else {
            alert("Something went wrong!!");
          }
        });
    } else {
      const enteredName = nameInputRef.current.value;

      axios
        .post("http://127.0.0.1:8000/signup", {
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((response) => {
          alert("You are successfully signed up!!");
          nameInputRef.current.value = "";
          setIsLogin(true);
        })
        .catch((err) => {
          if (err.request.status == 400) {
            alert(err.response.data.detail);
          } else {
            alert("Something went wrong!!");
          }
        });
    }
  };
  return (
    <div className="form-box">
      <div className="form-container">
        <div className="heading">{isLogin ? "Login" : "Sign Up"}</div>
        <form className="form" onSubmit={formSubmitHandler}>
          {!isLogin && (
            <input
              required
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              ref={nameInputRef}
            />
          )}
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            ref={emailInputRef}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordInputRef}
          />

          <button className="login-button" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <div className="sign-up">
            {isLogin ? "Don't have an account? " : "Already have an account?"}
            <span className="sign-up-name" onClick={switchAuthModeHandler}>
              <u>{isLogin ? "Sign Up" : "Login"}</u>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default AuthForm;
