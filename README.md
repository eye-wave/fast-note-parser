# Note parser

Quick note parser made with "low level javascript" for performance

## Benchmarks

this test was run 1_000_000 times on node 19.8.1 for each test input
those are the results for:
 - my parser
 - note-parser
 - @tonaljs/midi

```
my-parser: [MIN] 6.03 ms
my-parser: [MAX] 25.08 ms
my-parser: [AVG] 16.87 ms

note-parser: [MIN] 57.01 ms
note-parser: [MAX] 394.54 ms
note-parser: [AVG] 332.88 ms

tonal-midi: [MIN] 141.97 ms
tonal-midi: [MAX] 158.73 ms
tonal-midi: [AVG] 148.98 ms
```
