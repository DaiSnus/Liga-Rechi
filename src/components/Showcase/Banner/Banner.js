import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const contactInfo = {
    phone: "+7 (123) 456-78-90",
    messengers: [
      { name: "Telegram", url: "https://t.me/ligarechi" }
    ],
    socials: [
      { name: "ВКонтакте", url: "https://vk.com/ligarechi" }
    ]
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt with:", loginData)
    setShowLoginModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="banner">
      <div className="banner-image">
        <img src="#"/>
      </div>

      <div className="banner-sidebar">
        <div className="login-section">
          <button className="login-button" onClick={() => setShowLoginModal(true)}>
            Вход
          </button> 
        </div>

        <div className="contact-section">
          {contactInfo.phone && (
            <div className="contact-block">
              <h3>Телефон:</h3>
              <p>{contactInfo.phone}</p>
            </div>
          )}

          {contactInfo.messengers.length > 0 && (
            <div className="contact-block">
              <h3>Мессенджеры:</h3>
              <div className="social-links">
                {contactInfo.messengers.map((messenger, index) => (
                  <a key={index} href={messenger.url} target="_blank" rel="noopener noreferrer" className="social-link">
                    {messenger.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {contactInfo.socials.length > 0 && (
            <div className="contact-block">
              <h3>Соцсети:</h3>
              <div className="social-links">
                {contactInfo.socials.map((social, index) => (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowLoginModal(false)}>
              &times;
            </button>

            <h2>Вход в личный кабинет</h2>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Войти
              </button>
            </form>

            <div className="login-options">
              <p>Или войти через:</p>
              <div className="social-login-buttons">
                <button className="social-login">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_17_40)">
                      <path d="M15.9996 13.0909V19.2872H24.6105C24.2324 21.28 23.0977 22.9673 21.3959 24.1018L26.5886 28.131C29.6141 25.3383 31.3595 21.2365 31.3595 16.3638C31.3595 15.2292 31.2578 14.1382 31.0686 13.091L15.9996 13.0909Z" fill="#4285F4"/>
                      <path d="M7.03292 19.0454L5.86177 19.9419L1.71625 23.1709C4.34897 28.3927 9.74493 32 15.9994 32C20.3193 32 23.9411 30.5745 26.5884 28.131L21.3957 24.1018C19.9703 25.0618 18.1521 25.6437 15.9994 25.6437C11.8395 25.6437 8.30501 22.8365 7.03946 19.0546L7.03292 19.0454Z" fill="#34A853"/>
                      <path d="M1.71624 8.82909C0.625389 10.9817 0 13.4109 0 15.9999C0 18.5889 0.625389 21.0181 1.71624 23.1707C1.71624 23.1852 7.03997 19.0398 7.03997 19.0398C6.71997 18.0798 6.53082 17.0617 6.53082 15.9997C6.53082 14.9378 6.71997 13.9197 7.03997 12.9597L1.71624 8.82909Z" fill="#FBBC05"/>
                      <path d="M15.9998 6.3709C18.3562 6.3709 20.4507 7.18543 22.1234 8.75636L26.7052 4.1746C23.927 1.58555 20.3198 0 15.9998 0C9.74526 0 4.34897 3.59272 1.71625 8.8291L7.03981 12.96C8.30519 9.17816 11.8398 6.3709 15.9998 6.3709Z" fill="#EA4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_17_40">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <button className="social-login">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1106_5)">
                      <path d="M0 15.36C0 8.1192 0 4.49884 2.24942 2.24942C4.49884 0 8.1192 0 15.36 0H16.64C23.8808 0 27.5011 0 29.7506 2.24942C32 4.49884 32 8.1192 32 15.36V16.64C32 23.8808 32 27.5011 29.7506 29.7506C27.5011 32 23.8808 32 16.64 32H15.36C8.1192 32 4.49884 32 2.24942 29.7506C0 27.5011 0 23.8808 0 16.64V15.36Z" fill="#0077FF"/>
                      <path d="M17.0266 23.0534C9.73329 23.0534 5.57336 18.0534 5.40002 9.7334H9.05336C9.17336 15.8401 11.8666 18.4267 14 18.9601V9.7334H17.4401V15.0001C19.5468 14.7734 21.7598 12.3734 22.5065 9.7334H25.9466C25.3732 12.9867 22.9732 15.3867 21.2666 16.3734C22.9732 17.1734 25.7067 19.2667 26.7467 23.0534H22.9599C22.1466 20.5201 20.1201 18.5601 17.4401 18.2934V23.0534H17.0266Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1106_5">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <button className="social-login">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_318_61)">
                      <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="url(#paint0_linear_318_61)"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.24248 15.8311C11.9068 13.7989 15.0171 12.4592 16.5733 11.8119C21.0167 9.96375 21.94 9.6427 22.5418 9.6321C22.6741 9.62977 22.9701 9.66257 23.1618 9.81812C23.3236 9.94947 23.3682 10.1269 23.3895 10.2514C23.4108 10.376 23.4373 10.6596 23.4162 10.8813C23.1755 13.4113 22.1336 19.5508 21.6035 22.3845C21.3792 23.5835 20.9376 23.9855 20.5101 24.0248C19.5809 24.1103 18.8754 23.4108 17.9754 22.8209C16.5672 21.8978 15.7717 21.3231 14.4048 20.4224C12.8251 19.3814 13.8491 18.8092 14.7494 17.8742C14.985 17.6295 19.0789 13.9058 19.1581 13.568C19.168 13.5257 19.1772 13.3683 19.0836 13.2851C18.9901 13.202 18.852 13.2304 18.7524 13.253C18.6111 13.2851 16.3615 14.772 12.0035 17.7138C11.3649 18.1523 10.7866 18.3659 10.2683 18.3547C9.69706 18.3424 8.59814 18.0317 7.78121 17.7661C6.77921 17.4404 5.98284 17.2682 6.05218 16.7151C6.0883 16.4269 6.48507 16.1323 7.24248 15.8311Z" fill="white"/>
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_318_61" x1="16" y1="0" x2="16" y2="31.7627" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#2AABEE"/>
                        <stop offset="1" stop-color="#229ED9"/>
                      </linearGradient>
                      <clipPath id="clip0_318_61">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Banner
