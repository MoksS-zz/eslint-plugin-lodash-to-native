/**
 * @fileoverview map
 * @author Maksim Shuvaev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../.././../lib/rules/map.js"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
const error = {
  message: "Use native array map method",
  type: "MemberExpression",
};
ruleTester.run("lodash-to-native", rule, {

  valid: [
    {
      code: "[1, 2, 3].map(fn)"
    },
    {
      code: "_.map({a: 1, b: 2, c: 3}, fn)"
    },
    {
      code: "(new Array(1,2,3,4,5)).map(fn)"
    },
    {
      code: `
        var arr = "string".split("");
        arr.map(fn)`
    },
    {
      code: `
        arr = [1,2,3,4];
        arr.map(fn);
      `
    },
    {
      code: `
        obj = {a:1, b:2, c:3}
        _.map(obj, fn)
      `
    }
  ],

  invalid: [
    {
      code: "_.map([1, 2, 3], fn)",
      errors: [error]
    },
    {
      code: "_.map([{a: 1, b: 2, c: 3}], fn)",
      errors: [error]
    },
    {
      code: "_.map([], fn)",
      errors: [error]
    },
    {
      code: "_.map([{a:1, b:2}, {c:3, d:4}, {}], fn)",
      errors: [error]
    },
    {
      code: `
        arr = [1,2,3,4,5];
        _.map(arr, fn)

      `,
      errors: [error]
    }
  ]
});
