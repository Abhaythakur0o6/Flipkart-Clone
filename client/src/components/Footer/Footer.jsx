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
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/abhay-thakur-456716254" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a href="https://github.com/Abhaythakur0o6" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a href="https://www.instagram.com/abhaythakur_06x" target="_blank" rel="noopener noreferrer">
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
