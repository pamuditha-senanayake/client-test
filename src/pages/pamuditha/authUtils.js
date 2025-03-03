import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        console.log("Logout function triggered.");

        // Make sure to call the backend API for logout
        try {
            const response = await fetch('https://servertest-isos.onrender.com/logout', {
                method: 'GET',
                credentials: 'same-origin', // Ensures cookies are sent with the request
            });

            if (response.ok) {
                console.log("Backend logout successful.");
            } else {
                console.log("Backend logout failed.");
            }
        } catch (error) {
            console.error("Error during backend logout:", error);
        }

        // Clear the cookie on the frontend after the backend has processed it
        Cookies.remove('diamond', {path: '/'});

        // Navigate after the logout process
        navigate('/');
        console.log("Navigation to home page triggered.");
    };

    return logout;
};
