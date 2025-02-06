import Logopng from '/public/logos/logo.svg';
import Profilesvg from '/public/logos/profile.svg';
export function Header() {
  return (
    <header className="flex justify-center items-center px-[6rem] py-[18px] h-[97px]  border-b-[1.8px]  border-b-[#ececefcf]  ">
      <div className="flex justify-between items-center p-0   w-full">
        <div className="flex items-center gap-2">
          <Logopng
            // src={Logopng}
            alt="Mammothzy Logo"
            width={196}
            height={75}
            // className="h-10 w-auto mr-2"
          />
        </div>

        <nav className="flex flex-grow-1"></nav>

        <div>
          <a href="#" className="flex items-center gap-2 text-sm ">
            <Profilesvg alt="Profile logo" width={36} height={37} />
            <span className=" font-semibold text-[16px] text-gray-800 leading-[28px] ">
              Profile
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
