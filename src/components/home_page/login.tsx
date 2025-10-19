import { useState } from "react";
import Navbar from "../reusable_component/Navbar";
import axios from 'axios';
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { bearertokenAtom, isLoggedInAtom, userAtom } from "../state_model/state"
import { baseurl } from "./backend";


export default function Login() {



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [, setUser] = useAtom(userAtom)
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setToken] = useAtom(bearertokenAtom);

  const handlelogin = e => {
    e.preventDefault();

    axios
      .post(`${baseurl}/auth/login`, { email, password })
      .then(response => {
        const userData = {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          is_customer: response.data.is_customer,
          is_servive_provider: response.data.is_provider,
        };

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setToken(response.data.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(error => {
        console.error(error);
        console.log(error.response?.data?.message || "Login failed");
      });
  };



  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center border border-black rounded-md p-20">

          <h2 className="text-xl mb-4">{isLoggedIn ? "Login" : "Logout"}</h2>
          <form
            className="flex flex-col justify-center"
            onSubmit={handlelogin}
          >
            <input
              className="rounded-full border-black border p-2 m-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              className="rounded-full border-black border p-2 m-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="rounded-md border m-2 bg-blue-400 text-white cursor-pointer p-2"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    </>
  );
}

