import axios from "axios";
import { useState } from "react";
import { signinInputs } from "@tanmaygupta22003/medium-common";
import { InputBar, InputLabel } from "./UtilFunction";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SigninForm = () => {
  const [inputs, setInputs] = useState<signinInputs>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        baseURL: BACKEND_URL,
        url: "/api/v1/user/signin",
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
      <div className="flex flex-col min-w-60">
        <div className="text-center">
          <div className="text-4xl font-bold font-sans">Log In</div>
          <div className="text-slate-500 text-sm mt-2">
            <span>Don't have an account?</span>
            <a className="underline ml-2 hover:font-medium" href="/signup">
              Sign Up
            </a>
          </div>
        </div>

        <form onSubmit={sendRequest} className="mt-6">
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

