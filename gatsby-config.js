module.exports = {
  siteMetadata: {
    title: "Todo",
    description: "Todo app",
    author: "Timotej Sofijanović",
    image: "src/images/todo_maskable_icon_x512.png",
    siteUrl: "https://todo-minimal-pwa.netlify.app/",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/todo_maskable_icon_x512.png",
        name: `Todo`,
        short_name: `Todo`,
        start_url: `/`,
        background_color: `#F5F5F5`,
        theme_color: `#000000`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Open Sans",
              variants: ["300", "400", "500"],
            },
          ],
        },
      },
    },
  ],
};
