//footer com informações extra

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5" id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mb-3">
            <h3>About Us</h3>
            <p>
              We are a Brazilian group inspired by transmitting music in its
              purest and most original essence, directly from the source and
              with many different resources. By working on this website, we aim
              for greater freedom of access to the musical mixing process
              present in the most influential alternative rock and metal bands
              around the world.
            </p>
            <p>
              Contact us:{" "}
              <a href="mailto:bilinhas1712@hotmail.com" className="text-light">
                bilinhas1712@hotmail.com
              </a>
            </p>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
            <div>
              &copy; 2026 Anytime Ltda. ver 1.0.2
              <br />
              All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
