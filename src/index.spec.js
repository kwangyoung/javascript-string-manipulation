/* eslint-disable no-unused-vars */
const { describe, it } = require("mocha");
const { expect, assert } = require("chai");
const { lf } = global.lf || require("index.js");

describe("CRLF Converter", () => {
  describe("lf", () => {
    it("should replace CRLF at the beginning of a string", () => {
      const result = lf`\r\nHello there.`;

      // Use `String.prototype.startsWith()`
      expect(result.startsWith(`\nH`)).to.be.true;
    });

    it("should replace CRLF at the end of a string", () => {
      const result = lf`Hello there.\r\n`;

      // Use `String.prototype.endsWith()`
      expect(result.endsWith(`.\n`)).to.be.true;
    });

    it("should replace CRLF in the middle of a string", () => {
      const result = lf`Hello \r\n\r\nthere.`;

      // Use `String.prototype.includes()`
      expect(result.includes(`\n\n`)).to.be.true;
    });
  });
});
