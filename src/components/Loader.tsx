import React from "react";
import Loading from "../assets/Loading.gif";
export const Loader: React.FC = () => {
  return (
    <>
    <div className="p-5 flex justify-center">
      <img className="size-28" src={Loading} />
      </div>
    </>
  );
};
export default Loader;
