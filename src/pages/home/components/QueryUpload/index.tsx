import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const QueryUpload = () => {
  const router = useRouter();
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    router.replace("/home/inputQuery/input_query");
    setFormData("");
  };

  const handleClearInput = () => {
    setFormData("");
  };

  return (
    <div className="my-[15rem] mx-5">
      <div className="flex flex-col gap-5 items-center justify-center">
        <p className="text-lg font-bold">No search queries yet</p>
        <p className="md:text-lg text-xs text-gray-500 mb-5">
          Your query results will appear here when you start querying
        </p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex align-middle align w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted">
          <span className="flex align-middle justify-center mx-3">
            <Image
              src={require(`../../../../../public/icons/search.svg`)}
              alt="upload image"
              width={20}
              height={20}
              priority
              onClick={handleFormSubmit}
              className="cursor-pointer"
            />
          </span>
          <input
            placeholder="Enter search query"
            className="py-5 w-[95%] bg-sirp-secondary2 outline-none focus:ring-0"
            value={formData}
            onChange={handleChange}
          />
          {formData && (
            <span className="flex align-middle justify-center mx-3">
              <Image
                className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                src={require(`../../../../../public/icons/x.svg`)}
                alt="upload image"
                width={20}
                height={20}
                onClick={handleClearInput}
              />
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default QueryUpload;
