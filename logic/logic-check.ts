type Predicate = (...propositionalVariables: boolean[]) => boolean;

// tools
const parameterLength = (callbacks: Function[]): number => Math.max(...callbacks.map(cb => cb.length));
const hasIdenticalValues = (comparedValues: any[]): boolean => new Set(comparedValues).size === 1;

const generateTruthTable = (n: number): boolean[][] => Array.from(Array(2 ** n)).map(
    (_, i) => Array.from(Array(n)).map((_, j) => !!(i & (2 ** j)))
);
const isTheSameReasoning = (predicates: Predicate[]): boolean => generateTruthTable(parameterLength(predicates))
    .every((propositionalVariables: boolean[]) => hasIdenticalValues(predicates.map(predicate => predicate(...propositionalVariables))))

isTheSameReasoning([
    (p, q, r) => (p && !q) || (!p && !r),
    (p, q, r) => p ? !q : !r
]);