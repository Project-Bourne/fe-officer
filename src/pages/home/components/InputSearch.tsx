import React, { useState } from "react";
import Image from "next/image";

const InputSearch = () => {
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData(value);
    console.log("Form Data:", value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData("");
  };

  const handleClearInput = () => {
    setFormData("");
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="mt-5 px-10">
        <div className="flex align-middle align w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted">
          <span className="flex align-middle justify-center mx-3">
            <Image
              src={require(`../../../../public/icons/search.svg`)}
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
                src={require(`../../../../public/icons/x.svg`)}
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

export default InputSearch;
