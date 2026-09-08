// @ts-check

/** @satisfies {import("oxlint").OxlintConfig} */
const config = {
  plugins: ["typescript", "import", "jest", "vitest", "unicorn", "promise"],
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    "no-unused-vars": "off",
    "typescript/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "typescript/no-explicit-any": "warn",
    "typescript/no-non-null-assertion": "warn",
    "typescript/no-use-before-define": "off",
    "typescript/no-var-requires": "off",
    "typescript/ban-ts-comment": "warn",

    // Type-aware rules. They run only when the consumer passes --type-aware.
    "typescript/no-floating-promises": "error",
    "typescript/no-misused-promises": "error",
    "typescript/await-thenable": "error",
    "typescript/no-for-in-array": "error",
    "typescript/no-implied-eval": "error",
    "typescript/no-unnecessary-type-assertion": "warn",
    "typescript/no-unnecessary-condition": "warn",
    "typescript/restrict-template-expressions": "warn",
    "typescript/restrict-plus-operands": "warn",
    "typescript/switch-exhaustiveness-check": "warn",
    "typescript/only-throw-error": "warn",
    "typescript/prefer-optional-chain": "warn",
    "typescript/no-deprecated": "warn",
    "typescript/no-base-to-string": "warn",

    // Type-aware rules that flag idiomatic code in our projects.
    "typescript/no-unsafe-argument": "off",
    "typescript/no-unsafe-assignment": "off",
    "typescript/no-unsafe-call": "off",
    "typescript/no-unsafe-member-access": "off",
    "typescript/no-unsafe-return": "off",
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/no-unsafe-enum-comparison": "off",
    "typescript/no-unsafe-unary-minus": "off",
    "typescript/unbound-method": "off",
    "typescript/require-await": "off",
    "typescript/no-misused-spread": "off",
    "typescript/no-redundant-type-constituents": "off",
    "typescript/no-unnecessary-boolean-literal-compare": "off",
    "typescript/no-unnecessary-type-arguments": "off",
    "typescript/no-unnecessary-template-expression": "off",

    "no-console": "warn",
    "no-await-in-loop": "warn",
    "no-param-reassign": "off",
    // `x == null` is the idiom for "null or undefined".
    eqeqeq: ["error", "always", { null: "ignore" }],

    // airbnb bans these; we never did.
    "no-continue": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-nested-ternary": "off",
    "no-bitwise": "off",
    "no-void": "off",
    "class-methods-use-this": "off",
    "default-case": "off",
    "no-case-declarations": "off",

    "import/default": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-self-import": "warn",
    "import/no-cycle": "warn",
    "import/no-unassigned-import": "off",

    "jest/no-focused-tests": "error",
    "jest/no-conditional-expect": "off",
    "jest/expect-expect": "off",
    "jest/valid-title": "off",
    "jest/no-export": "off",
    "jest/valid-expect": "off",
    "jest/require-to-throw-message": "off",
    "jest/no-disabled-tests": "off",

    // `hoisted-apis-on-top` reads `vi.mocked` as a hoisted API, and
    // `no-standalone-expect` objects to `expect` inside `beforeEach` and in
    // shared assertion helpers. The jest plugin has the same rule.
    "jest/no-standalone-expect": "off",
    "vitest/hoisted-apis-on-top": "off",
    "vitest/no-standalone-expect": "off",
    "vitest/no-conditional-expect": "off",
    "vitest/require-to-throw-message": "off",
    "vitest/valid-expect": "off",
    "vitest/expect-expect": "off",
    "vitest/require-mock-type-parameters": "off",

    "unicorn/prefer-node-protocol": "warn",
    "unicorn/no-array-sort": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/require-module-specifiers": "off",
    "unicorn/no-array-reverse": "off",
    "unicorn/no-useless-spread": "off",
    "unicorn/no-empty-file": "off",
    "unicorn/prefer-string-starts-ends-with": "off",
    "unicorn/require-post-message-target-origin": "off",

    "promise/always-return": "off",

    "preserve-caught-error": "off",
  },
}

export default config
