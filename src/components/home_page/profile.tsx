import { useAtom } from "jotai";
import Navbar from "../reusable_component/Navbar";
import { userAtom } from "../state_model/state";

export default function Profil() {
    const [user] = useAtom(userAtom);
    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-30 w-full">
                <div className="w 3/4 rounded-md border p-10">
                    <h2 className="flex justify-center text-2xl">Profile</h2>
                    <div className="flex flex-row p-3 rounded-md border mt-10">
                        <div className="flex pr-3">
                            <h2>Firstname</h2>
                        </div>
                        <div className="flex ">
                            <h2>{user?.first_name}</h2>
                        </div>
                    </div>
                    <div className="flex flex-row p-3 rounded-md border mt-10">
                        <div className="flex pr-3">
                            <h2>Lastname</h2>
                        </div>
                        <h2>{user?.last_name}</h2>
                    </div>

                    <div className="flex flex-row p-3 rounded-md border mt-10">
                        <div className="flex pr-3">
                            <h2>Lastname</h2>
                        </div>
                        <h2>{user?.email}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
