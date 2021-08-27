module.exports = {
  rules: {
    'disallowComments': {
      create: function(context) {
        const sourceCode = context.getSourceCode();
        function processComment(comment) {
          const re = /^\s?(global|eslint)/
          if (comment && !re.test(comment.value)) {
            context.report({
              node: null,
              loc: comment.loc,
              message: 'Comments are forbidden',
              fix(fixer) {
                return fixer.remove(comment)
              },
            });
          }
        }
        return {
          Program(node) {
            const comments = sourceCode.getAllComments();
            comments.forEach(processComment);
          },
        }
      }
    }
  }
}