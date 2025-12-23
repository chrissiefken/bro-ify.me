//js
const elements = document.querySelectorAll('p, strong, h1, h2, h3');

const variants = [
  s => `Bro, ${s}`,
  s => `${s}, bro`,
  s => s
];

elements.forEach(el => {
  const text = (el.textContent || '').trim();
  if (!text) return;
  // skip if it already contains the word "bro" (case-insensitive)
  if (/\bbro\b/i.test(text)) return;
  const choice = Math.floor(Math.random() * variants.length);
  el.textContent = variants[choice](text);
});
