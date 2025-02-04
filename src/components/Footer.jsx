import Image from "next/image";
import facebook from "/public/logos/fb.svg";
import linkedIn from "/public/logos/lkdn.svg";
import instagram from "/public/logos/ig.svg"
import gmail from "/public/logos/gmail.svg";
import logo from "/public/logos/logo.svg";


export function Footer() {
  return (
    <footer className=" p-4 text-center flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center my-[0.75rem]">
        <Image
          src={logo}
          alt=" Logo"
          width={250}
          height={96}
          // className="h-10 w-auto mr-2"
        />
      </div>
      <p className=" not-italic font-normal text-[16px] leading-[24px] text-[#6B6B6B] my-[0.75rem] tracking-[0.01]  ">
        Marketplace for searching, filtering and instantly booking team
        activities
      </p>

      <div className="flex gap-5 items-center justify-center mt-[0.75rem] ">
        <a href="/facebook">
          <Image
            src={facebook}
            alt="facebook Logo"
            // width={40}
            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
        <a href="/linkden">
          <Image
            src={linkedIn}
            alt="linkedIn logo"
            // width={40}
            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
        <a href="/instragram">
          <Image
            src={instagram}
            alt="instagram logo"
            // width={40}

            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
        <a href="/gmail">
          <Image
            src={gmail}
            alt="gmail logo"
            // width={40}
            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
      </div>

      <div className="w-[100vw] my-[0.75rem]  px-[6rem]">
        <div className="h-[1.5px] my-3 bg-[#E9E9EB]"></div>
      </div>
      <div className="  ">
        <p className=" font-medium text-[16px] leading-[160%] text-[#6B6B6B] tracking-[0.04]   ">
          Copyright © 2025
        </p>
      </div>
    </footer>
  );
}
