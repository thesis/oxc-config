// @ts-check
import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const bin = (/** @type {string} */ name) => `${root}node_modules/.bin/${name}`

/**
 * Lints one fixture through a config from this directory and returns the rule
 * codes oxlint reported, in the `plugin(rule)` form of its JSON output. oxlint
 * exits non-zero when a fixture has errors, which is the point of a fixture.
 *
 * @param {string} config
 * @param {string} fixture
 * @returns {Set<string>}
 */
function lint(config, fixture) {
  const args = [
    "-c",
    `test/${config}`,
    "--format",
    "json",
    `test/fixtures/${fixture}`,
  ]
  const { stdout, stderr } = spawnSync(bin("oxlint"), args, {
    cwd: root,
    encoding: "utf8",
  })
  assert.ok(stdout, `oxlint produced no output:\n${stderr}`)
  const { diagnostics } = JSON.parse(stdout)
  return new Set(diagnostics.map((/** @type {{ code: string }} */ d) => d.code))
}

/**
 * @param {Set<string>} codes
 * @param {string[]} expected
 */
function assertFired(codes, expected) {
  for (const code of expected) {
    assert.ok(
      codes.has(code),
      `${code} did not fire; got: ${[...codes].join(", ")}`,
    )
  }
}

void test("the base config reports one rule from every plugin it enables", () => {
  assertFired(lint("base.config.ts", "base.test.ts"), [
    "eslint(eqeqeq)",
    "eslint(no-console)",
    "eslint(no-await-in-loop)",
    "typescript(no-explicit-any)",
    "import(no-self-import)",
    "jest(no-focused-tests)",
    "vitest(no-focused-tests)",
    "unicorn(prefer-node-protocol)",
    "promise(valid-params)",
  ])
})

void test("the react layer adds its rules on top of the base and changes nothing else", () => {
  const base = lint("base.config.ts", "react.tsx")
  const react = lint("react.config.ts", "react.tsx")
  assertFired(base, ["typescript(no-explicit-any)"])
  assert.ok(
    !base.has("react(jsx-no-target-blank)"),
    "react rules fired without the react layer",
  )
  assertFired(react, [
    "typescript(no-explicit-any)",
    "react(jsx-no-target-blank)",
    "jsx-a11y(alt-text)",
  ])
})

void test("oxfmt drops semicolons and wraps at 80 columns", () => {
  const input = readFileSync(`${root}test/fixtures/format.ts`, "utf8")
  const args = [
    "-c",
    "test/format.config.ts",
    "--stdin-filepath",
    "test/fixtures/format.ts",
  ]
  const output = execFileSync(bin("oxfmt"), args, {
    cwd: root,
    input,
    encoding: "utf8",
  })
  assert.equal(
    output,
    readFileSync(`${root}test/fixtures/format.expected.ts`, "utf8"),
  )
  assert.ok(
    output
      .split("\n")
      .every((line) => !line.endsWith(";") && line.length <= 80),
  )
})
