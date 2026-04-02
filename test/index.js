const { RuleTester } = require("eslint");
const { describe, it } = require("node:test");
const plugin = require("../src/index.js");

const rule = plugin.rules.disallowComments;
const ruleTester = new RuleTester();

describe("disallowComments", () => {
    it("allows eslint directives by default", () => {
        ruleTester.run("disallowComments", rule, {
            valid: [
                { code: "/* eslint-disable */" },
                { code: "/* eslint-enable no-undef */" },
                { code: "// eslint-disable-next-line no-unused-vars" },
                { code: "/* global myVar */" },
            ],
            invalid: [],
        });
    });

    it("reports regular comments", () => {
        ruleTester.run("disallowComments", rule, {
            valid: [],
            invalid: [
                {
                    code: "// a comment\nconst x = 1;",
                    errors: [{ message: "Comments are forbidden" }],
                    output: "\nconst x = 1;",
                },
                {
                    code: "/* block comment */\nconst x = 1;",
                    errors: [{ message: "Comments are forbidden" }],
                    output: "\nconst x = 1;",
                },
            ],
        });
    });

    it("respects allow option", () => {
        ruleTester.run("disallowComments", rule, {
            valid: [
                {
                    code: "// TODO: fix this",
                    options: [{ allow: ["TODO"] }],
                },
                {
                    code: "// FIXME: broken",
                    options: [{ allow: ["TODO", "FIXME"] }],
                },
            ],
            invalid: [
                {
                    code: "// a comment",
                    options: [{ allow: ["TODO"] }],
                    errors: [{ message: "Comments are forbidden" }],
                    output: "",
                },
            ],
        });
    });
});
