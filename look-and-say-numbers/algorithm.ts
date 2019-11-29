class LookAndSayNumbers {
  constructor(public startWith: string) { }

  public nthString(n: number): string {
    let result = this.startWith;
    while (n--) {
      result = this.buildCountString(this.countDigits(result));
    }
    return result;
  }

  private countDigits(series: string): DigitCount[] {
    let results: DigitCount[] = [];
    let currentDigitIndex = 0;
    let i = 0;

    while (i < series.length) {
      const currentDigit = series.charAt(currentDigitIndex);

      while (series.charAt(i++) === currentDigit) {}

      results.push(new DigitCount(currentDigit, --i - currentDigitIndex));
      currentDigitIndex = i;
    }

    return results;
  }

  private buildCountString(counts: DigitCount[]): string {
    let result = '';
    for (let digit of counts) {
      result += digit.summarize;
    }
    return result;
  }
}

class DigitCount {
  constructor(public digit: string, public count: number) { }

  public get summarize(): string { return this.count + this.digit; }
}

const las = new LookAndSayNumbers('0');
las.nthString(50);