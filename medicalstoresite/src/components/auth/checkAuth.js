import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkAuth = (Component) => {
    function Wrapper(props) {
        const user = useSelector(store => store.auth.user);
        const navigate = useNavigate();

        useEffect(() => {
            // Retrieve user data from local storage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!user && !storedUser) {
                // Redirect to login page if user is not authenticated
                navigate('/login');
            }
        }, [user, navigate]);

        return <Component {...props} />;
    }

    return Wrapper;
}

export default checkAuth;
