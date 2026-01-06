import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ErrorPage() {

    const [showDetails, setShowDetails] = useState(false)

    const navigate = useNavigate()
    const toggleDetails = (e) => {
        e.preventDefault()
        setShowDetails(!showDetails)
    }

    const goHome = () => {
        navigate('/')
    }

    return (
        <div
            className="container-fluid text-white"
            id="bands"
            style={{ backgroundImage: "url('/images/error.PNG')" }}
        >
            <div className="py-5 mx-5">
                <h1 className="mt-5 py-5 display-3">Not Found</h1>
                <p className="lead">
                    Page not found or non-existent, make sure the data is filled in correctly.
                    <br />
                    <Link to="/">Click here to return to the beginning</Link>
                    {' '}or{' '}
                    <a href="#" onClick={toggleDetails}>
                        {showDetails ? 'Hide details' : 'View details'}
                    </a>
                </p>

                {showDetails && (
                    <div id="errorDetails">
                        <h2 className="mt-5">404</h2>
                        <pre>The requested page could not be found on this server.</pre>
                        <button onClick={goHome} className="btn btn-danger mt-3">
                            Go to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ErrorPage
