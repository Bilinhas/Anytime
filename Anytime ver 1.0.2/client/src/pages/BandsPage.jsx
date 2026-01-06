import { useState, useEffect } from 'react'
import { getBandsData } from '../services/api'

function BandsPage() {

    const [pageData, setPageData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const data = await getBandsData()
                setPageData(data)

            } catch (err) {
                console.error('Erro ao carregar página de bandas:', err)
                setError(err.message || 'Erro ao carregar dados')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="container-fluid text-white text-center py-5" id="bands" style={{ minHeight: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container-fluid text-white text-center py-5" id="bands" style={{ minHeight: '100vh' }}>
                <h2>Error: {error}</h2>
            </div>
        )
    }

    return (
        <div
            className="container-fluid text-white"
            id="bands"
            style={{ backgroundImage: `url('${pageData.bg}')` }}
        >
            <div
                className="container-fluid text-white d-flex align-items-center"
                id="bands"
                style={{ backgroundImage: `url('${pageData.bg}')` }}
            >
                <div className="ms-5">
                    <p className="mb-2 display-3">{pageData.title}</p>
                    <h1 className="mb-2 lead">{pageData.desc}</h1>
                </div>
            </div>
        </div>
    )
}

export default BandsPage
