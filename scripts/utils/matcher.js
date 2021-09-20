/**
 * 
 * @param {*} value 
 * @param {*} defaultValue 
 * @returns (actionMap: { [key: typeof value]: () => typeof defaultValue }) => typeof defaultValue;
 */
function matcher(
  value,
  defaultValue,
) {
  return (actionMap) => {
    const matched = actionMap[value];

    if (matched) return matched();
    if (defaultValue !== undefined) return defaultValue;

    throw new Error(`[matcher] ${value}에 해당하는 옵션이 없습니다. default 값을 설정하거나 해당하는 옵션을 actionMap에 추가해주세요.`);
  };
}

module.exports = {
  matcher,
};
