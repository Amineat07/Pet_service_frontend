import { Route, Routes } from "react-router-dom"
import Login from "./components/home_page/login"
import Home from "./components/home_page/home"
import Contact from "./components/home_page/contact"
import About from "./components/home_page/about"
import Register from "./components/home_page/register"
import { bearertokenAtom, isLoggedInAtom, userAtom } from "./components/state_model/state"
import { useEffect } from "react"
import { useAtom } from "jotai"
import Providers from "./components/home_page/providers"
import Profile from "./components/home_page/profile"

function App() {

  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(bearertokenAtom);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path="/providers" element={<Providers/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>
      </div>
    </>
  )
}

export default App
