export default function getLocalStorageData(key) {
  const currentValueInLocalStorage = window.sessionStorage.getItem(key);
  if (
    typeof currentValueInLocalStorage === "string" &&
    currentValueInLocalStorage.includes("null")
  ) {
    return null;
  } else {
    return currentValueInLocalStorage;
  }
}
