import Logopng from '/public/logos/logo.svg';
import Profilesvg from '/public/logos/profile.svg';
export function Header() {
  return (
    <header className="flex justify-center items-center px-[6rem] py-[0.6625rem]   border-b-[1px]  border-b-[#E7E7E7]  ">
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
          <a href="" className="flex items-center gap-2 text-sm ">
            <Profilesvg alt="Profile logo" width={36} height={37} />
            <span className=" mb-[-3px] font-semibold text-[16px] text-gray-800 leading-[28px] ">
              Profile
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
