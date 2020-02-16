export class MersenneTwister {
  private twists: number[] = [];
  private currentTwist: number = 0;

  constructor(public seed: number = performance.now()) {
    this.twists = [seed];
    
    for (let i = 1; i < 623; ++i) {
      const previous: number = this.twists[i - 1];
      this.twists.push(0x6c078965 * (previous ^ (previous >> 30) + i));
    }
  }

  extractNumber(): number {
    if (this.currentTwist === 0) {
      this.generateNumbers();
    }

    let generatedNumber = this.twists[this.currentTwist];
    generatedNumber ^= (generatedNumber >> 11);
    generatedNumber ^= ((generatedNumber << 7) & 0x9d2c5680);
    generatedNumber ^= ((generatedNumber << 15) & 0xefc60000);
    generatedNumber ^= (generatedNumber >> 18);

    this.currentTwist = (this.currentTwist + 1) % 624;
    
    return generatedNumber;
  }

  private generateNumbers(): void {
    for (let i = 0; i < 623; ++i) {
      const generatedNumber = (this.twists[i] & 0x80000000) + (this.twists[(i + 1) % 624] & 0x7FFFFFFF);
      this.twists[i] = this.twists[(i + 397) % 624] ^ (generatedNumber >> 1);

      if (generatedNumber % 2 === 1) {
        this.twists[i] ^= 0x9908b0df;
      }
    }
  }
}
