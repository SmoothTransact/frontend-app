import Image from "next/image";
import RightOnboard from "./components/auth/RightOnboard";
import brandImg from "../public/brand_mobile.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="onboardScreen">
      <section className="onboardScreenLeft">
        <div className="lg:max-w-[440px] mb-4 mt-0">
          <div className="lg:hidden md:hidden  px-0 top-0 ">
            <Image
              src={brandImg}
              alt="Brand Image"
              className="dark:invert"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              priority
            />
          </div>
          <div className="px-6 flex justify-center flex-col items-center lg:min-h-screen mt-12 lg:py-0 py-16 w-auto ">
            <h2 className="lg:text-5xl text-4xl font-bold text-center text-gray-900">
              Welcome to Smooth Transact
            </h2>
            <p className="my-3 text-gray-700  lg:text-lg gtext-base font-semibold">
              What type of account are you creating?
            </p>

            <div className="flex justify-center items-center text-center flex-col gap-4">
              <Link
                href="/auth/register"
                className=" p-4 border-2 border-neutral-900 flex flex-start items-center gap-3 rounded-[9px] w-full hover:font-bold"
              >
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21.5V19.5C20 18.4391 19.5786 17.4217 18.8284 16.6716C18.0783 15.9214 17.0609 15.5 16 15.5H8C6.93913 15.5 5.92172 15.9214 5.17157 16.6716C4.42143 17.4217 4 18.4391 4 19.5V21.5"
                      stroke="#1D1D24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z"
                      stroke="#1D1D24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-left">
                  <p className="text-lg text-neutral-900 my-1">Personal</p>
                  <p className="text-sm text-neutral-700 my-1">
                    For individual contractors freelancers,etc.
                  </p>
                </span>
              </Link>
              <Link
                href="/auth/register"
                className=" p-4 border-2 border-neutral-300 flex flex-start items-center gap-3 rounded-[9px] w-full hover:font-bold hover:border-neutral-900"
              >
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.5H4C2.89543 7.5 2 8.39543 2 9.5V19.5C2 20.6046 2.89543 21.5 4 21.5H20C21.1046 21.5 22 20.6046 22 19.5V9.5C22 8.39543 21.1046 7.5 20 7.5Z"
                      stroke="#1D1D24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 21.5V5.5C16 4.96957 15.7893 4.46086 15.4142 4.08579C15.0391 3.71071 14.5304 3.5 14 3.5H10C9.46957 3.5 8.96086 3.71071 8.58579 4.08579C8.21071 4.46086 8 4.96957 8 5.5V21.5"
                      stroke="#1D1D24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-left">
                  <p className="text-lg text-neutral-900 my-1">Business</p>
                  <p className="text-sm text-neutral-700 my-1">
                    For registered businesses and corporations.
                  </p>
                </span>
              </Link>

              <Link href="/auth/login" className="flex items-center gap-1">
                <p className="text-lg text-gray-900 underline">
                  I already have an account
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
