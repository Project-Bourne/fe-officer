import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AuthorSection from "./section_skeleton/AuthorSection";
import ConfidenceSection from "./section_skeleton/ConfidenceSection";
import TagsKeywordsSection from "./section_skeleton/TagsKeywordsSection";
import SourceSection from "./section_skeleton/SourceSection";



const author = [''];
const level = '55%';
const backedBy = [''];
const sources = ['']

function MetaData({ facts }) {
 console.log('facts', facts)
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
          author={author}
          isLoading={isLoading}  
          />
        <ConfidenceSection
          isLoading={isLoading}
          confidence={level}
          />
        <TagsKeywordsSection
          allTags={backedBy}
          isLoading={isLoading}
          />
        <SourceSection
          allSources={sources}
          isLoading={isLoading}
           />
      </div>
    </div>
  );
}
export default MetaData;
