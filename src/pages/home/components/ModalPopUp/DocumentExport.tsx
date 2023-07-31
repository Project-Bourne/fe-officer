import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DocumentExport() {
  const success = () => toast("Copied!");
  const copyToClipboard = () => {
    const paragraphText = document.getElementById("paragraph").innerText;
    navigator.clipboard.writeText(paragraphText);
    success();
  };
  const navigateToDashboard = () => {
    window.location.href = "../../home/dashboard/homedashboard";
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold ml-10 text-black">Export Content</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="relative mx-10 my-10">
            <Image
              src={require("../../../../assets/icons/exportfram.svg")}
              alt="add user"
              width={50}
              height={50}
              className="absolute left-2 top-2 cursor-pointer"
              priority
              onClick={copyToClipboard}
            />
            <div
              id="paragraph"
              className="max-h-60 overflow-y-auto scrollbar-hide border rounded-[1rem] text-black bg-sirp-dashbordb1 text-justify p-5"
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                quibusdam ipsum, harum, amet facere minima illum molestiae
                repudiandae quis nisi asperiores ut explicabo molestias neque
                veritatis quod. Magnam facere assumenda rerum veniam beatae. Qui
                ab dolorem, ducimus molestiae voluptatum quaerat earum voluptas,
                itaque soluta, eveniet veniam inventore! Laboriosam mollitia
                ratione ut nostrum praesentium quidem iste quasi deleniti dicta
                ipsa ducimus animi dolore, dolores quod tenetur amet soluta
                ipsam eos accusantium voluptatum expedita? Explicabo corporis
                reiciendis sequi. Voluptates, omnis dolore! Ipsa explicabo quia,
                molestias maiores earum consequatur minima quam corrupti veniam.
                Repellendus, dolor laborum optio omnis nostrum fugit harum
                corporis aliquid nihil id dignissimos aut ullam fugiat magni
                architecto repudiandae vitae illo consectetur possimus eius amet
                sint doloribus in cupiditate? Ab nemo in maxime hic dolores,
                omnis reiciendis recusandae quisquam vitae non rerum quas velit?
                Dolores ratione similique provident minus quidem recusandae ad
                libero officiis architecto ut magnam optio voluptatum
                reprehenderit numquam at officia quibusdam quia iusto, minima
                eaque animi eius quos aliquid. Aliquid distinctio et doloribus
                nulla aliquam porro molestiae est, inventore amet aperiam
                perspiciatis eligendi dignissimos totam ea asperiores eum,
                explicabo recusandae iste unde libero provident facilis
                perferendis incidunt cum! Nesciunt laboriosam molestias rem.
                Quidem, blanditiis illo. Non, molestiae?
              </p>
            </div>
          </div>
          <Button
            className="flex gap-x-1 items-center mt-10 rounded-[1rem] mb-5"
            size="lg"
            background="bg-sirp-primary"
            onClick={navigateToDashboard}
            value={
              <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                <label className="text-white">
                  Export to collab work work space
                </label>
                <Image
                  src={require("../../../../assets/icons/arrow-narrow-white-left 1.svg")}
                  alt="add user"
                  width={25}
                  height={25}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <ToastContainer />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentExport;
