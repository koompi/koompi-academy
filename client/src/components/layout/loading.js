import React from "react";
import ContentLoader from "react-content-loader";

const DisplaySectionLoading = () => {
  const loading = [];
  for (let i = 0; i < 5; i++) {
    loading.push(
      <ContentLoader
        height={60}
        width={300}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        key={i}
      >
        <circle cx="19" cy="25" r="16" />
        <rect x="39" y="12" rx="5" ry="5" width="220" height="10" />
        <rect x="40" y="29" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
    );
  }
  return loading;
};

const CourseDetailLoading = () => {
  return (
    <ContentLoader
      height={500}
      speed={1}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
      <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
      <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
      <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
      <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
      <rect x="0" y="99" rx="5" ry="5" width="400" height="30" />
    </ContentLoader>
  );
};

const TutorailsLoading = () => {
  return (
    <ContentLoader
      height={281}
      width={336}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="-1" y="-1" rx="0" ry="0" width="406" height="113" />
      <circle cx="53" cy="109" r="34" />
      <rect x="101" y="123" rx="3" ry="3" width="119" height="8" />
      <rect x="17" y="145" rx="0" ry="0" width="300" height="101" />
      <rect x="237" y="260" rx="0" ry="0" width="78" height="12" />
      <rect x="19" y="258" rx="0" ry="0" width="135" height="15" />
    </ContentLoader>
  );
};

export { DisplaySectionLoading, CourseDetailLoading, TutorailsLoading };
