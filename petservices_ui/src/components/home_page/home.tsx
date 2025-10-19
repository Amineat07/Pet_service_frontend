import { useAtom } from "jotai";
import Navbar from "../reusable_component/Navbar"
import { userAtom } from "../state_model/state"

const Home = () => {
  const [user] = useAtom(userAtom);
    return (
      <div>
          <Navbar />
          {user ? <h2>Hallo {user?.first_name}</h2> : <h2>Welcome, guest!</h2>}
      </div>
    )
  }
 
  export default Home