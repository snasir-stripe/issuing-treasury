import Link from 'next/link';
import React, {Component} from 'react';

const NavBar = ({session}) => {
  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <svg width="210" height="20">
                <path fill="#FFF" d="M146.193 3.973v6.287h1.887c1.577 0 3.168-.702 3.168-3.171-.016-2.493-1.517-3.117-3.168-3.117h-1.887zm5.978 9.835l3.253 5.863h-4.128l-2.597-4.986-.466-.836h-2.04v5.822h-3.772V.356h6.123c5.443 0 6.452 4.53 6.452 6.986 0 2.722-1.358 4.706-3.313 5.606.174.31.35.621.488.86zM47.01 3.973v6.287h1.887c1.577 0 3.168-.702 3.168-3.171-.016-2.493-1.517-3.117-3.168-3.117H47.01zm5.978 9.835l3.253 5.863h-4.128l-2.597-4.986-.466-.836h-2.04v5.822H43.24V.356h6.123c5.443 0 6.452 4.53 6.452 6.986 0 2.722-1.358 4.706-3.313 5.606.174.31.35.621.488.86zm144.135-8.137c0-3.534 2.515-5.671 6.342-5.671 3.718 0 6.288 2.493 6.288 6.466h-3.718c0-2.055-1.011-3.014-2.624-3.014-1.613 0-2.515.767-2.515 2.22 0 3.835 9.103 1.56 9.103 8.465 0 3.671-2.624 5.863-6.534 5.863-3.909 0-6.588-2.548-6.588-6.685h3.773c0 2.246 1.148 3.178 2.815 3.178 1.586 0 2.761-.74 2.761-2.329 0-3.67-9.103-1.643-9.103-8.493zM187.474 4v4.384h5.221v3.287h-5.221v4.384h7.052v3.616h-10.825V.356h10.825V4h-7.052zm-16.676 12.082h2.132c1.804 0 3.17-.712 3.17-4.493V7.836c0-2.083-.546-3.864-3.17-3.864h-2.132v12.11zM167.025.356h6.342c3.827 0 6.479 2.356 6.479 7.069v5.096c0 4.657-2.652 7.15-6.479 7.15h-6.342V.356zm-8.202 19.315V.356h3.773v19.315h-3.773zM128.888 4v15.671h-3.772V4h-4.019V.356h11.81V4h-4.019zm-17.195 0v4.384h5.222v3.287h-5.222v4.384h7.053v3.616h-10.825V.356h10.825V4h-7.053zM100.43 19.671l-3.827-8.027H95.18v8.027h-3.773V.356h3.773v7.945h1.422L100.43.356h4.237l-4.811 9.589 4.81 9.726h-4.236zM81.512 3.616c-1.312 0-2.68.713-2.68 2.932v6.85c0 2.273 1.368 2.958 2.68 2.958 1.75 0 2.706-.85 2.706-3.671v-.246h3.773c0 4.93-2.106 7.534-6.48 7.534-3.826 0-6.478-2.74-6.478-6.685v-6.63C75.033 2.74 77.685 0 81.512 0c4.292 0 6.479 2.822 6.479 7.315h-3.773v-.274c0-2.85-1.394-3.425-2.706-3.425zm-13.396 9.808V6.575c0-2.164-1.285-2.959-2.707-2.959-1.34 0-2.678.713-2.678 2.932v6.85c0 2.163 1.257 2.93 2.678 2.93 1.285 0 2.707-.684 2.707-2.904zm-9.185-.136V6.712C58.93 2.767 61.582 0 65.409 0c3.8 0 6.48 2.767 6.48 6.712v6.575c0 3.918-2.68 6.658-6.48 6.658-3.827 0-6.478-2.74-6.478-6.658zM24.637 1.11c4.891 0 8.87 3.988 8.87 8.89 0 4.9-3.979 8.888-8.87 8.888H11.122a.986.986 0 0 1-.985-.988c0-.545.44-.987.985-.987h13.515c3.804 0 6.899-3.102 6.899-6.914s-3.095-6.914-6.899-6.914H3.238a.987.987 0 1 1 0-1.975h21.4zm-2.956 8.89a2.963 2.963 0 0 0 2.956 2.962 2.963 2.963 0 0 0 0-5.926A2.963 2.963 0 0 0 21.681 10zm7.884 0c0 2.722-2.21 4.937-4.928 4.937-2.717 0-4.927-2.215-4.927-4.938s2.21-4.938 4.927-4.938c2.717 0 4.928 2.215 4.928 4.938zM17.88 7.036H7.743a.987.987 0 0 1 0-1.975H17.88a.987.987 0 1 1 0 1.975zm.985 6.914a.987.987 0 0 1-.985.987H6.617a.987.987 0 0 1 0-1.975H17.88c.544 0 .985.442.985.988zM17.74 10a.987.987 0 0 1-.986.987H.986a.987.987 0 0 1 0-1.976h15.767c.545 0 .986.442.986.988z"/>
              </svg>
              {/* <h1 className="antialiased text-gray-50 font-mono font-thin leading-3 ">
                {' '}
                Rocket Rides{' '}
              </h1> */}
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/dashboard">
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                </Link>

                <Link href="/cards">
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Cards
                  </a>
                </Link>

                <Link href="/financial_account">
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Financial Account
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="text-gray-300  px-3  rounded-md text-sm font-medium">
              {session.customerName}
            </span>

            <button
              type="button"
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={async (e) => {
                e.preventDefault();
                const response = await fetch('/api/logout', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                  },
                });
                window.location.replace('/signin');
              }}
            >
              <span className="sr-only">View notifications</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 490.3 490.3"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  fill="#FFFFFF"
                  d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
			s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
			c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
			C27.9,58.95,0,86.75,0,121.05z"
                />
                <path
                  fill="#FFFFFF"
                  d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
			c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
			C380.6,325.15,380.6,332.95,385.4,337.65z"
                />
              </svg>
            </button>

            <div className="ml-3 relative">
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
