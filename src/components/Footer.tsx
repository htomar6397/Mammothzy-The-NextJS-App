import Facebook from "/public/logos/fb.svg";
import LinkedIn from "/public/logos/lkdn.svg";
import Instagram from "/public/logos/ig.svg"
import Gmail from "/public/logos/gmail.svg";
import Logosvg from "/public/logos/logo.svg";


export function Footer() {
  return (
    <footer className=" py-16 text-center flex flex-col items-center justify-center border-t-[1px] gap-[1.45rem]  border-t-[#E9E9EB]    ">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center ">
          <Logosvg
            // src={Logopng}

            alt=" Logo"
            width={250}
            height={96}
            // className="h-10 w-auto mr-2"
          />
        </div>

        <p className=" not-italic font-normal text-[16px] leading-[24px] text-[#6B6B6B]  tracking-[0.01]  ">
          Marketplace for searching, filtering and instantly booking team
          activities
        </p>
        <div className="flex gap-5 items-center justify-center  ">
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
      </div>

      <div
        style={{ width: "calc(100% - 14rem)" }}
        className="h-0 border-b-[1px] border-[solid] border-[#E9E9EB]   "
      ></div>
      <div className="  ">
        <p className=" h-[26px] font-medium text-[16px] leading-[160%] text-[#6B6B6B] tracking-[0.04]   ">
          Copyright © 2025
        </p>
      </div>
    </footer>
  );
}
