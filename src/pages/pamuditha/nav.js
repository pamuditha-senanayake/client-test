import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useLogout} from './authUtils';
import logo2 from "../../images/logow.png";
import cartIcon from '../../images/cart.png';

function Navbar({cartCount}) { // Accept cartCount as a prop
    const logout = useLogout(); // Using the custom hook
    const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(false); // Replace cookieExists with user authentication status
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch('https://servertest-isos.onrender.com/api/user/verify', {
                    credentials: 'include' // Include credentials with the request
                });

                if (response.status === 403 || response.status === 401) {
                    navigate('/'); // Redirect if not authorized
                    return;
                }

                const data = await response.json();
                if (!data.isUser) {
                    navigate('/'); // Redirect if the user is not valid
                } else {
                    setIsUserAuthenticated(true); // Mark user as authenticated
                }
            } catch (error) {
                console.error('Error checking user role:', error);
                navigate('/'); // Redirect in case of an error
            }
        };

        checkUser();
    }, [navigate]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleScrollOrRedirect = (sectionId) => {
        if (location.pathname !== '/home') {
            navigate(`/home#${sectionId}`); // Redirect to home page with section hash
        } else {
            scrollToSection(sectionId); // Scroll on home page directly
        }
    };

    const handleLogout = () => {
        logout(); // Call the logout function from the custom hook
        setIsUserAuthenticated(false); // Set user authentication status to false after logout
        navigate('/');
    };

    return (
        <nav
            className="bg-black fixed top-0 left-1/2 transform -translate-x-1/2 w-[97%] z-50 shadow-md mt-2"
            style={{borderRadius: 40}}
        >
            <div className="w-full pr-5">
                <div className="flex flex-row h-20 justify-between">
                    {/* Left side with Logo */}
                    <div className="flex-shrink-0 content-start pl-4">
                        <a href="/home">
                            <img src={logo2} alt="Logo" className="h-full start content-start"/>
                        </a>
                    </div>

                    {/* Right side with buttons */}
                    <div className="flex items-center content-end">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <button onClick={() => handleScrollOrRedirect('home')}
                                        className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </button>
                                <button onClick={() => handleScrollOrRedirect('gallery')}
                                        className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Gallery
                                </button>
                                <button onClick={() => handleScrollOrRedirect('testimonials')}
                                        className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Testimonials
                                </button>
                                <button onClick={() => handleScrollOrRedirect('about')}
                                        className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    About Us
                                </button>
                                <Link to="/services"
                                      className="julius-sans-one-regular text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Appointments
                                </Link>
                                <Link to="/ProductList"
                                      className="julius-sans-one-regular text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Products
                                </Link>
                                <Link to="/cart" className="relative">
                                    <span
                                        className="julius-sans-one-regular text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Cart |
                                        <img src={cartIcon} alt="Cart" className="w-4 h-4 inline-block"/>
                                    </span>
                                    {isUserAuthenticated && (
                                        <span
                                            className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full px-1 text-xs">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                <div>
                                    <a className="nav-link text-white julius-sans-one-regular dropdown-toggle"
                                       href="http://example.com" id="dropdown07"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Menu
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown07">
                                        {isUserAuthenticated ? (
                                            <>
                                                <a className="dropdown-item julius-sans-one-regular"
                                                   href="/userp">Profile</a>

                                                <a className="dropdown-item julius-sans-one-regular"
                                                   href="/inq">Support</a>
                                                <a className="dropdown-item julius-sans-one-regular" href="#"
                                                   onClick={(e) => {
                                                       e.preventDefault();
                                                       handleLogout();
                                                   }}>Logout</a>
                                            </>
                                        ) : (
                                            <>
                                                <a className="dropdown-item julius-sans-one-regular" href="/">Login</a>
                                                <a className="dropdown-item julius-sans-one-regular"
                                                   href="/register">Register</a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
