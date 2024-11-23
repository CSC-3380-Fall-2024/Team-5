import React from "react";
import { useParams } from "react-router-dom";

const SubjectPage: React.FC = () => {
  const { subjectName } = useParams<{ subjectName: string }>();

  return (
    <div>
      <h2>{subjectName}</h2>
    </div>
  );
};

export default SubjectPage;
