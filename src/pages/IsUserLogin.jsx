import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const IsUserLogin = ({ children }) => {
    const user = useSelector((state) => state?.user);

    return (
        <div className="w-full flex justify-center items-center px-4 py-6 bg-slate-900">
            {user && user._id ? (
                children
            ) : (
                <p className="text-xl text-red-300 font-bold">
                    Login to Save history <Link to="/login" className="underline text-cyan-400 ml-2">Login</Link>
                </p>
            )}
        </div>
    );
};
export default IsUserLogin