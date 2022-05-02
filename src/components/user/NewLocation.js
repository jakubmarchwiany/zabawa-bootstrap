import React, { useState } from "react";

import UserMap from "./UserMap";


// let test = "test"

function NewLocation() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [marker, setMarker] = useState("");



    return (
        <>
            <div className="row mt-xl-2 mt-1 mx-0">
                <div className="col-xl-4 offset-xl-4 col-12 offset-0 rounded-3 shadow bg-white p-4">
                    <h1 className="display-5 text-center">Tworzenie nowego obiektu</h1>

                    <form>
                        <div className="mt-4">
                            <label className="form-label mb-1">Nazwa</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Opis</label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>


                        <div className="mt-3" style={{height: "400px"}}>
                            <UserMap newLocation={setMarker}/>
                        </div>
                        

                        <button
                            type="submit"
                            className="btn btn-secondary col-12 mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Dodawanie" : "Dodaj"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewLocation;
