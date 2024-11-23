import axios from "axios";
import { useState } from "react";
import { signupInputs } from "@tanmaygupta22003/medium-common";
import { InputBar, InputLabel } from "./UtilFunction";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const [inputs, setInputs] = useState<signupInputs>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        baseURL: BACKEND_URL,
        url: "/api/v1/user/signup",
        data: inputs,
        responseType: 'json'
      });
  
      const jwtToken = response.data.jwtToken;

      localStorage.setItem('token', jwtToken);
      navigate('/blogs')

    } catch (error) {
      console.log(error);
      console.log("Form Submission failed!!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  return (
    <div className="flex justify-center items-center drop-shadow-lg py-10 px-9 rounded-lg bg-slate-50">
      <div className="flex flex-col min-w-64">
        <div className="text-center">
          <div className="text-3xl font-bold font-sans">Create an Account</div>
          <div className="text-slate-500 text-sm">
            <span>Already have an account?</span>
            <a className="underline ml-2 hover:font-medium" href="/signin">
            Login
            </a>
          </div>
        </div>

        <form onSubmit={sendRequest} className="mt-6">
          <div className="flex flex-col">
            <InputLabel htmlFor="name">Name</InputLabel>
            <InputBar
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mt-3">
            <InputLabel htmlFor="email">Email</InputLabel>
            <InputBar
              id="email"
              type="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mt-3">
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputBar
              id="password"
              type="password"
              placeholder="Minimum 6 characters"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-5 bg-black text-white text-xs font-medium rounded-md focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-inset"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

