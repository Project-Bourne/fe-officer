import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import data from "./data";
import AuthorSection from "./section_skeleton/AuthorSection";
import ConfidenceSection from "./section_skeleton/ConfidenceSection";
import TagsKeywordsSection from "./section_skeleton/TagsKeywordsSection";
import SourceSection from "./section_skeleton/SourceSection";

function MetaData() {
  const { author, confidence, tags, sources } = data;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-white mx-5 mb-5">
      <div className="mx-5 flex flex-wrap gap-10">
        <AuthorSection isLoading={isLoading} author={author} />
        <ConfidenceSection isLoading={isLoading} confidence={confidence} />
        <TagsKeywordsSection isLoading={isLoading} tags={tags} />
        <SourceSection isLoading={isLoading} sources={sources} />
      </div>
    </div>
  );
}
export default MetaData;
