module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["de-AT"],
    defaultLocale: "de-AT",
  },
  images: { domains: ["images.prismic.io", "colinhadler.cdn.prismic.io"] },
};
