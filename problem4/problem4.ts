/**
 * Problem 1 - TypeScript
 * Input: n - any integer
 * Output: return - summation to n, sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.
 */

// Time complexity: O(n)
const sum_to_n_a = (n: number): number => {
    let result = 0;
    for (let i = 0; i <= n; i++) result += i;
    return result;
};

// Time complexity: O(n)
const sum_to_n_b = (n: number): number => {
    if (n === 0) return n;
    return n + sum_to_n_b(n - 1);
};

// Time complexity: O(1)
const sum_to_n_c = (n: number): number => {
    return (n * (n + 1)) / 2;
};

export {};