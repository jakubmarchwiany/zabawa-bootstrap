import React, { Component } from "react";

class footer extends Component {
    render() {
        return (
            <footer className="footer bg-light py-2 mt-auto">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <span className="text-muted">&copy;Play2Gether</span>
                        </div>
                        {/* <div className="col-2">
                            <a className="link-secondary mx-1" href="/statute">
                                Regulamin
                            </a>
                            <a className="link-secondary" href="/contact">
                                Kontakt
                            </a>
                        </div> */}
                    </div>
                </div>
            </footer>
        );
    }
}

export default footer;
