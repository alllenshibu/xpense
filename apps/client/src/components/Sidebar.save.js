import { useRouter } from 'next/router';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = ({ className }) => {
  const router = useRouter();

  return (
    <div className={cn('', className)}>
      <div className="space-y-1  bg-[#045757] h-[100vh] text-white">
        <div className="w-[245px] h-[335px] px-1 text-white">
          <div className="w-573 h-61 ml-2 ">
            <span className="italic text-white text-5xl font-extrabold font-inter ">X</span>
            <span className="italic text-white text-5xl font-thin font-inter ">pense</span>
          </div>

          <div className="space-y-2">
            <div
              onClick={() => {
                router.push('/dashboard');
              }}
              className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-10"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <svg
                width="26"
                height="21"
                viewBox="0 0 26 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="transactions">
                  <path
                    id="Vector"
                    d="M13 19.6875C6.71759 19.6875 1.625 15.5743 1.625 10.5C1.625 5.42574 6.71759 1.3125 13 1.3125C19.2824 1.3125 24.375 5.42574 24.375 10.5C24.375 15.5743 19.2824 19.6875 13 19.6875ZM13 7.74375H8.45V9.58125H18.6875L13 4.9875V7.74375ZM7.3125 11.4187L13 16.0125V13.2562H17.55V11.4187H7.3125Z"
                    fill="#BDBDBD"
                  />
                </g>
              </svg>
              <span style={{ marginLeft: '8px' }}>Dashboard</span>
            </div>
            <div
              onClick={() => {
                router.push('/analytics');
              }}
              className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-30"
              style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
            >
              <svg
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Subscriptions">
                  <path
                    id="Vector"
                    d="M11.6823 2.0838C6.4038 2.01521 2.09459 6.16112 2.16588 11.2395C2.23627 16.11 6.35823 20.0757 11.4205 20.1435C16.6999 20.2129 21.0082 16.067 20.936 10.9886C20.8665 6.11727 16.7446 2.15152 11.6823 2.0838ZM10.9246 10.4394L13.2507 7.87809C13.3767 7.73935 13.5549 7.65445 13.7459 7.64208C13.937 7.6297 14.1254 7.69086 14.2696 7.8121C14.4138 7.93334 14.502 8.10473 14.5149 8.28856C14.5278 8.4724 14.4642 8.65362 14.3382 8.79236L12.0121 11.3537C11.9497 11.4224 11.8739 11.4786 11.7889 11.5191C11.7039 11.5596 11.6115 11.5836 11.5169 11.5897C11.4223 11.5958 11.3273 11.584 11.2375 11.5548C11.1476 11.5256 11.0646 11.4797 10.9932 11.4197C10.9218 11.3597 10.8634 11.2867 10.8213 11.2049C10.7792 11.1232 10.7543 11.0343 10.7479 10.9432C10.7416 10.8522 10.7539 10.7609 10.7842 10.6744C10.8145 10.588 10.8622 10.5081 10.9246 10.4394ZM9.17117 14.3835C9.03579 14.5136 8.85223 14.5868 8.66084 14.5868C8.46944 14.5868 8.28588 14.5136 8.1505 14.3835L5.98687 12.2997C5.91985 12.2351 5.8667 12.1585 5.83045 12.0742C5.7942 11.9899 5.77557 11.8996 5.77561 11.8084C5.77565 11.7171 5.79437 11.6268 5.8307 11.5425C5.86702 11.4583 5.92024 11.3817 5.98732 11.3172C6.0544 11.2528 6.13402 11.2016 6.22164 11.1667C6.30926 11.1319 6.40315 11.1139 6.49798 11.114C6.5928 11.114 6.68668 11.132 6.77427 11.167C6.86185 11.2019 6.94143 11.2531 7.00845 11.3177L9.17433 13.4015C9.30921 13.5321 9.38464 13.709 9.38405 13.8931C9.38345 14.0772 9.30689 14.2536 9.17117 14.3835ZM17.1489 8.79236L12.1005 14.3492C12.0355 14.4209 11.9558 14.479 11.8665 14.5198C11.7771 14.5607 11.68 14.5834 11.5812 14.5866H11.5568C11.4619 14.5867 11.368 14.5687 11.2804 14.5337C11.1927 14.4988 11.1131 14.4476 11.046 14.383L8.88284 12.2992C8.74749 12.1689 8.6715 11.9922 8.67158 11.8079C8.67167 11.6237 8.74782 11.447 8.88329 11.3168C9.01876 11.1866 9.20245 11.1135 9.39395 11.1136C9.58545 11.1136 9.76907 11.1869 9.90442 11.3172L11.2491 12.6122C11.284 12.6459 11.3258 12.6722 11.3718 12.6897C11.4178 12.7072 11.467 12.7154 11.5164 12.7138C11.5658 12.7122 11.6144 12.7009 11.659 12.6805C11.7037 12.6601 11.7436 12.6311 11.7761 12.5953L16.0628 7.87809C16.1888 7.73935 16.3669 7.65445 16.558 7.64208C16.7491 7.6297 16.9374 7.69086 17.0816 7.8121C17.2258 7.93334 17.3141 8.10473 17.3269 8.28856C17.3398 8.4724 17.2762 8.65362 17.1502 8.79236H17.1489Z"
                    fill="#BDBDBD"
                  />
                </g>
              </svg>
              <span style={{ marginLeft: '8px' }}>Analytics</span>
            </div>
            <div
              onClick={() => {
                router.push('/goals');
              }}
              className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-30"
              style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
            >
              <svg
                width="29"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Balances">
                  <path
                    id="Vector"
                    d="M21.0533 9.02966H14.7707V10.8531C14.7707 12.1459 13.4356 13.1976 11.7947 13.1976C10.1537 13.1976 8.81869 12.1459 8.81869 10.8531V6.89357L6.13616 8.1635C5.33843 8.53797 4.8507 9.21852 4.8507 9.94791V11.4881L1.54405 12.9925C0.911651 13.279 0.692585 13.9172 1.06045 14.4154L4.3671 18.9286C4.73084 19.4268 5.54097 19.5961 6.17336 19.3096L10.4472 17.3656H16.0933C17.5524 17.3656 18.7386 16.4311 18.7386 15.2816H19.4C20.1316 15.2816 20.7226 14.816 20.7226 14.2396V12.1556H21.0533C21.603 12.1556 22.0453 11.8072 22.0453 11.3741V9.81115C22.0453 9.37807 21.603 9.02966 21.0533 9.02966ZM27.1582 7.81183L23.8516 3.2987C23.4878 2.8005 22.6777 2.63118 22.0453 2.91773L17.7715 4.86169H13.5472C13.0512 4.86169 12.5676 4.9724 12.146 5.17754L10.7613 5.85809C10.3728 6.04696 10.1413 6.38235 10.1413 6.74053V10.8531C10.1413 11.5728 10.8812 12.1556 11.7947 12.1556C12.7081 12.1556 13.448 11.5728 13.448 10.8531V7.98766H21.0533C22.3305 7.98766 23.368 8.80498 23.368 9.81115V10.7392L26.6746 9.2348C27.307 8.94499 27.5219 8.31003 27.1582 7.81183Z"
                    fill="#BDBDBD"
                  />
                </g>
              </svg>
              Goals
            </div>
            <div
              className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-30"
              style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
              onClick={() => {
                router.push('/friend');
              }}
            >
              <svg
                width="24"
                height="15"
                viewBox="0 0 24 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4957 14.0597C10.4957 14.0597 9.04272 14.0597 9.04272 12.902C9.04272 11.7443 10.4957 8.27131 16.3077 8.27131C22.1196 8.27131 23.5726 11.7443 23.5726 12.902C23.5726 14.0597 22.1196 14.0597 22.1196 14.0597H10.4957ZM16.3077 7.11364C17.4637 7.11364 18.5725 6.74773 19.3899 6.09641C20.2074 5.4451 20.6666 4.56173 20.6666 3.64062C20.6666 2.71953 20.2074 1.83615 19.3899 1.18484C18.5725 0.53352 17.4637 0.167614 16.3077 0.167614C15.1516 0.167614 14.0429 0.53352 13.2254 1.18484C12.4079 1.83615 11.9487 2.71953 11.9487 3.64062C11.9487 4.56173 12.4079 5.4451 13.2254 6.09641C14.0429 6.74773 15.1516 7.11364 16.3077 7.11364ZM7.90357 14.0597C7.68817 13.6983 7.58075 13.302 7.58973 12.902C7.58973 11.3333 8.57776 9.71839 10.4027 8.59545C9.49182 8.37183 8.54281 8.26248 7.58973 8.27131C1.77776 8.27131 0.324768 11.7443 0.324768 12.902C0.324768 14.0597 1.77776 14.0597 1.77776 14.0597H7.90357ZM6.86323 7.11364C7.82662 7.11364 8.75056 6.80871 9.43178 6.26595C10.113 5.72319 10.4957 4.98704 10.4957 4.21946C10.4957 3.45188 10.113 2.71573 9.43178 2.17297C8.75056 1.63021 7.82662 1.32528 6.86323 1.32528C5.89984 1.32528 4.9759 1.63021 4.29468 2.17297C3.61346 2.71573 3.23075 3.45188 3.23075 4.21946C3.23075 4.98704 3.61346 5.72319 4.29468 6.26595C4.9759 6.80871 5.89984 7.11364 6.86323 7.11364Z"
                    fill="#BDBDBD"
                  />
                </g>
              </svg>
              Friends
            </div>
            <div
              className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-30"
              style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
              onClick={() => {
                router.push('/category');
              }}
            >
              <svg
                width="20"
                height="29"
                viewBox="0 0 24 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                    stroke="#e1e0d1"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{' '}
                  <path
                    d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                    stroke="#e1e0d1"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{' '}
                  <path
                    opacity="0.60"
                    d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                    stroke="#e1e0d1"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{' '}
                  <path
                    opacity="0.60"
                    d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                    stroke="#e1e0d1"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{' '}
                </g>
              </svg>
              Category
            </div>
            <div
              className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-30"
              style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
            >
              <div className="flex items-center">
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <g id="Group 14">
                    <rect
                      id="Rectangle 6"
                      x="0.75"
                      y="0.5"
                      width="10.5"
                      height="1.5"
                      rx="0.75"
                      fill="grey"
                    />
                    <rect
                      id="Rectangle 7"
                      x="0.75"
                      y="4.25"
                      width="10.5"
                      height="1.5"
                      rx="0.75"
                      fill="grey"
                    />
                    <rect
                      id="Rectangle 8"
                      x="0.75"
                      y="8"
                      width="10.5"
                      height="1.5"
                      rx="0.75"
                      fill="grey"
                    />
                  </g>
                </svg>
                Bills and Payments
              </div>
            </div>
          </div>
        </div>
        <div className=" py-4">
          {/*<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>*/}
          {/* <div className="space-y-2">
          <div className="w-full justify-start p-2 gap-2 hover:bg-[#84C4BF] rounded-xl mt-30" style={{ display: 'flex', alignItems: 'center' ,marginTop:'30 px'}}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Settings">
                  <path
                    id="Vector"
                    d="M21.7133 10.48L19.48 9.81333C19.3256 9.2742 19.1132 8.75339 18.8466 8.26L19.94 6.21333C19.981 6.13607 19.996 6.04765 19.9828 5.96118C19.9696 5.87471 19.9289 5.79481 19.8666 5.73333L18.2733 4.13333C18.2118 4.07111 18.1319 4.03037 18.0455 4.01716C17.959 4.00395 17.8706 4.01897 17.7933 4.06L15.76 5.14666C15.2617 4.8671 14.7341 4.64352 14.1866 4.48L13.52 2.27333C13.4918 2.19201 13.4385 2.12173 13.3678 2.07261C13.2971 2.02349 13.2127 1.99807 13.1266 2H10.8733C10.7867 2.0004 10.7026 2.02842 10.633 2.07998C10.5635 2.13154 10.5122 2.20394 10.4866 2.28666L9.81998 4.48666C9.26799 4.64931 8.73582 4.87291 8.23331 5.15333L6.23331 4.07333C6.15606 4.0323 6.06764 4.01728 5.98117 4.03049C5.8947 4.0437 5.81479 4.08444 5.75331 4.14666L4.13331 5.72666C4.07109 5.78814 4.03035 5.86805 4.01714 5.95452C4.00393 6.04098 4.01896 6.12941 4.05998 6.20666L5.13998 8.20666C4.86002 8.70706 4.63643 9.23697 4.47331 9.78666L2.26665 10.4533C2.18393 10.4789 2.11152 10.5302 2.05996 10.5997C2.0084 10.6692 1.98038 10.7534 1.97998 10.84V13.0933C1.98038 13.1799 2.0084 13.2641 2.05996 13.3336C2.11152 13.4032 2.18393 13.4544 2.26665 13.48L4.48665 14.1467C4.65154 14.6872 4.8751 15.2081 5.15331 15.7L4.05998 17.7933C4.01896 17.8706 4.00393 17.959 4.01714 18.0455C4.03035 18.1319 4.07109 18.2118 4.13331 18.2733L5.72665 19.8667C5.78813 19.9289 5.86803 19.9696 5.9545 19.9828C6.04097 19.996 6.12939 19.981 6.20665 19.94L8.26665 18.84C8.75396 19.1029 9.26799 19.313 9.79998 19.4667L10.4666 21.7133C10.4922 21.796 10.5435 21.8685 10.613 21.92C10.6826 21.9716 10.7667 21.9996 10.8533 22H13.1066C13.1932 21.9996 13.2774 21.9716 13.3469 21.92C13.4165 21.8685 13.4678 21.796 13.4933 21.7133L14.16 19.46C14.6874 19.3056 15.197 19.0955 15.68 18.8333L17.7533 19.94C17.8306 19.981 17.919 19.996 18.0055 19.9828C18.0919 19.9696 18.1718 19.9289 18.2333 19.8667L19.8266 18.2733C19.8889 18.2118 19.9296 18.1319 19.9428 18.0455C19.956 17.959 19.941 17.8706 19.9 17.7933L18.7933 15.7267C19.0582 15.2418 19.2705 14.73 19.4266 14.2L21.6733 13.5333C21.756 13.5078 21.8284 13.4565 21.88 13.387C21.9316 13.3174 21.9596 13.2332 21.96 13.1467V10.8733C21.9639 10.7904 21.9424 10.7083 21.8983 10.638C21.8542 10.5677 21.7897 10.5126 21.7133 10.48ZM12 15.6667C11.2748 15.6667 10.5659 15.4516 9.96289 15.0487C9.35991 14.6458 8.88994 14.0732 8.61242 13.4032C8.3349 12.7332 8.26229 11.9959 8.40377 11.2847C8.54525 10.5734 8.89446 9.92006 9.40725 9.40727C9.92005 8.89448 10.5734 8.54526 11.2846 8.40378C11.9959 8.2623 12.7332 8.33492 13.4032 8.61244C14.0731 8.88996 14.6458 9.35992 15.0487 9.9629C15.4516 10.5659 15.6666 11.2748 15.6666 12C15.6666 12.9725 15.2803 13.9051 14.5927 14.5927C13.9051 15.2804 12.9724 15.6667 12 15.6667Z"
                    fill="#BDBDBD"
                  />
                </g>
              </svg>
              Settings
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;