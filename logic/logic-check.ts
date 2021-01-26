type Predicate = (...propositionalVariables: boolean[]) => boolean;

// tools
const parameterLength = (callbacks: Function[]): number => Math.max(...callbacks.map(cb => cb.length));
const hasIdenticalValues = (comparedValues: any[]): boolean => new Set(comparedValues).size === 1;

const generateTruthTable = (n: number): boolean[][] => Array.from(Array(2 ** n)).map(
  (_, i) => Array.from(Array(n)).map((_, j) => !!(i & (2 ** j)))
);

const forAllPredicates = (predicates: Predicate[], propositionalVariables: boolean[]) => predicates.map(
  predicate => predicate(...propositionalVariables)
);

const isTheSameReasoning = (predicates: Predicate[]): boolean => generateTruthTable(parameterLength(predicates))
  .every((row: boolean[]) => hasIdenticalValues(forAllPredicates(predicates, row)));

// De Morgan's laws
isTheSameReasoning([
  (p, q) => !(p || q),
  (p, q) => !p && !q
]);

isTheSameReasoning([
  (p, q) => !(p && q),
  (p, q) => !p || !q
]);

// real life examples
isTheSameReasoning([
  (p, q, r) => (p && !q) || (!p && !r),
  (p, q, r) => p ? !q : !r
]);

isTheSameReasoning([
  (p, q, r) => p && q ? r : true,
  (p, q, r) => !(p && q) || r,
  (p, q, r) => !p || !q || r // use De Morgan's law on the one above
]);
