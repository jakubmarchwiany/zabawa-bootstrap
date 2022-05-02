import React, { Component } from "react";

import { NavLink} from "react-router-dom";

class Navbar extends Component {
    render() {
        const activeNavLinkStyle = "nav-link active border-dark border-bottom";

        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink to="/Home" className="navbar-brand">
                        Play2Gether
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink
                                to="/Home"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Kontakt
                            </NavLink>
                            <NavLink
                                to="/example"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Przykład
                            </NavLink>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <NavLink
                                to="/account"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Konto
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Logowanie
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Rejestracja
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
