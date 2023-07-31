import React from 'react';
import Link from 'next/link';
function summarizeSettings() {
  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
        <div className="flex gap-5 mt-5 mx-5 items-center">
          <small className="text-sm text-gray-500  mb-5">Title:</small>
          <p className="text-[14px] font-sm">
            Redesigned Naira: CBN launches Cash Swap Programme for rural
            Development
          </p>
        </div>
        <form action="" className="flex flex-col mx-5">
          <label htmlFor="length" className="text-sm text-gray-500">
            Length
          </label>
          <select
            name="cars"
            id="cars"
            className="border p-2 my-3 rounded-[.3rem]"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="length" className="text-sm text-gray-500">
            Content Type
          </label>
          <select
            name="cars"
            id="cars"
            className="border p-2 my-3 rounded-[.3rem]"
          >
            <option value="sentence">Sentence(s)</option>
            <option value="paragraph">Paragraph(s)</option>
          </select>

          <Link href="../../../home/homecontent/homecontent">
            <button className="p-4 cursor-pointer flex w-[100%] align-middle justify-center bg-sirp-primary  text-white rounded-[1rem] text-[15px]">
              Summarize Content
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default summarizeSettings;
