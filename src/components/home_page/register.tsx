import Navbar from '../reusable_component/Navbar'
import axios from 'axios';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { firstnameAtom, isCustomerAtom, isServiceProviderAtom, lastnameAtom, user_emailAtom } from '../state_model/state';
import { baseurl } from './backend';


export default function Register() {

    const [first_Name, setFirstname] = useAtom(firstnameAtom);
    const [last_Name, setLastname] = useAtom(lastnameAtom);
    const [email, setEmail] = useAtom(user_emailAtom);
    const [password, setPassword] = useState("");
    const [is_Customer, setIscustomer] = useAtom(isCustomerAtom);
    const [is_Service_Provider, setIsProvider] = useAtom(isServiceProviderAtom);

    const handleRegister = e => {
        e.preventDefault()

        axios.post(`${baseurl}/auth/register`, {
            first_Name,
            last_Name,
            email,
            password,
            is_Customer,
            is_Service_Provider,
        },
            {
                headers: { "Content-Type": "application/json" }
            }
        )

            .then(response => {
                console.log(response)
                console.log("register succesfully")
            })
            .catch(error => {
                console.error(error)
                alert(error.response?.data?.message || "Registration failed");
            })
    }

    const handleCustomerChange = (e) => {
        setIscustomer(e.target.checked);
        if (e.target.checked) setIsProvider(false);
    };
    const handleProviderChange = (e) => {
        setIsProvider(e.target.checked);
        if (e.target.checked) setIscustomer(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center border border-black rounded-md p-20">
                    <h2 className="text-xl mb-4">Register</h2>
                    <form className="flex flex-col justify-center" onSubmit={handleRegister}>
                        <input
                            className="rounded-full border-black border p-2 m-2"
                            type="text"
                            placeholder="Firstname"
                            value={first_Name}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            className="rounded-full border-black border p-2 m-2"
                            type="text"
                            placeholder="Lastname"
                            value={last_Name}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <input
                            className="rounded-full border-black border p-2 m-2"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="rounded-full border-black border p-2 m-2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={is_Customer}
                                onChange={handleCustomerChange}
                            />
                            <span>Customer</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={is_Service_Provider}
                                onChange={handleProviderChange}
                            />
                            <span>Provider</span>
                        </label>

                        <input
                            className="rounded-md border m-2 bg-blue-400 text-white cursor-pointer p-2"
                            type="submit"
                            value="Register"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
