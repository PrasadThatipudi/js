function horizontalLine(width, char) {
  return char.repeat(width);
}

function encloseWith(string, char) {
  return char + string + char;
}

function filledRectangle([width, height]) {
  const rectangle = [];
  const line = horizontalLine(width, "*");

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    rectangle.push(line);
  }

  return rectangle;
}

function getHollowRow(height, width, rowIndex) {
  if (rowIndex === 0 || rowIndex === height - 1) {
    return horizontalLine(width, "*");
  }

  return encloseWith(horizontalLine(width - 2, " "), "*");
}

function hollowRectangle([width, height]) {
  const rectangle = [];

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const line = getHollowRow(height, width, rowIndex);
    rectangle.push(line);
  }

  return rectangle;
}

function isEven(number) {
  return (number & 1) === 0;
}

function getAlternatingRectangle([width, height], characters) {
  const rectangle = [];

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const charIndex = rowIndex % characters.length;
    const line = horizontalLine(width, characters[charIndex]);
    rectangle.push(line);
  }

  return rectangle;
}

function alternatingRectangle(dimensions) {
  const characters = ["*", "-"]

  return getAlternatingRectangle(dimensions, characters);
}

function spacedAlternatingRectangle(dimensions) {
  const characters = ["*", "-", " "];

  return getAlternatingRectangle(dimensions, characters);
}

function triangle([height]) {
  const triangle = [];

  for (let width = 1; width <= height; width++) {
    const line = horizontalLine(width, "*");
    triangle.push(line);
  }

  return triangle;
}

function rightAlignedTriangle([height]) {
  const triangle = [];

  for (let width = 1; width <= height; width++) {
    const line = "*".repeat(width);
    triangle.push(line.padStart(height))
  }

  return triangle;
}

function generatePattern(style, dimensions) {
  const patterns = [
    ["filled-rectangle", filledRectangle],
    ["hollow-rectangle", hollowRectangle],
    ["alternating-rectangle", alternatingRectangle],
    ["triangle", triangle],
    ["right-aligned-triangle", rightAlignedTriangle],
    ["spaced-alternating-rectangle", spacedAlternatingRectangle]
  ];

  for (const pattern of patterns) {
    if (pattern[0] === style) {
      const shape = pattern[1](dimensions);
      return shape.join("\n");
    }
  }
}

// ------------------ Testing Fragment ---------------------

function testGeneratePattern(style, dimensions, expected, failed) {
  const actual = generatePattern(style, dimensions);
  if (actual !== expected) {
    failed.push([style, dimensions, actual, expected]);
  }
}

function testsForFilledRectangle() {
  const failed = [];
  testGeneratePattern("filled-rectangle", [1, 0], "", failed);
  testGeneratePattern("filled-rectangle", [0, 1], "", failed);
  testGeneratePattern("filled-rectangle", [0, 0], "", failed);
  testGeneratePattern("filled-rectangle", [1, 1], "*", failed);
  testGeneratePattern("filled-rectangle", [2, 1], "**", failed);
  testGeneratePattern("filled-rectangle", [2, 2], "**\n**", failed);
  testGeneratePattern("filled-rectangle", [3, 2], "***\n***", failed);
  testGeneratePattern("filled-rectangle", [4, 3], "****\n****\n****", failed);

  console.log("------------ Filled Rectangle ------------");
  console.table(failed);
}

function testsForHollowRectangle() {
  const failed = [];

  testGeneratePattern("hollow-rectangle", [0, 0], "", failed);
  testGeneratePattern("hollow-rectangle", [1, 0], "", failed);
  testGeneratePattern("hollow-rectangle", [0, 1], "", failed);
  testGeneratePattern("hollow-rectangle", [1, 1], "*", failed);
  testGeneratePattern("hollow-rectangle", [2, 1], "**", failed);
  testGeneratePattern("hollow-rectangle", [2, 2], "**\n**", failed);
  testGeneratePattern("hollow-rectangle", [2, 3], "**\n**\n**", failed);
  testGeneratePattern("hollow-rectangle", [4, 3], "****\n*  *\n****", failed);

  console.log("------------- Hollow Rectangle -----------");
  console.table(failed);
}

function testsForAlternatingRectangle() {
  const failed = [];

  testGeneratePattern("alternating-rectangle", [0, 0], "", failed);
  testGeneratePattern("alternating-rectangle", [1, 0], "", failed);
  testGeneratePattern("alternating-rectangle", [0, 1], "", failed);
  testGeneratePattern("alternating-rectangle", [1, 1], "*", failed);
  testGeneratePattern("alternating-rectangle", [1, 2], "*\n-", failed);
  testGeneratePattern("alternating-rectangle", [2, 3], "**\n--\n**", failed);

  console.log("------------- Alternating Rectangle -----------");
  console.table(failed);
}

function testsForTraingle() {
  const failed = [];

  testGeneratePattern("triangle", [0], "", failed);
  testGeneratePattern("triangle", [1], "*", failed);
  testGeneratePattern("triangle", [2], "*\n**", failed);
  testGeneratePattern("triangle", [3], "*\n**\n***", failed);

  console.log("------------- Traingle -----------");
  console.table(failed);
}

function testsForRightAlignedTraingle() {
  const failed = [];

  testGeneratePattern("right-aligned-triangle", [0], "", failed);
  testGeneratePattern("right-aligned-triangle", [1], "*", failed);
  testGeneratePattern("right-aligned-triangle", [2], " *\n**", failed);
  testGeneratePattern("right-aligned-triangle", [3], "  *\n **\n***", failed);

  console.log("------------- Right Aligned Traingle -----------");
  console.table(failed);
}

function testsForSpacedAlternatingRectangle() {
  const failed = [];

  testGeneratePattern("spaced-alternating-rectangle", [0, 0], "", failed);
  testGeneratePattern("spaced-alternating-rectangle", [0, 1], "", failed);
  testGeneratePattern("spaced-alternating-rectangle", [1, 0], "", failed);
  testGeneratePattern("spaced-alternating-rectangle", [1, 1], "*", failed);
  testGeneratePattern("spaced-alternating-rectangle", [3, 2], "***\n---",
    failed);
  testGeneratePattern("spaced-alternating-rectangle", [3, 3], "***\n---\n   ",
    failed);
  testGeneratePattern("spaced-alternating-rectangle", [3, 4],
    "***\n---\n   \n***", failed);

  console.log("------------- Spaced Alternating Rectangle -----------");
  console.table(failed);
}

function testAll() {
  testsForFilledRectangle();
  testsForHollowRectangle();
  testsForAlternatingRectangle();
  testsForTraingle();
  testsForRightAlignedTraingle();
  testsForSpacedAlternatingRectangle();
}

testAll();
