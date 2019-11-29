const longestSubsequence = (s1: string, s2: string) => {
  if (s1 === '' || s2 === '') {
    return '';
  }

  const allSubs = generateAllCommonSubsequences(s1, s2);
  if (allSubs === []) {
    return '';
  }

  const longestIndex = allSubs.reduce((longest, current, index) => current.length > allSubs[longest] ? index : longest, 0);
  return allSubs[longestIndex];
}

const generateAllCommonSubsequences = (s1: string, s2: string) => {
  const subs = [];
  Array.from(s1).forEach((___, index) => {
    const generatedSub = commonSubsequence(s1.substr(index), s2);
    if (generatedSub !== '') {
      subs.push(generatedSub);
    }
  });
  return subs;
}

const commonSubsequence = (s1: string, s2: string) => {
  return Array.from(s1).map((char, index) => s2.indexOf(char, index) !== -1 ? char : '').join('');
}

console.log(longestSubsequence('abazdc', 'bacbad'));
console.log(longestSubsequence('aggtab', 'gxtxayb'));
console.log(longestSubsequence('aaaa', 'aa'));
console.log(longestSubsequence('zuo', ''));
console.log(longestSubsequence('abba', 'abcaba'));
console.log(longestSubsequence('abababab', 'bbbbcccc'));
