import React from 'react'
import Navbar from './Navbar'
import Contactpage from './FooterPage'

function Notfoundpage() {
    return (
        <div style={{ width: "100%" }}>
            <Navbar />
            <h1 style={{ textAlign: "center" }}>Page not found ,Move back safely</h1>
            <center>
                <img style={{ width: "400px", height: "300px", borderRadius: "30px",marginTop:"30px" }} src='https://www.creativefabrica.com/wp-content/uploads/2022/11/26/404-error-not-found-logo-Graphics-48584243-1.jpg' alt='notfound' />
            </center>
            <Contactpage/>
        </div>

    )
}

export default Notfoundpage