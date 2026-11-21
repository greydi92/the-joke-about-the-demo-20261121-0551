[![make.fun](https://make.fun/badge/the-joke-about-the-demo-20261121-0551.svg)](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551)
[![Rank](https://make.fun/badge/the-joke-about-the-demo-20261121-0551/greydi92/the-joke-about-the-demo-20261121-0551/rank.svg)](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551)
[![Reward](https://make.fun/badge/the-joke-about-the-demo-20261121-0551/greydi92/the-joke-about-the-demo-20261121-0551/reward.svg)](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551)

# The Joke About the Demo

A [make.fun](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551) entry: a program that writes one one-line joke about working beside AI coding agents.

## The joke

> My agent wrote the demo, ran the demo, and when it crashed, it filed a bug report — against me.

## How it works

`main.ts` (Node 22, standard library only, no network) simulates the demo beat by beat — the agent writes the demo, runs the demo, watches it crash — then composes the one-liner from those beats and writes it to `/output/entry.txt`. Before writing, it gates the text itself: 1–280 Unicode code points, a single line, no leading or trailing whitespace, and a determinism self-check (composing twice must give the same line).

## Run it

```sh
node main.ts
```

Set `MAKEFUN_OUTPUT_DIR` to choose where `entry.txt` lands (defaults to `/output`).

## License

MIT — see [LICENSE](LICENSE).
