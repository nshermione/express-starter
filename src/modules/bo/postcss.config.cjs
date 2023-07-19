const env = process.env.ENVIRONMENT ? process.env.ENVIRONMENT.trim() : '';
const IN_PRODUCTION = env != 'development';

const plugins = [];
if (IN_PRODUCTION) {
  plugins.push(
    // @ts-ignore
    require("@fullhuman/postcss-purgecss")({
      content: [`./**/*.vue`],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(
          /<style[^]+?<\/style>/gi,
          ""
        );
        return (
          contentWithoutStyleBlocks.match(
            /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
          ) || []
        );
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    }),
  );
}
module.exports = {
  plugins
};