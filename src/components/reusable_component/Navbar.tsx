import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { bearertokenAtom, isLoggedInAtom, userAtom } from "../state_model/state";
import axios from 'axios';
import { baseurl } from "../home_page/backend";



function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(bearertokenAtom);



  const handleAuthClick = () => {
    if (isLoggedIn) {

      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handlelogout = async e => {
    e.preventDefault()

    const token = localStorage.getItem("token");

    axios.post(
      `${baseurl}/logout/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        console.log(response)
        navigate("/");
        setIsLoggedIn(false)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        setIsLoggedIn(false);
      }
      )
      .catch(error => console.log(error))

  }

  const handleRegister = () => {
    if (isLoggedIn) {
      navigate("/")
    } else navigate("/register");
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <>
      <nav>
        <ul className="flex justify-center items-center space-x-6 list-none p-0 w-full h-15 bg-amber-300">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/providers">Providers</Link></li>
          <li>
            <button
              onClick={isLoggedIn ? handlelogout : handleAuthClick}
              className=" hover:underline"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
          <li>
            <button
              onClick={!isLoggedIn ? handleRegister : handleProfile}
            >

              {!isLoggedIn
                ? "Register"
                : <span>Hallo {user?.first_name || ""}</span>
              }

            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
