// @ts-check

/** @satisfies {import("oxlint").OxlintConfig} */
const config = {
  plugins: ["react", "jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/jsx-no-target-blank": "error",
    "react/no-unknown-property": "off",

    "jsx-a11y/no-autofocus": "off",
  },
}

export default config
