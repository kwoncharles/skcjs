const {
  initializePlop,
  updatePackageJsonAction,
  concatCodeAction,
} = require('./utils/plop-utils');
const path = require('path');

module.exports = function(
	/** @type {import('plop').NodePlopAPI} */
  plop,
) {
  initializePlop(
    plop,
    {
      customActions: [
        updatePackageJsonAction,
        concatCodeAction,
      ],
    },
  );

  plop.setGenerator('react-hook-util', {
    description: 'add new react hook',
    prompts: [{
      type: 'input',
      name: 'hookNameInKebab',
      message: 'The name of new Hook in kebab-case (e.g. use-text-field)',
      validate: (answer) => answer.length > 0,
    }, {
      type: 'input',
      name: 'hookNameInCamel',
      message: 'The name of new Hook in camelCase (e.g. useTextField)',
      validate: (answer) => answer.length > 0,
    }],
    actions: function (answers) {
      const { hookNameInKebab, hookNameInCamel } = answers;
      const actions = [];

      actions.push({
        type: 'addMany',
        templateFiles: '../plop-templates/react-hook-utils/under-src/**',
        base: '../plop-templates/react-hook-utils/under-src',
        destination: '../packages/react-utils/src',
        data: { hookNameInKebab, hookNameInCamel },
      });

      actions.push({
        type: 'addMany',
        templateFiles: '../plop-templates/react-hook-utils/under-root/**',
        base: '../plop-templates/react-hook-utils/under-root/',
        destination: '../packages/react-utils',
        data: { hookNameInKebab },
      });

      actions.push({
        type: updatePackageJsonAction.name,
        ...updatePackageJsonAction.createParams({
          fieldName: 'files',
          setter: (prev) => (
            prev.includes(hookNameInKebab)
              ? prev
              : [...prev, hookNameInKebab]
          ),
        }),
      });

      actions.push({
        type: concatCodeAction.name,
        ...concatCodeAction.createParams({
          filePath: path.relative(
            process.cwd(),
            'packages/react-utils/src/index.ts',
          ),
          setter: (
            /** @type string */
            prev
          ) => {
            const newLine = `export * from './${hookNameInKebab}';`;
  
            return prev.includes(newLine)
              ? prev
              : prev.concat(`${prev.endsWith('\n') ? '' : '\n'}${newLine}\n`)
          },
        }),
      });

      return actions;
    },
  });
}
