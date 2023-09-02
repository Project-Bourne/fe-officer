import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AuthorSection from "./section_skeleton/AuthorSection";
import ConfidenceSection from "./section_skeleton/ConfidenceSection";
import TagsKeywordsSection from "./section_skeleton/TagsKeywordsSection";
import SourceSection from "./section_skeleton/SourceSection";

const data = {
  title:
    "22 Insightful quotes from our speakers (link to recording at the end)",
  author: {
    name: "Peter Duru",
    location: "Transcorp Hilton Abuja",
  },
  confidence: 76.6,
  location: {
    country: "USA",
    city: "Dallas",
  },
  date: {
    date: "12/12/2023",
    time: "12:10 AM",
  },
  sources: [
    {
      id: 1,
      key: "Twitter",
    },
    {
      id: 2,
      key: "Facebook",
    },
    {
      id: 3,
      key: "CNN",
    },
  ],
  tags: [
    {
      id: 1,
      key: "UI Design",
    },
    {
      id: 2,
      key: "Web 3 Design",
    },
    {
      id: 3,
      key: "Tutorial",
    },
  ],
};



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
        <AuthorSection isLoading={isLoading}  />
        <ConfidenceSection isLoading={isLoading} confidence={confidence} />
        <TagsKeywordsSection isLoading={isLoading} />
        <SourceSection isLoading={isLoading}  />
      </div>
    </div>
  );
}
export default MetaData;
