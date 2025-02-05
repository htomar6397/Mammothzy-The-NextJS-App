import Logosvg from '/public/logos/logo.svg';
import Profilesvg from '/public/logos/profile.svg';
export function Header() {
  return (
    <header className="flex justify-center items-center px-[6rem] py-[18px] h-[97px]  border-b-[1.5px]  border-b-[#E9E9EB]  ">
      <div className="flex justify-between items-center p-0   w-full">
        <div className="flex items-center gap-2">
          <Logosvg
            // src={logosvg}
            alt="Mammothzy Logo"
            width={196}
            height={75}
            // className="h-10 w-auto mr-2"
          />
        </div>

        <nav className="flex flex-grow-1"></nav>

        <div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <Profilesvg alt="Profile logo" width={36} height={37} />
            <span className=" not-italic font-semibold text-[16px] leading-[24px] ">
              Profile
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
