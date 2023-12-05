import Image from "next/image";
import RightOnboard from "@/app/components/auth/RightOnboard";
import brandImg from "@/public/brand_mobile.svg";
import fi_user_screen from "@/public/fi_user_screen.svg";
import fi_briefcase from "@/public/fi_briefcase.svg";
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
                href="/auth/register/personal"
                className=" p-4 border-2 border-neutral-900 flex flex-start items-center gap-3 rounded-[9px] w-full hover:font-bold hover:border-light-blue-600"
              >
                <span>
                  <Image
                    src={fi_user_screen}
                    alt="personal user icon"
                    width={24}
                    height={24}
                  />
                </span>
                <span className="text-left">
                  <p className="text-lg text-neutral-900 my-1">Personal</p>
                  <p className="text-sm text-neutral-700 my-1">
                    For individual contractors freelancers,etc.
                  </p>
                </span>
              </Link>
              <Link
                href="/auth/register/business"
                className=" p-4 border-2 border-neutral-300 flex flex-start items-center gap-3 rounded-[9px] w-full hover:font-bold hover:border-light-blue-600"
              >
                <span>
                  <Image
                    src={fi_briefcase}
                    alt="business icon"
                    width={24}
                    height={24}
                  />
                </span>
                <span className="text-left">
                  <p className="text-lg text-neutral-900 my-1">Business</p>
                  <p className="text-sm text-neutral-700 my-1">
                    For registered businesses and corporations.
                  </p>
                </span>
              </Link>

              <Link
                href="/auth/login"
                className="text-lg text-gray-900 underline hover:text-light-blue-600 cursor-pointer"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RightOnboard />
    </main>
  );
}
