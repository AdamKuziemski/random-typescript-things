class LookAndRegexNumbers {
    constructor(public startWith: string) { }

    public nthString(n: number): string {
        let result = this.startWith;
        while (n--) {
            result = this.countDigits(result);
        }
        return result;
    }

    private countDigits(sequence: string) {
        return sequence.replace(/(.)\1*/g, (seq, match) => seq.length.toString() + match);
    }
}