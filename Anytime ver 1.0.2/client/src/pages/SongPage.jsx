

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSongById } from '../services/api'


function AudioTrack({ title, src }) {
   
    if (!src) return null

    return (
        <div className="col-md-5 text-center">
            <h3>{title}</h3>
            <audio controls className="w-100">
                <source src={src} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}

function SongPage() {
   
    const { id } = useParams()

    
    const [songData, setSongData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

   
    useEffect(() => {
        const fetchSong = async () => {
            try {
                setLoading(true)
                setError(null)

                
                const data = await getSongById(id)
                setSongData(data)

            } catch (err) {
               
                console.error('Erro ao carregar música:', err)
                setError(err.message || 'Erro ao carregar música')
            } finally {
                setLoading(false)
            }
        }

        fetchSong()
    }, [id])

    if (loading) {
        return (
            <div className="container-fluid text-white text-center py-5" id="songs" style={{ minHeight: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container-fluid text-white text-center py-5" id="songs" style={{ minHeight: '100vh' }}>
                <h2>Error: {error}</h2>
                <Link to="/" className="btn btn-danger mt-3">Voltar ao início</Link>
            </div>
        )
    }

    
    const hasTracks = songData.vt || songData.gt || songData.bt || songData.dt || songData.bvt || songData.bgt

    return (
        <div
            className="container-fluid text-white"
            id="songs"
            style={{
                backgroundImage: `url('${songData.bg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container py-5">
                {}
                <h1 className="text-center mb-4">
                    {songData.artist} - {songData.title}
                </h1>
                <h5 className="text-center mb-5">
                    Album: <em>{songData.album}</em>
                </h5>

                {hasTracks ? (
                    
                    <div className="row justify-content-center gx-5 gy-5">
                        {}
                        <AudioTrack title="Vocal Track" src={songData.vt} />
                        <AudioTrack title="Guitar Track" src={songData.gt} />
                        <AudioTrack title="Backing Vocal Track" src={songData.bvt} />
                        <AudioTrack title="Backing Guitar Track" src={songData.bgt} />
                        <AudioTrack title="Bass Track" src={songData.bt} />
                        <AudioTrack title="Drum Track" src={songData.dt} />
                    </div>
                ) : (
                    <p className="text-center">
                        <em>Isolated tracks not available for this song.</em>
                    </p>
                )}
            </div>
        </div>
    )
}

export default SongPage
