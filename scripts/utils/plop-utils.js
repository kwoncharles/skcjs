const { getPackageJsonManager } = require('./packageJsonManager');
const { promises } = require('fs');

/**
 * 
 * @param {import('plop').NodePlopAPI} plop
 * @param {object} [option] 
 * @param {Array<{
 *  name: string;
 *  handler: import('plop').CustomActionFunction;
 * }>} [option.customActions]
 */
function initializePlop(plop, option) {
  option?.customActions?.forEach(({ name, handler }) => {
    plop.setActionType(name, handler);
  });
}

const updatePackageJsonAction = {
  name: 'update-pkg-json',
  /** @type {import('plop').CustomActionFunction} */
  handler: async function (answers, config, plop) {
    return new Promise((resolve, reject) => {
      try {
        const pkgManager = getPackageJsonManager('react-utils');
        pkgManager
          .updateField(config.fieldName, config.setter)
          .then(() => {
            console.log('successfully created');
            resolve();
          });
      } catch (e) {
        console.error('Error occured during update package.json field', e);
        reject(e);
      }
    });
  },
  /**
   * 
   * @param {object} params
   * @param {string} params.fieldName
   * @param {(prev: string) => string} params.setter
   */
  createParams: (params) => ({
    ...params,
  }),
};

const concatCodeAction = {
  name: 'concat-code',
  /** @type {import('plop').CustomActionFunction} */
  handler: function (answers, config, plop) {
    return new Promise(async (res, rej) => {
      try {
        const buffer = await promises.readFile(config.filePath);
        const prevCode = buffer.toString()
        const newCode = typeof config.setter === 'function'
          ? config.setter(prevCode)
          : prevCode.concat(config.value || '');
  
        await promises.writeFile(config.filePath, newCode);
        res();
      } catch (e) {
        console.error(`Error occured during update ${config.filePath}`, e);
        reject(e);
      }
    });
  },
  /**
   * 
   * @param {object} params
   * @param {string} params.filePath
   * @param {string} [params.value]
   * @param {(prev: string) => string} [params.setter]
   */
  createParams: (params) => ({
    ...params,
  }),
};

module.exports = {
  initializePlop,
  updatePackageJsonAction,
  concatCodeAction,
}
