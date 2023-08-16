/* eslint-disable @next/next/link-passhref */
import Phone from 'mdi-material-ui/Phone'
import EmailFastOutline from 'mdi-material-ui/EmailOutline'
import Twitter from 'mdi-material-ui/Twitter'
import Instagram from 'mdi-material-ui/Instagram'
import Youtube from 'mdi-material-ui/Youtube'
import Link from 'next/link'
import { styled } from '@mui/material/styles'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const HeaderContent = () => {
  return (
    <div>
      {/* TOP NAV */}
      <div className='wrap'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 d-flex align-items-center'>
              <p className='mb-0 phone pl-md-2'>
                <a href='#' className='mr-4'>
                  <Phone style={{ color: '#fff', fontSize: 18 }} /> +00 1234 567
                </a>
                <a href='#'>
                  <EmailFastOutline style={{ color: '#fff', fontSize: 18 }} /> giveaid@email.com
                </a>
              </p>
            </div>
            <div className='col-md-6 d-flex justify-content-md-end'>
              <div className='social-media'>
                <p className='mb-0 d-flex'>
                  <a href='#' className='d-flex align-items-center justify-content-center'>
                    <Twitter style={{ color: '#fff', fontSize: 18 }}>
                      <i className='sr-only'>Twitter</i>
                    </Twitter>
                  </a>

                  <a href='#' className='d-flex align-items-center justify-content-center'>
                    <Instagram style={{ color: '#fff', fontSize: 18 }}>
                      <i className='sr-only'>Instagram</i>
                    </Instagram>
                  </a>
                  <a href='#' className='d-flex align-items-center justify-content-center'>
                    <Youtube style={{ color: '#fff', fontSize: 18 }}>
                      <i className='sr-only'>Dribbble</i>
                    </Youtube>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className='navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light' id='ftco-navbar'>
        <div className='container'>
          <Link href='/'>
            <ImgStyled src='/images/logo/Give-AID-logos_transparent.png' alt='' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#ftco-nav'
            aria-controls='ftco-nav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='oi oi-menu'></span> Menu
          </button>

          <div className='collapse navbar-collapse' id='ftco-nav'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item active'>
                <a href='#' className='nav-link'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>
                  About
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>
                  Volunteer
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>
                  Causes
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>
                  Blog
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link'>
                  Contact
                </a>
              </li>
              <li className='nav-item cta'>
                <a href='#' className='nav-link'>
                  Donate
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderContent
