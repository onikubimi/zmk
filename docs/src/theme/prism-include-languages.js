import siteConfig from "@generated/docusaurus.config";
export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism;
  // Prism components work on the Prism instance on the window, while prism-
  // react-renderer uses its own Prism instance. We temporarily mount the
  // instance onto window, import components to enhance it, then remove it to
  // avoid polluting global namespace.
  // You can mutate PrismObject: registering plugins, deleting languages... As
  // long as you don't re-assign it
  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`);
  });

  require("./prism/components/prism-devicetree.js");
  require("./prism/components/prism-kconfig.js");

  delete globalThis.Prism;
}
