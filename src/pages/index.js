import React from 'react'

function HomePage() {
  return (
    <div>
       {/* Slider */}
      <section className='hero-wrap js-fullheight'>
        <div className='home-slider js-fullheight owl-carousel'>
          <div
            className='slider-item js-fullheight'
            style={{ backgroundImage: 'url(' + 'https://technext.github.io/unicare/images/bg_1.jpg' + ')' }}
          >
            <div className='overlay-1'></div>
            <div className='overlay-2'></div>
            <div className='overlay-3'></div>
            <div className='overlay-4'></div>
            <div className='container'>
              <div className='row no-gutters slider-text js-fullheight align-items-center'>
                <div className='col-md-10 col-lg-7 ftco-animate'>
                  <div className='text w-100'>
                    <h2>Help the poor in need</h2>
                    <h1 className='mb-3'>Lend the helping hand get involved</h1>
                    <div className='d-flex meta'>
                      <div className=''>
                        <p className='mb-0'>
                          <a href='#' className='btn btn-secondary py-3 px-2 px-md-4'>
                            Become A Volunteer
                          </a>
                        </p>
                      </div>
                      <a href='#' className='d-flex align-items-center button-link'>
                        <div className='button-video d-flex align-items-center justify-content-center'>
                          <span className='fa fa-play'></span>
                        </div>
                        <span>Watch our video</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='slider-item js-fullheight' style={{ backgroundImage: 'url(' + 'https://technext.github.io/unicare/images/bg_2.jpg' + ')' }}>
            <div className='overlay-1'></div>
            <div className='overlay-2'></div>
            <div className='overlay-3'></div>
            <div className='overlay-4'></div>
            <div className='container'>
              <div className='row no-gutters slider-text js-fullheight align-items-center'>
                <div className='col-md-10 col-lg-7 ftco-animate'>
                  <div className='text w-100'>
                    <h2>Raising Hope</h2>
                    <h1 className='mb-3'>Discover Non-Profit Charity Platform</h1>
                    <div className='d-flex meta'>
                      <div className=''>
                        <p className='mb-0'>
                          <a href='#' className='btn btn-secondary py-3 px-2 px-md-4'>
                            Become A Volunteer
                          </a>
                        </p>
                      </div>
                      <a href='#' className='d-flex align-items-center button-link'>
                        <div className='button-video d-flex align-items-center justify-content-center'>
                          <span className='fa fa-play'></span>
                        </div>
                        <span>Watch our video</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='slider-item js-fullheight' style={{ backgroundImage: 'url(../../public/images/bg_3.jpg)' }}>
            <div className='overlay-1'></div>
            <div className='overlay-2'></div>
            <div className='overlay-3'></div>
            <div className='overlay-4'></div>
            <div className='container'>
              <div className='row no-gutters slider-text js-fullheight align-items-center'>
                <div className='col-md-10 col-lg-7 ftco-animate'>
                  <div className='text w-100'>
                    <h2>Raising Hope</h2>
                    <h1 className='mb-3'>Giving Hope to the Homeless People</h1>
                    <div className='d-flex meta'>
                      <div className=''>
                        <p className='mb-0'>
                          <a href='#' className='btn btn-secondary py-3 px-2 px-md-4'>
                            Become A Volunteer
                          </a>
                        </p>
                      </div>
                      <a href='#' className='d-flex align-items-center button-link'>
                        <div className='button-video d-flex align-items-center justify-content-center'>
                          <span className='fa fa-play'></span>
                        </div>
                        <span>Watch our video</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className='ftco-appointment ftco-section ftco-no-pt ftco-no-pb img'>
        <div className='overlay'></div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 order-md-last d-flex align-items-stretch'>
              <div className='donation-wrap'>
                <div className='total-donate d-flex align-items-center'>
                  <span className='fa flaticon-cleaning'></span>
                  <h4>
                    Donation Campaign <br />
                    are running
                  </h4>
                  <p className='d-flex align-items-center'>
                    <span>$</span>
                    <span className='number' data-number='24781'>
                      0
                    </span>
                  </p>
                </div>
                <form action='#' className='appointment'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label htmlFor='name'>Full Name</label>
                        <div className='input-wrap'>
                          <div className='icon'>
                            <span className='fa fa-user'></span>
                          </div>
                          <input type='text' className='form-control' placeholder='' />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label htmlFor='name'>Email Address</label>
                        <div className='input-wrap'>
                          <div className='icon'>
                            <span className='fa fa-paper-plane'></span>
                          </div>
                          <input type='email' className='form-control' placeholder='' />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label htmlFor='name'>Select Causes</label>
                        <div className='form-field'>
                          <div className='select-wrap'>
                            <div className='icon'>
                              <span className='fa fa-chevron-down'></span>
                            </div>
                            <select name='' id='' className='form-control'>
                              <option value=''></option>
                              <option value=''>House Washing</option>
                              <option value=''>Roof Cleaning</option>
                              <option value=''>Driveway Cleaning</option>
                              <option value=''>Gutter Cleaning</option>
                              <option value=''>Patio Cleaning</option>
                              <option value=''>Building Cleaning</option>
                              <option value=''>Concrete Cleaning</option>
                              <option value=''>Sidewal Cleaning</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label htmlFor='name'>Amount</label>
                        <div className='input-wrap'>
                          <div className='icon'>
                            <span className='fa fa-money'></span>
                          </div>
                          <input type='text' className='form-control' placeholder='$5' />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label htmlFor='name'>Payment Method</label>
                        <div className='d-lg-flex'>
                          <div className='form-radio mr-3'>
                            <div className='radio'>
                              <label>
                                <input type='radio' name='radio-input' checked />
                                <span className='checkmark'></span>
                                <span className='fill-control-description'>Credit Card</span>
                              </label>
                            </div>
                          </div>
                          <div className='form-radio mr-3'>
                            <div className='radio'>
                              <label>
                                <input type='radio' name='radio-input' />
                                <span className='checkmark'></span>
                                <span className='fill-control-description'>Paypal</span>
                              </label>
                            </div>
                          </div>
                          <div className='form-radio'>
                            <div className='radio'>
                              <label>
                                <input type='radio' name='radio-input' />
                                <span className='checkmark'></span>
                                <span className='fill-control-description'>Payoneer</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <input type='submit' value='Donate Now' className='btn btn-secondary py-3 px-4' />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-md-7 wrap-about py-5'>
              <div className='heading-section pr-md-5 pt-md-5'>
                <span className='subheading'>Welcome to unicare</span>
                <h2 className='mb-4'>We are here to help everyone in need</h2>
                <p>
                  On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would
                  have been rewritten a thousand times and everything that was left from its origin would be the word
                  "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing
                  the copy said could convince her and so it didn’t take long until a few insidious Copy Writers
                  ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they
                  abused her for their.
                </p>
              </div>
              <div className='row my-md-5'>
                <div className='col-md-6 d-flex counter-wrap'>
                  <div className='block-18 d-flex'>
                    <div className='icon d-flex align-items-center justify-content-center'>
                      <span className='flaticon-volunteer'></span>
                    </div>
                    <div className='desc'>
                      <div className='text'>
                        <strong className='number' data-number='50'>
                          0
                        </strong>
                      </div>
                      <div className='text'>
                        <span>Volunteers</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 d-flex counter-wrap'>
                  <div className='block-18 d-flex'>
                    <div className='icon d-flex align-items-center justify-content-center'>
                      <span className='flaticon-piggy-bank'></span>
                    </div>
                    <div className='desc'>
                      <div className='text'>
                        <strong className='number' data-number='24400'>
                          0
                        </strong>
                      </div>
                      <div className='text'>
                        <span>Trusted Funds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                <a href='#' className='btn btn-secondary btn-outline-secondary'>
                  Become A Volunteer
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className='ftco-section ftco-no-pt ftco-no-pb'>
        <div className='container'>
          <div className='row no-gutters'>
            <div className='col-md-3 d-flex align-items-stretch'>
              <div className='services'>
                <div className='text text-center bg-secondary'>
                  <h3>
                    Become a <br />
                    Volunteer
                  </h3>
                  <p>But nothing the copy said could convince her and so it didn’t take long until a few</p>
                </div>
                <div className='img border-2' style={{ backgroundImage: 'url(../../public/images/services-1.jpg)' }}>
                  <div className='icon d-flex align-items-center justify-content-center'>
                    <span className='flaticon-volunteer'></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-3 d-flex align-items-stretch'>
              <div className='services'>
                <div className='text text-center bg-tertiary'>
                  <h3>
                    Quick <br />
                    Fundraising
                  </h3>
                  <p>But nothing the copy said could convince her and so it didn’t take long until a few</p>
                </div>
                <div className='img border-3' style={{ backgroundImage: 'url(../../public/images/services-2.jpg)' }}>
                  <div className='icon d-flex align-items-center justify-content-center'>
                    <span className='flaticon-piggy-bank'></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-3 d-flex align-items-stretch'>
              <div className='services'>
                <div className='text text-center bg-primary'>
                  <h3>
                    Start <br />
                    Donating
                  </h3>
                  <p>But nothing the copy said could convince her and so it didn’t take long until a few</p>
                </div>
                <div className='img border-1' style={{ backgroundImage: 'url(../../public/images/services-3.jpg)' }}>
                  <div className='icon d-flex align-items-center justify-content-center'>
                    <span className='flaticon-donation'></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-3 d-flex align-items-stretch'>
              <div className='services'>
                <div className='text text-center bg-quarternary'>
                  <h3>
                    Get <br />
                    Involved
                  </h3>
                  <p>But nothing the copy said could convince her and so it didn’t take long until a few</p>
                </div>
                <div className='img border-4' style={{ backgroundImage: 'url(../../public/images/services-4.jpg)' }}>
                  <div className='icon d-flex align-items-center justify-content-center'>
                    <span className='flaticon-ecological'></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donate List */}
      <section className='ftco-section ftco-no-pb'>
        <div className='container'>
          <div className='row justify-content-center pb-5 mb-3'>
            <div className='col-md-7 heading-section text-center ftco-animate'>
              <span className='subheading'>Our Causes</span>
              <h2>Donate to charity causes around the world</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-lg-3'>
              <div className='causes causes-2 text-center ftco-animate'>
                <a
                  href='#'
                  className='img w-100'
                  style={{ backgroundImage: 'url(../../public/images/causes-1.jpg)' }}
                ></a>
                <div className='text p-3'>
                  <h2>
                    <a href='#'>Save the poor children from hunger</a>
                  </h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                  <div className='goal mb-4'>
                    <p>
                      <span>$3,800</span> to go
                    </p>
                    <div className='progress' style={{ height: 20 }}>
                      <div className='progress-bar progress-bar-striped' style={{ height: 20, width: '70%' }}>
                        70%
                      </div>
                    </div>
                  </div>
                  <p>
                    <a href='#' className='btn btn-light w-100'>
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-3'>
              <div className='causes causes-2 text-center ftco-animate'>
                <a
                  href='#'
                  className='img w-100'
                  style={{ backgroundImage: 'url(../../public/images/causes-2.jpg)' }}
                ></a>
                <div className='text p-3'>
                  <h2>
                    <a href='#'>Save the poor children from hunger</a>
                  </h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                  <div className='goal mb-4'>
                    <p>
                      <span>$3,800</span> to go
                    </p>
                    <div className='progress' style={{ height: 20 }}>
                      <div className='progress-bar progress-bar-striped' style={{ height: 20, width: '82%' }}>
                        82%
                      </div>
                    </div>
                  </div>
                  <p>
                    <a href='#' className='btn btn-light w-100'>
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-3'>
              <div className='causes causes-2 text-center ftco-animate'>
                <a
                  href='#'
                  className='img w-100'
                  style={{ backgroundImage: 'url(../../public/images/causes-3.jpg)' }}
                ></a>
                <div className='text p-3'>
                  <h2>
                    <a href='#'>Save the poor children from hunger</a>
                  </h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                  <div className='goal mb-4'>
                    <p>
                      <span>$3,800</span> to go
                    </p>
                    <div className='progress' style={{ height: 20 }}>
                      <div className='progress-bar progress-bar-striped' style={{ height: 20, width: '95%' }}>
                        95%
                      </div>
                    </div>
                  </div>
                  <p>
                    <a href='#' className='btn btn-light w-100'>
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-3'>
              <div className='causes causes-2 text-center ftco-animate'>
                <a
                  href='#'
                  className='img w-100'
                  style={{ backgroundImage: 'url(../../public/images/causes-4.jpg)' }}
                ></a>
                <div className='text p-3'>
                  <h2>
                    <a href='#'>Save the poor children from hunger</a>
                  </h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                  <div className='goal mb-4'>
                    <p>
                      <span>$3,800</span> to go
                    </p>
                    <div className='progress' style={{ height: 20 }}>
                      <div className='progress-bar progress-bar-striped' style={{ height: 20, width: '75%' }}>
                        75%
                      </div>
                    </div>
                  </div>
                  <p>
                    <a href='#' className='btn btn-light w-100'>
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quick stats */}
      <section className='ftco-counter' id='section-counter'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3 mb-5 mb-md-0 text-center text-md-left'>
              <h2 className='font-weight-bold' style={{ color: '#fff', fontSize: 22 }}>
                We're on a mission to help all your problems
              </h2>
              <a href='#' className='btn btn-white btn-outline-white'>
                Donate Now
              </a>
            </div>
            <div className='col-md-9'>
              <div className='row'>
                <div className='col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate'>
                  <div className='block-18 text-center'>
                    <div className='text'>
                      <strong className='number' data-number='88984'>
                        0
                      </strong>
                    </div>
                    <div className='text'>
                      <span>Donation Campaigns are running</span>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate'>
                  <div className='block-18 text-center'>
                    <div className='text'>
                      <strong className='number' data-number='65000'>
                        0
                      </strong>
                    </div>
                    <div className='text'>
                      <span>Professional and kind volunteers</span>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate'>
                  <div className='block-18 text-center'>
                    <div className='text'>
                      <strong className='number' data-number='77000'>
                        0
                      </strong>
                    </div>
                    <div className='text'>
                      <span>Funds we raised till now on site</span>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate'>
                  <div className='block-18 text-center'>
                    <div className='text'>
                      <strong className='number' data-number='50'>
                        0
                      </strong>
                    </div>
                    <div className='text'>
                      <span>Dedicated Donors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedbacks */}
      <section className='ftco-section testimony-section'>
        <div className='overlay'></div>
        <div className='container'>
          <div className='row justify-content-center pb-5'>
            <div className='col-md-7 heading-section heading-section-white text-center ftco-animate'>
              <span className='subheading'>Testimony</span>
              <h2>Happy Clients &amp; Feedbacks</h2>
            </div>
          </div>
          <div className='row ftco-animate'>
            <div className='col-md-12'>
              <div className='carousel-testimony owl-carousel'>
                <div className='item'>
                  <div className='testimony-wrap d-flex'>
                    <div
                      className='user-img'
                      style={{ backgroundImage: 'url(../../public/images/person-1.jpg)' }}
                    ></div>
                    <div className='text pl-4'>
                      <span className='quote d-flex align-items-center justify-content-center'>
                        <i className='fa fa-quote-left'></i>
                      </span>
                      <p className='rate'>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                      </p>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                      <p className='name'>Racky Henderson</p>
                      <span className='position'>Father</span>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='testimony-wrap d-flex'>
                    <div
                      className='user-img'
                      style={{ backgroundImage: 'url(../../public/images/person-2.jpg)' }}
                    ></div>
                    <div className='text pl-4'>
                      <span className='quote d-flex align-items-center justify-content-center'>
                        <i className='fa fa-quote-left'></i>
                      </span>
                      <p className='rate'>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                      </p>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                      <p className='name'>Henry Dee</p>
                      <span className='position'>Businesswoman</span>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='testimony-wrap d-flex'>
                    <div
                      className='user-img'
                      style={{ backgroundImage: 'url(../../public/images/person-3.jpg)' }}
                    ></div>
                    <div className='text pl-4'>
                      <span className='quote d-flex align-items-center justify-content-center'>
                        <i className='fa fa-quote-left'></i>
                      </span>
                      <p className='rate'>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                      </p>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                      <p className='name'>Mark Huff</p>
                      <span className='position'>Businesswoman</span>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='testimony-wrap d-flex'>
                    <div
                      className='user-img'
                      style={{ backgroundImage: 'url(../../public/images/person-4.jpg)' }}
                    ></div>
                    <div className='text pl-4'>
                      <span className='quote d-flex align-items-center justify-content-center'>
                        <i className='fa fa-quote-left'></i>
                      </span>
                      <p className='rate'>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                      </p>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                      <p className='name'>Benjie Busk Jr.</p>
                      <span className='position'>Businesswoman</span>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='testimony-wrap d-flex'>
                    <div
                      className='user-img'
                      style={{ backgroundImage: 'url(../../public/images/person-1.jpg)' }}
                    ></div>
                    <div className='text pl-4'>
                      <span className='quote d-flex align-items-center justify-content-center'>
                        <i className='fa fa-quote-left'></i>
                      </span>
                      <p className='rate'>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                        <span className='fa fa-star'></span>
                      </p>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia</p>
                      <p className='name'>Ken Bosh</p>
                      <span className='position'>Businesswoman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
