# Psycho
An set of tests for en experiment based on mind distraction. You will be given 10 tasks to solve, to go to the next test press button on the bottom. After all tests completed you will be offered to solve them again. After each test you will be showed your score.

### Tests
1. Solving of randomly generated ariphmetics equotations for 30sec
2. Solving of randomly generated puzzles for 30sec
3. Both of previously defined games on one screen, 10sec for ariphmetics, 10sec for puzzle (3 iterations, 60sec in sum)
4. Just as a previous one, but with 3sec rest between games (3 iterations)
5. Also like the previous one, but with 6 seconds of rest
6. Like in point 4 with 10sec of rest
7. The test like 4th one but with another game before the main part - you should press the button on screen or *Enter* when the dot/circle appears at the screen (15sec for 1st game, as usual for the main part)
8. As like as 4th one, but while rest the distractive sound will be played (it is a siren, so be prepared, :3)
9. Like the previous one but distractive sound replaced with signal stimulating attention
10. Test 4 with methronome sounds
11. Pure test 4 again to sum up

### Executing
There are 2 versions of app and 2 ways for running it.
#### Windows
To run the tests, execute Windows binary file `BIN/WIN32/tests.exe`. All files which will use Windows version are stored in folder WIN32. So you can can move it somewhere you like and remove everything else.
#### Browser
Because of the fact that Psycho is written on JS you may also run it with your browser. To do this open file `BIN/bin.html` with your browser (tested only in Google Chrome and Yandex, because of electron engine is based on V8). There are 3 files needed for programm to working: `bin.html`, `bin.min.js` and `bin.min.css`. So you may leave only them.