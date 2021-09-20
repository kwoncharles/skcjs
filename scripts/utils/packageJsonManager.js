const path = require('path');
const { promises } = require('fs');
const { matcher } = require('./matcher');

const DEFAULT_PATH = Symbol();

/**
 * 
 * @param {'react-utils' | 'playground'} package 
 */
function getPackageJsonManager(
  package,
) {
  const pkgJsonPath = matcher(package, DEFAULT_PATH)({
    'react-utils': () => 'packages/react-utils/package.json',
    'playground': () => 'packages/playground/package.json',
  });

  if (pkgJsonPath === DEFAULT_PATH) {
    throw new Error(`Provided package value is invalid: ${package}`);
  }

  const packageJson = require(path.join(process.cwd(), pkgJsonPath));

  return {
    /**
     * 
     * @param {keyof typeof packageJson} fieldName
     * @param {(param: typeof packageJson[fieldName]) => typeof packageJson[fieldName]} setter 
     */
    updateField: async function (fieldName, setter) {
      let newPkgJson = {...packageJson};
      const currentValue = packageJson[fieldName];
      const newValue = setter(currentValue);
      newPkgJson[fieldName] = newValue;

      const writePath = path.join(
        process.cwd(),
        pkgJsonPath,
      );

      await promises
        .writeFile(
          writePath,
          JSON.stringify(newPkgJson, undefined, 2).concat('\n'),
        )
        .then((e) => {
          console.log('successfully update package.json!', e);
        });
    },
  }
}

module.exports = {
  getPackageJsonManager,
};
