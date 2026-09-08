import { defineConfig } from "oxlint"
import thesis from "@thesis-co/oxc-config/oxlint"
import thesisReact from "@thesis-co/oxc-config/oxlint/react"

export default defineConfig({
  extends: [thesis, thesisReact],
  plugins: [],
  ignorePatterns: ["test/fixtures"],
})
