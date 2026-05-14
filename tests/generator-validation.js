const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appPath = path.join(__dirname, "..", "app.js");
const code = fs.readFileSync(appPath, "utf8");

const context = vm.createContext({
  console,
  Math,
  Date,
  JSON,
  Number,
  String,
  Array,
  Object,
  Set,
  Map,
  localStorage: { getItem: () => "{}", setItem: () => {} },
  document: {
    body: { classList: { toggle: () => {} } },
    addEventListener: () => {},
    cookie: "",
    querySelectorAll: () => [],
    getElementById: () => null
  },
  window: {
    addEventListener: () => {},
    location: { pathname: "/", origin: "http://localhost" }
  }
});

vm.runInContext(code, context, { filename: appPath });

function generate(expr) {
  return vm.runInContext(expr, context);
}

const adaptive = generate('generateTest({ count: 32, seed: "validation-seed" })');
assert.strictEqual(adaptive.length, 32, "expected requested question count");

const requiredChapters = ["Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"];
for (const chapter of requiredChapters) {
  assert(adaptive.some(q => q.chapter === chapter), `missing ${chapter}`);
}

for (const q of adaptive) {
  assert(q.id && q.prompt && q.choices?.length >= 4, "question shell is incomplete");
  assert(Number.isInteger(q.answer), `answer index missing for ${q.id}`);
  assert(q.answer >= 0 && q.answer < q.choices.length, `answer index out of range for ${q.id}`);
  assert(q.difficulty && q.topic && q.chapter && q.question_type, `metadata missing for ${q.id}`);
  assert(q.estimated_time && q.learning_objective && q.formula_used, `assessment metadata missing for ${q.id}`);
  assert(q.step_by_step_solution && q.common_mistakes?.length, `explanation metadata missing for ${q.id}`);
}

const repeat = generate('generateTest({ count: 12, seed: "same-seed" }).map(q => q.prompt)');
const repeatAgain = generate('generateTest({ count: 12, seed: "same-seed" }).map(q => q.prompt)');
assert.deepStrictEqual(repeat, repeatAgain, "seeded generation should be reproducible");

generate('state.generatedDifficulty = "Expert"');
const expertSet = generate('generateTest({ count: 10, seed: "expert-seed" })');
assert(expertSet.every(q => q.difficulty === "Expert"), "forced expert difficulty should be respected");

console.log(`Validated ${adaptive.length} generated questions across ${requiredChapters.length} chapters.`);
