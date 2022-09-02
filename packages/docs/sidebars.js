/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Overview",
      items: ["main/features", "main/right-for-me", "main/getting-started"],
    },
    {
      type: "category",
      label: "Basic Info",
      items: [
        "main/discord",
        "main/what-is-isaacscript-doing",
        "main/directory-structure",
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        "main/javascript-tutorial",
        "main/example-mod",
        "main/next-steps",
        "main/refactoring-mod",
        "main/using-get-data",
        "main/enums-and-objects",
      ],
    },
    {
      type: "category",
      label: "Other Info",
      items: [
        "main/converting-lua-code",
        "main/updating-isaacscript",
        "main/custom-stages",
        "main/publishing-to-the-workshop",
        "main/gotchas",
        "main/isaacscript-common-in-lua",
      ],
    },
    "main/change-log",
  ],

  isaacTypeScriptDefinitions: [
    {
      type: "autogenerated",
      dirName: "isaac-typescript-definitions",
    },
  ],

  isaacScriptCommon: [
    {
      type: "autogenerated",
      dirName: "isaacscript-common",
    },
  ],
};

module.exports = sidebars;
