import React, { ReactNode } from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
const Footer = () => {
  type TOs = {
    name: string;
    icon: ReactNode;
  };
  const Os = ({ name, icon }: TOs) => {
    return (
      <div className="flex bg-black p-2 rounded-md w-full max-w-[200px] ">
        <div className="p-3 rounded-full">{icon}</div>
        <div className="fx-c">
          <h5 className="h6">Download In</h5>
          <p>{name}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-6 gap-5 justify-between pxs py-10
    border-b border-t
    "
    >
      <div className="fx-c col-span-2">
        <h3 className="h3">About Us</h3>
        <p>
          We are a company that provides a platform for people to buy and sell
          products
        </p>
      </div>
      <div className="fx-c col-span-2">
        <h3 className="h3">Contact Us</h3>
        <div className="fx-c mt-3 gap-2 ">
          <p>
            <span className="font-bold">Email:</span>
            <span>
              <a href="mailto:assad@gmail.com">turfkenya@gmail.com</a>
              <span></span>
            </span>
          </p>
          <p>
            <span className="font-bold">Phone:</span>
            <span>
              <a href="tel:+254712345678">+254712345678</a>
            </span>
          </p>
          <p>
            <span className="font-bold">Address:</span>
            <span>Nairobi, Kenya</span>
          </p>
        </div>
      </div>
      <div className="col-span-2 w-full ">
        <h3 className="h3 ">Download Our App</h3>
        <div className="flex text-background flex-wrap gap-5 w-full">
          <Os name="Google Play" icon={<IoLogoGooglePlaystore size={20} />} />
          <Os name="App Store" icon={<FaApple size={20} />} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
