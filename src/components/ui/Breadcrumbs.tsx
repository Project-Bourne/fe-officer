import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

// ... (imports and other code)

function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "");
  const fileName = pathSegments[pathSegments.length - 1]; // Extract the last segment as the file name

  return (
    <div className="w-full py-1 pl-5 flex gap-2 items-start border-y-2">
      {pathSegments.map((crumb, i) => {
        const isLastItem = i === pathSegments.length - 1;

        if (i !== 1) {
          // Skip the second item in pathSegments array
          if (!isLastItem) {
            return (
              <React.Fragment key={i}>
                <Link
                  href={router.asPath.split(crumb)[0] + crumb}
                  className="text-sm text-sirp-primary hover:text-sirp-primary hover:underline capitalize"
                >
                  {crumb}
                </Link>
                {/* separator */}
                <span key={`separator-${i}`} className="text-gray-300">
                  {" "}
                  /{" "}
                </span>
              </React.Fragment>
            );
          } else {
            return (
              <span key={`filename-${i}`} className="text-sm capitalize">
                {fileName}
              </span>
            );
          }
        } else {
          return null; // Skip rendering the second item in the breadcrumb
        }
      })}
    </div>
  );
}

export default Breadcrumbs;
