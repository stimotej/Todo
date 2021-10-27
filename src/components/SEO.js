import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import favicon from "../images/favicon.png";

const query = graphql`
  {
    site {
      siteMetadata {
        siteDesc: description
        image
      }
    }
  }
`;

const Seo = ({ title, description }) => {
  const { site } = useStaticQuery(query);
  const { siteDesc, image } = site.siteMetadata;
  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={title}>
      <meta name="description" content={description || siteDesc} />
      <meta name="image" content={image} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
    </Helmet>
  );
};

export default Seo;
