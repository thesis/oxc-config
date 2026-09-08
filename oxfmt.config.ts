import { defineConfig } from "oxfmt"
import thesis from "@thesis-co/oxc-config/oxfmt"

export default defineConfig({
  ...thesis,
  ignorePatterns: ["test/fixtures"],
})
