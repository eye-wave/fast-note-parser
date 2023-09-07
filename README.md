# Note parser

Quick note parser made with "low level javascript" for performance

## Benchmarks

this test was run 1_000_000 times on node 19.8.1 for each test input
those are the results for:
 - my parser
 - note-parser
 - @tonaljs/midi

```
my-parser: [MIN] 5.63 ms
my-parser: [MAX] 25.37 ms
my-parser: [AVG] 15.82 ms

note-parser: [MIN] 55.59 ms
note-parser: [MAX] 421.14 ms
note-parser: [AVG] 310.76 ms

tonal-midi: [MIN] 140.65 ms
tonal-midi: [MAX] 176.28 ms
tonal-midi: [AVG] 150.44 ms
```
