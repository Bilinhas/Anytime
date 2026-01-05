
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchTracks } from '../services/api'
import useFadeOnScroll from '../hooks/useFadeOnScroll'


function TrackCard({ track }) {
  
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0).padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    return (
        <div className="col card-fade fade-on-scroll">
            <div className="card h-100 bg-dark text-white shadow rounded">
                {}
                <img
                    src={track.album.images[0]?.url}
                    className="card-img-top"
                    alt="Album cover"
                    style={{ height: '200px', objectFit: 'cover' }}
                />

                <div className="card-body d-flex flex-column">
                    {}
                    <h5 className="card-title">{track.name}</h5>

                    {}
                    <p className="card-text mb-2">
                        <strong>Artist:</strong> {track.artists.map(a => a.name).join(', ')}
                        <br />
                        <strong>Album:</strong> {track.album.name}
                        <br />
                        <strong>Duration:</strong> {formatDuration(track.duration_ms)}
                    </p>

                    {}
                    {track.preview_url ? (
                        <audio controls className="w-100 mb-3">
                            <source src={track.preview_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        <p><em>No previews available</em></p>
                    )}

                    {}
                    <div className="mt-auto">
                        {}
                        <a
                            href={track.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success w-100 mb-2"
                        >
                            Listen on Spotify
                        </a>

                        {}
                        {track.hasTracks ? (
                            <Link
                                to={`/songs/${track.localTrackId}`}
                                className="btn btn-danger w-100"
                            >
                                Listen to Tracks
                            </Link>
                        ) : (
                            <span className="text-muted d-block text-center">
                                No tracks available
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SearchPage() {
   
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

   
    useFadeOnScroll()

  
    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setTracks([])
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)

               
                const data = await searchTracks(query)
                setTracks(data.tracks || [])
                setSearchQuery(data.searchQuery || query)

            } catch (err) {
               
                console.error('Erro ao buscar músicas:', err)
                setError(err.message || 'Erro ao buscar músicas')
                setTracks([])
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query]) 

    if (loading) {
        return (
            <div
                style={{
                    backgroundImage: 'url(/images/synth.PNG)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                }}
                id="songs"
            >
                <div className="container mt-5 text-white text-center py-5">
                    <h2>Searching...</h2>
                </div>
            </div>
        )
    }

    return (
        <div
            style={{
                backgroundImage: 'url(/images/synth.PNG)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            id="songs"
        >
            <div className="container mt-5 text-white">
                <h2 className="mb-4">Showing results for "{searchQuery}":</h2>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                {tracks.length === 0 ? (
                    <p>No music found.</p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {}
                        {tracks.map((track) => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage
