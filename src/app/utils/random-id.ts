export function randomId() {
  const max = 88888888;
  const min = 77777777;

  return Math.floor(Math.random() * (max - min + 1) + min);
}
