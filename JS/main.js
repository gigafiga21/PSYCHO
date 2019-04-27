function B3(seconds, audio, lasting, frame, state)
{
    var switchGame = (function()
    {
        frame.activate(active);
        setTimeout(rest, 10000);
    }).bind(this);

    var rest = (function()
    {
        puzzle.free();
        
        iterations++;
        if (iterations >= 6)
        {
            if (audio)
            {
                document.body.removeChild(track);
            }
            frame.free();
            new Score(frame.add(0, true), ariphmetics.getScore());
            new Score(frame.add(1, true), puzzle.getScore());
            state.continue();
            return;
        }

        frame.deactivate(active);
        active = active == 0 ? 2 : 0;
        frame.activate(1);
        breaker.toggle();
        breaker.setTime(seconds);
        
        if (audio)
        {
            track.play();
        }

        var currentSeconds = seconds,
            timer = setInterval((function()
            {
                currentSeconds--;
                if (currentSeconds <= 0)
                {
                    if (audio != null && !lasting)
                    {
                        track.play();
                    }
                    
                    clearInterval(timer);
                    breaker.toggle();
                    frame.deactivate(1);
                    switchGame();
                    return;
                }
                if (audio && lasting)
                {
                    track.pause();
                    track.currentTime = 0.0;
                    track.play();
                }
                breaker.setTime(currentSeconds);
            }).bind(this), 1000);
    }).bind(this);

    var ariphmetics = new Ariphmetics(frame.add(0)),
        breaker = new Breaker(frame.add(1)),
        puzzle = new Puzzle(frame.add(2)),
        active = 0,
        iterations = 0,
        track = null;

    if (audio)
    {
        track = document.body.newChildElement("audio", {"SRC": audio});
    }
    
    frame.activate(0);
    frame.deactivate(1);
    frame.deactivate(2);
    setTimeout(rest, 10000);
}

var tests =
    [
        {
            name: "1",
            run: function(frame, state)
                {
                    var ariphmetics = new Ariphmetics(frame.add(0, true));
                    setTimeout(
                        (function()
                        {
                            frame.free();
                            new Score(frame.add(0, true), ariphmetics.getScore());
                            state.continue();
                        }).bind(this), 30000);
                }
        },
        {
            name: "2",
            run: function(frame, state)
                {
                    var puzzle = new Puzzle(frame.add(0, true));
                    setTimeout(
                        (function()
                        {
                            frame.free();
                            new Score(frame.add(0, true), puzzle.getScore());
                            state.continue();
                        }).bind(this), 30000);
                }
        },
        {
            name: "3А",
            run: function(frame, state)
                {
                    var switchGame = (function()
                    {
                        iterations++;
                        if (iterations >= 6)
                        {
                            frame.free();
                            new Score(frame.add(0, true), ariphmetics.getScore());
                            new Score(frame.add(1, true), puzzle.getScore());
                            state.continue();
                            return;
                        }
                        
                        puzzle.free();
                        frame.deactivate(active);
                        frame.activate(!active);
                        active = !active;
                        setTimeout(switchGame, 10000);
                    }).bind(this);
                    
                    var ariphmetics = new Ariphmetics(frame.add(0)),
                        puzzle = new Puzzle(frame.add(1)),
                        active = 0,
                        iterations = 0;
                    
                    frame.activate(active);
                    frame.deactivate(!active);
                    setTimeout(switchGame, 10000);
                }
        },
        {
            name: "3Б",
            run: B3.bind(null, 3, null, false)
        },
        {
            name: "3B",
            run: B3.bind(null, 6, null, false)
        },
        {
            name: "3Г",
            run: B3.bind(null, 10, null, false)
        },
        {
            name: "4",
            run: function(frame, state)
                {
                    var concentration = new Concentration(frame.add(0, true), 15000);
                    
                    setTimeout(
                        (function()
                        {
                            concentration.free();
                            frame.free();
                            B3(3, null, false, frame, state);
                        }).bind(this), 15000);
                }
        },
        {
            name: "5А",
            run: B3.bind(null, 3, "WAV/siren.wav", true)
        },
        {
            name: "5Б",
            run: B3.bind(null, 3, null, false)
        },
        {
            name: "5В",
            run: function(frame, state)
                {
                    var time = 75,
                        track = document.body.newChildElement("audio", {eventListeners: {"loadeddata":
                            (function()
                            {
                                var timer = setInterval(
                                    function()
                                    {
                                        if (time <= 0)
                                        {
                                            clearInterval(timer);
                                            document.body.removeChild(track);
                                            return;
                                        }
                                        
                                        time--;
                                        track.pause(); 
                                        track.currentTime = 0.0;
                                        track.play();
                                    }, 1000);

                                B3(3, null, false, frame, state);
                            }).bind(this)}});
                    
                    track.setAttribute("SRC", "WAV/clap.wav");
                }
        },
        {
            name: "6",
            run: B3.bind(null, 3, null, false)
        }
    ];

var state = new State(document.body, tests);