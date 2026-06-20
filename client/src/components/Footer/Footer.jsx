import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-top">
          <div className="footer-left">
            <div className="footer-column">
              <div className="footer-title">ABOUT</div>
              <a className="footer-link">Contact Us</a>
              <a className="footer-link">About Us</a>
              <a className="footer-link">Careers</a>
              <a className="footer-link">Flipkart Stories</a>
              <a className="footer-link">Press</a>
              <a className="footer-link">Corporate Information</a>
            </div>
            <div className="footer-column">
              <div className="footer-title">GROUP COMPANIES</div>
              <a className="footer-link">Myntra</a>
              <a className="footer-link">Cleartrip</a>
              <a className="footer-link">Shopsy</a>
            </div>
            <div className="footer-column">
              <div className="footer-title">HELP</div>
              <a className="footer-link">Payments</a>
              <a className="footer-link">Shipping</a>
              <a className="footer-link">Cancellation & Returns</a>
              <a className="footer-link">FAQ</a>
            </div>
            <div className="footer-column">
              <div className="footer-title">CONSUMER POLICY</div>
              <a className="footer-link">Cancellation & Returns</a>
              <a className="footer-link">Terms Of Use</a>
              <a className="footer-link">Security</a>
              <a className="footer-link">Privacy</a>
              <a className="footer-link">Sitemap</a>
              <a className="footer-link">Grievance Redressal</a>
              <a className="footer-link">EPR Compliance</a>
              <a className="footer-link">FSSAI Food Safety Connect App</a>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-right">
            <div className="footer-column address-column">
              <div className="footer-title">Mail Us:</div>
              <p className="footer-text">
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </p>
              <div className="social-icons">
                <div className="footer-title" style={{ marginTop: '20px', marginBottom: '10px' }}>Social:</div>
                <div className="icons-container">
                  <a href="https://www.facebook.com/flipkart" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="https://twitter.com/flipkart" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </a>
                  <a href="https://www.youtube.com/flipkart" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-youtube"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon></svg>
                  </a>
                  <a href="https://www.instagram.com/flipkart" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-column address-column">
              <div className="footer-title">Registered Office Address:</div>
              <p className="footer-text">
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India<br />
                CIN : U51109KA2012PTC066107<br />
                Telephone: <span className="blue-text">044-45614700</span> / <span className="blue-text">044-67415800</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <div className="bottom-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffc200" stroke="#ffc200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              <span>Become a Seller</span>
            </div>
            <div className="bottom-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffc200" stroke="#ffc200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              <span>Advertise</span>
            </div>
            <div className="bottom-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffc200" stroke="#ffc200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
              <span>Gift Cards</span>
            </div>
            <div className="bottom-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffc200" stroke="#ffc200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span>Help Center</span>
            </div>
            <div className="bottom-link-item">
              <span>© 2007-2025 Flipkart.com</span>
            </div>
            <div className="bottom-link-item payment-methods">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment Methods" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
