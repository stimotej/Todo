module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Todo",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: `Todo`,
        short_name: `Todo`,
        start_url: `/`,
        background_color: `#F5F5F5`,
        theme_color: `#000000`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
