const process = require('process');

const VALUE = Math.random() * 1000;

const time = (whichFunction, timesToLoop = 1000) => {
  let total = 0n;

  const localStart = process.hrtime.bigint();

  for (let index = 0; index < timesToLoop; index += 1) {
    const start = process.hrtime.bigint();

    whichFunction();

    const time = process.hrtime.bigint() - start;
    total += time;
  }

  return {
    runTime: process.hrtime.bigint() - localStart,
    average: total / BigInt(timesToLoop)
  };
};

const getTimingsOf = (whichFunction, totalTimes = 25, eachTime = 1000) => {
  let total = 0n;
  const value = Math.random() * 10000;
  process.stdout.write(`\n${whichFunction.name} timings\n\n`);
  for (let index = 0; index <= totalTimes; index += 1) {
    const { runTime, average } = time(() => whichFunction(value), eachTime);

    total += average;

    const progress = ((index / totalTimes) * (process.stdout.columns / 2)) | 1;
    const remaining = process.stdout.columns / 2 - progress;
    const message = `#${index}: Total ${runTime}ns, (~ ${average}ns)`;

    // -- Erase two previous lines
    const erasure =
      '\r' + // to start of message line
      '\x1b[K' + // erase the message line
      '\x1b[A' + // cursor up to star line
      '\x1b[K'; // erase star line

    process.stdout.write(erasure);

    // -- Write new lines
    const stars = '*'.repeat(progress);
    const dashes = '-'.repeat(remaining);

    const details = `\x1b[32m${stars}\x1b[0m${dashes}\n`;

    process.stdout.write(`  ${details}`);
    process.stdout.write(`  ${message}`);
  }

  const finalAverage = total / BigInt(totalTimes);
  // process.stdout.write(`\n  Final average: ${finalAverage}ns\n`);

  return finalAverage;
};

const run = () => {
  const START = process.hrtime.bigint();
  const RUNS_PER_FUNCTION = 100;
  const RUNS_PER_RUN = 5000;

  const bitwise = value => value | 1;
  const modulus = value => value - (value % 1);
  const timings = {
    trunc: getTimingsOf(Math.trunc, RUNS_PER_FUNCTION, RUNS_PER_RUN),
    floor: getTimingsOf(Math.floor, RUNS_PER_FUNCTION, RUNS_PER_RUN),
    modulus: getTimingsOf(modulus, RUNS_PER_FUNCTION, RUNS_PER_RUN),
    bitwise: getTimingsOf(bitwise, RUNS_PER_FUNCTION, RUNS_PER_RUN)
  };

  console.log(`\nTotal time: ${process.hrtime.bigint() - START}ns`);
  console.log(timings);
};

run();
