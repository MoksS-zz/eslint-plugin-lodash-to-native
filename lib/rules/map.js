/**
 * @fileoverview map
 * @author Maksim Shuvaev
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  type: "suggestion",
  meta: {
    docs: {
      description: "lodash map only for object",
      category: "map method",
      recommended: false
    },
    fixable: "code",  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {

    const getTypeOfVariable = node => {
      const scope = context.getScope();
      const reference = scope.references.find(r => node.name === r.identifier.name);

      // console.log("text" ,reference);
      if (reference === undefined) return "";
      if (reference.writeExpr === undefined) return "Identifier"

      return reference.writeExpr.type;
    }

    let isUnderscoreRedefined = false;

    return {

      "AssignmentExpression:matches([left.name='_'], [left.object.name=/window|global/])": function (node) {
        if (isUnderscoreRedefined) return;
        else isUnderscoreRedefined = true;
      },

      "VariableDeclaration[declarations.0.id.name='_']": function (node) {
        if (isUnderscoreRedefined) return;

        if (node.declarations[0].init.type !== "CallExpression") {
          isUnderscoreRedefined = true;
        }
      },

      MemberExpression(node) {
        const callExpression = node.parent;
        if (node.object.name === "_" && node.property.name === "map") {
          if (isUnderscoreRedefined) return;
  
          if (callExpression.parent.type === 'ConditionalExpression') return;

          const arg = node.parent.arguments;

          if (arg[0].type ==="ObjectExpression"){
            return;
          }else if (arg[0].type === "ArrayExpression") {
            context.report({
              node,
              message: "Use native array map method",
              fix: function (fixer) {
                const code = context.getSourceCode();
                const arr = code.getText(arg[0]);
                const fn = code.getText(arg[1]);
                const fixCode = `${arr}.map(${fn})`;

                return fixer.replaceText(node.parent, fixCode);
              }
            })
          }

          const typeArg = getTypeOfVariable(arg[0])
          console.log("sadasd",typeArg); 
          if (typeArg === "ArrayExpression") {
            context.report({
              node,
              message: "Use native array map method",
              fix: function (fixer) {
                const code = context.getSourceCode();
                const arr = code.getText(arg[0]);
                const fn = code.getText(arg[1]);
                const fixCode = `${arr}.map(${fn})`;

                return fixer.replaceText(node.parent, fixCode);
              }
            })
          } else if (typeArg === "Identifier" || typeArg === "CallExpression") {
            context.report({
              node,
              message: "Use native array map method",
              fix: function (fixer) {
                const code = context.getSourceCode();
                const arr = code.getText(arg[0]);
                const fn = code.getText(arg[1]);
                // const fixCode = `${arr}.map(${fn})`;
                const fixCode = `Array.isArray(${arr}) ? 
                ${arr}.map(${fn}) : 
                _.map(${arr},${fn})`;

                return fixer.replaceText(node.parent, fixCode);
              }
            })
          }
        }
      }
    }
  }
};
