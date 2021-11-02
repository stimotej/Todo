import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface SeoProps {
  title: string,
  description?: string
}

interface SiteMetadata {
  site: {
    siteMetadata: {
      siteDescription: string,
      image: string
    }
  }
}

const query = graphql`
  {
    site {
      siteMetadata {
        siteDescription: description
        image
      }
    }
  }
`;

const Seo: React.FC<SeoProps> = ({ title, description }) => {
  const { site } = useStaticQuery<SiteMetadata>(query);
  const { siteDescription, image } = site.siteMetadata;
  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={title}>
      <meta name="description" content={description || siteDescription} />
      <meta name="image" content={image} />
    </Helmet>
  );
};

export default Seo;
