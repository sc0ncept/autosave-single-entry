let storagePrefix = 'from-autosave_';

const getId = function (input) {
  if (input.id.length > 0) {
    return input.id;
  }

  if (input.name.length > 0) {
    return input.name;
  }

  return null;
}

const loadData = function () {
  const inputs = document.querySelectorAll('#save-me input, #save-me textarea');

  Array.prototype.slice.call(inputs).forEach(function (input) {

    const id = getId(input);
    if (!id) return;

    const saved = localStorage.getItem(storagePrefix + id);
    if (!saved) return;

    input.value = saved;
  })
}

const clearData = function () {
  const inputs = document.querySelectorAll('#save-me input, #save-me textarea');

  Array.prototype.slice.call(inputs).forEach(function (input) {

    const id = getId(input);
    if (!id) return;

    localStorage.removeItem(storagePrefix + id);
  })

}

const inputHandler = function (event) {
  if (!event.target.closest('#save-me')) return;

  const id = getId(event.target);

  if (!id) return;

  localStorage.setItem(storagePrefix + id, event.target.value);
};

const submitHandler = function (event) {
  event.preventDefault();

  if (event.target.id !== 'save-me') return;
  clearData();
}

loadData();

document.addEventListener('input', inputHandler, false);
document.addEventListener('submit', submitHandler, false);