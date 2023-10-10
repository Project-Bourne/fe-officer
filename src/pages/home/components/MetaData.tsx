import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AuthorSection from "./section_skeleton/AuthorSection";
import ConfidenceSection from "./section_skeleton/ConfidenceSection";
import TagsKeywordsSection from "./section_skeleton/TagsKeywordsSection";
import SourceSection from "./section_skeleton/SourceSection";



function MetaData({ facts }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-transparent mx-5 mb-5">
      <div className=" flex flex-wrap gap-10">
        <AuthorSection
          author={facts?.author}
          isLoading={isLoading}  
          />
        <ConfidenceSection
          isLoading={isLoading}
          confidence={facts?.level}
          />
        <TagsKeywordsSection
          allTags={facts?.backedBy}
          isLoading={isLoading}
          />
        <SourceSection
          allSources={facts?.sources}
          isLoading={isLoading}
           />
      </div>
    </div>
  );
}
export default MetaData;
