import React from 'react'

import { Breadcrumb } from 'antd'
import { Button } from '@mui/material'

function ProgramDetail() {
  const breadcrumbItems = [{ title: 'Company Active' }, { title: 'Program List' }, { title: 'Program Detail' }]

  return (
    <div className='container'>
      <Breadcrumb items={breadcrumbItems} />
      <div style={{ paddingBottom: 120, paddingTop: 80 }}>
        <div className='row'>
          <div className='col-lg-8 col-md-12 title'>
            <h3>Our donation is hope for poor childrens</h3>

            <div className='cause-details__content'>
              <div className='cause-card'>
                <div className='cause-card__inner'>
                  <div className='cause-card__image'>
                    <img style={{ height: '400px', width: '100%' }} src='/images/cards/analog-clock.jpg' alt='' />
                  </div>
                  <div className='cause-card__content'>
                    <div className='cause-card__top'>
                      <div className='progress' style={{ height: '20px' }}>
                        <div className='progress-bar progress-bar-striped' style={{ width: '70%', height: '20px' }}>
                          70%
                        </div>
                      </div>
                      <div className='justify-content-between cause-card__goals d-flex'>
                        <p>
                          <strong>Raised:</strong> $25,270
                        </p>
                        <p>
                          <strong>Goal:</strong> $30,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul className='list-unstyled cause-details__donations-list d-flex justify-content-between'>
                  <div>
                    <li>
                      <h3>
                        Start date : <span>31-2-1999</span>
                      </h3>
                    </li>
                    <li>
                      <h3>
                        End date : <span>11-11-1111</span>
                      </h3>
                    </li>
                  </div>
                  <div>
                    <li>
                      <h3>
                        Created : <span>Admin</span>
                      </h3>
                    </li>
                    <li>
                      <h3>
                        Status : <span>Starting</span>
                      </h3>
                    </li>
                  </div>
                </ul>
              </div>
              {/* <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                alteration in some form, by injected humour, or randomised words which don't look even slightly
                believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                embarrassing hidden in the middle of text.{' '}
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.{' '}
              </p> */}
              <div>
                <Button style={{ backgroundColor: '#9155FD', color: 'white' }} size='large' variant='contained'>
                  End of program
                </Button>
              </div>
            </div>

            <div className='result' />
          </div>
          <div style={{ paddingLeft: 40, paddingRight: 40 }} className='col-lg-4 col-md-12'>
            <div className='cause-details__sidebar'>
              <div className='cause-details__donations'>
                <h4 className='cause-details__donations-title'>Donations</h4>
                <ul className='list-unstyled cause-details__donations-list'>
                  <li style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <h3>
                      David Marks <span>3 hours ago</span>
                    </h3>
                    <span>God bless you dear</span>
                  </li>
                  <li style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <h3>
                      David Marks <span>3 hours ago</span>
                    </h3>
                    <span>God bless you dear</span>
                  </li>
                  <li style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <h3>
                      Anonymus <span>3 hours ago</span>
                    </h3>
                    <span>God bless you dear</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramDetail
