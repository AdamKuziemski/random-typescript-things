const longestSubsequence = (s1: string, s2: string): string => 
  generateAllCommonSubsequences(s1, s2).sort((a, b) => b.length - a.length)[0] || '';

const generateAllCommonSubsequences = (s1: string, s2: string): string[] =>
  Array.from(s1).map((_, index) => commonSubsequence(s1.substr(index), s2)).filter(sub => sub !== '');

const commonSubsequence = (s1: string, s2: string): string =>
  Array.from(s1).map((char, index) => s2.indexOf(char, index) !== -1 ? char : '').join('');

console.log(longestSubsequence('abazdc', 'bacbad')); // abad
console.log(longestSubsequence('aggtab', 'gxtxayb')); // gtab
console.log(longestSubsequence('aaaa', 'aa')); // aa
console.log(longestSubsequence('zuo', '')); // ''
console.log(longestSubsequence('abba', 'abcaba')); // abba
console.log(longestSubsequence('abababab', 'bbbbcccc')); // bb