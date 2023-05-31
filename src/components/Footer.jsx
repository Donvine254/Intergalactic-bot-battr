function Footer() {
  return (
    <footer id="footer" className="ui footer">
      <div className="about">
        <h2>About</h2>
        <p>
          <a href="#">Terms and Conditions</a>
        </p>
        <p>
          {" "}
          <a href="#">Privacy Policy</a>
        </p>
        <p>
          <a href="#">Refund Policy</a>
        </p>
        <p>
          <a href="#">Contact Us</a>
        </p>
      </div>
      <div className="payment">
        <h2>Payment Methods</h2>
        <p>
          {" "}
          <i className="credit card outline icon"></i>
          <span>Credit Card</span>
        </p>
        <p>
          {" "}
          <i className="paypal icon"></i>
          <span>PayPal</span>
        </p>
        <p>
          <i className="visa icon"></i>
          <span>Visa</span>
        </p>
        <p>
          <i className="bitcoin icon"></i>
          <span>Bitcoin</span>
        </p>
      </div>
      <div className="contact">
        <h2>Connect with Us</h2>
        <p>
          {" "}
          <i className="twitter icon"></i>
          <span>Twitter</span>
        </p>
        <p>
          <i className="facebook icon"></i>
          <span>Facebook</span>
        </p>
        <p>
          {" "}
          <i className="linkedin icon"></i>
          <span>LinkedIn</span>
        </p>
        <p>
          <i className="github icon"></i>
          <span>GitHub</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
