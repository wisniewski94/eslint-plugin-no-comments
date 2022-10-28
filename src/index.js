module.exports = {
  "rules": {
    "disallowComments": {
      meta: {
        type: "problem",
        docs: {
          description: "Comments are not allowed in this project as they can cause unnecessary noise or leak into production code. Check configuration to see the exceptions from this rule."
        },
        fixable: "code",
      },
      "create"(context) {
        const sourceCode = context.getSourceCode();
        function processComment(comment) {
          const options = context.options[0] || {};
          const allow = options && options.allow || [];
          let re = /^\s?(global|eslint)/;
          if (allow.length > 0) {
            re = new RegExp(`^\\s?(${allow.join("|")})`);
          }
          if (comment && !re.test(comment.value)) {
            context.report({
              fix(fixer) {
                return fixer.remove(comment);
              },
              "loc": comment.loc,
              "message": "Comments are forbidden",
              "node": null
            });
          }
        }
        return {
          Program() {
            const comments = sourceCode.getAllComments();
            comments.forEach(processComment);
          }
        };
      }
    }
  }
};