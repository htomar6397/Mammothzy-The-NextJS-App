import Facebook from "/public/logos/fb.svg";
import LinkedIn from "/public/logos/lkdn.svg";
import Instagram from "/public/logos/ig.svg"
import Gmail from "/public/logos/gmail.svg";
import Logosvg from "/public/logos/logo.svg";
import Image from "next/image";


export function Footer() {
  return (
    <footer className=" p-4 text-center flex flex-col items-center justify-center border-t-[1.8px]  border-t-[#ececef6a] mb-12 pt-[3.1rem]   ">
      <div className="flex items-center justify-center mt-[0.82rem] mb-[0.68rem]">
        <Logosvg
          // src={Logopng}

          alt=" Logo"
          width={250}
          height={96}
          // className="h-10 w-auto mr-2"
        />
      </div>
      <p className=" not-italic font-normal text-[16px] leading-[24px] text-[#6B6B6B] mt-[0.819rem] mb-[0.75rem] tracking-[0.01]  ">
        Marketplace for searching, filtering and instantly booking team
        activities
      </p>

      <div className="flex gap-5 items-center justify-center mt-[0.75rem] ">
        <a href="/facebook">
          <Facebook
            alt="facebook Logo"
            // width={40}
            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
        <a href="/linkden">
          <LinkedIn
            alt="linkedIn logo"
            // width={40}
            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
        <a href="/instragram">
          <Instagram
            alt="instagram logo"
            // width={40}

            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
        <a href="/gmail">
          <Gmail
            alt="gmail logo"
            // width={40}
            // height={40}
            // className="h-10 w-auto mr-2"
          />
        </a>
      </div>

      <div className="w-[100vw] my-[0.75rem]  px-[6rem]">
        <div className="h-[1.5px] my-3 bg-[#ececef6a]"></div>
      </div>
      <div className="  ">
        <p className=" font-medium text-[16px] leading-[160%] text-[#6B6B6B] tracking-[0.04]   ">
          Copyright © 2025
        </p>
      </div>
    </footer>
  );
}
