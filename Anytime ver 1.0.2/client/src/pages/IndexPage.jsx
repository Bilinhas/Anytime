import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHomeData } from "../services/api";
import { useAppContext } from "../context/AppContext";
import useFadeOnScroll from "../hooks/useFadeOnScroll";


function SongCard({ id, band, song, img, btnText }) {
  return (
    <div className="col-sm-6 col-md-3 mb-4 card-fade fade-on-scroll">
      <div className="card h-100 bg-dark text-white">
        <img src={img} className="card-img-top" alt={`${band} - ${song}`} />
        <div className="card-body">
          <h5 className="card-title">{band}</h5>
          <p className="card-text">{song}</p>
          <Link to={`/songs/${id}`} className="btn btn-danger">
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
}

function IndexPage() {

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setIsLoading } = useAppContext();
  const positionValue = "absolute";

  useFadeOnScroll();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsLoading(true);

        const data = await getHomeData();
        setPageData(data);
      } catch (err) {
        console.error("Erro ao carregar página inicial:", err);
        setError(err.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  if (loading) {
    return (
      <div
        className="container-fluid text-white text-center py-5"
        style={{ minHeight: "100vh", backgroundColor: "#101111" }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container-fluid text-white text-center py-5"
        style={{ minHeight: "100vh", backgroundColor: "#101111" }}
      >
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <>
      <div
        className="container-fluid text-white"
        id="div1"
        style={{ backgroundImage: `url('${pageData.bg1}')` }}
      >
        <div className="container-fluid p-5 mx-4 fade-on-scroll">
          <p className="mb-2 lead">{pageData.desc}</p>
          <h1 className="mb-2 display-3">
            {pageData.title}
            <img
              style={{
                width: "60px",
                height: "60px",
                position: positionValue,
                left: "265px",
                top: "90px",
              }}
              src="/images/som.png"
              alt="Logo"
            />
          </h1>
          <br />
        </div>
      </div>

      <div
        className="container-fluid text-center text-white"
        id="songs"
        style={{ backgroundImage: `url('${pageData.bg2}')` }}
      >
        <div className="container fade-on-scroll">
          <div>
            <h1>{pageData.body1}</h1>
            <h4>{pageData.body2}</h4>
          </div>

          <br />
          <br />

          <div
            className="row justify-content-center gx-5 gy-5 mt-4 fade-on-scroll"
            id="divrow"
          >
            {pageData.songs.map((song) => (
              <SongCard
                key={song.id}
                id={song.id}
                band={song.band}
                song={song.song}
                img={song.img}
                btnText={pageData.btn2}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
