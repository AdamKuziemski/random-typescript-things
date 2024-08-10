type Predicate = (...propositionalVariables: boolean[]) => boolean;

// tools
const parameterLength = (callbacks: Function[]): number => Math.max(...callbacks.map(cb => cb.length));
const hasIdenticalValues = (comparedValues: any[]): boolean => new Set(comparedValues).size === 1;

const generateTruthTable = (n: number): boolean[][] => Array.from(Array(2 ** n)).map(
  (_, i) => Array.from(Array(n)).map((_, j) => !!(i & (2 ** j)))
);

const printTruthTable = (predicates: Predicate[], propositionalVariables: boolean[], results: boolean[]) => {
  console.table(predicates.map((p, i) => {
    const predicateBody = p.toString();
    const varsStart = predicateBody.indexOf('(') + 1;
    const varsEnd = predicateBody.indexOf(')');
    const variables = predicateBody.slice(varsStart, varsEnd).split(',').map(v => v.trim());

    const row = variables.reduce((rowData, v, k) => {
      rowData[v] = propositionalVariables[k];
      return rowData;
    }, {} as { [key: string]: any });
    row.predicate = predicateBody;
    row.result = results[i];
    return row;
  }));
};

const forAllPredicates = (predicates: Predicate[], propositionalVariables: boolean[], printTable: boolean) => {
  const results = predicates.map(predicate => predicate(...propositionalVariables));

  if (printTable) {
    printTruthTable(predicates, propositionalVariables, results);
  }

  return results;
};

const isTheSameReasoning = (predicates: Predicate[], printTable: boolean = false): boolean => generateTruthTable(parameterLength(predicates))
  .every((row: boolean[]) => hasIdenticalValues(forAllPredicates(predicates, row, printTable)));

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

isTheSameReasoning([
  (p, q, r) => (!p || !q) ? false : !r,
  (p, q, r) => p && q && !r
]);
