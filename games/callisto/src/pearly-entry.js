// Pearly Arcade integration, 2026-11-12. See the end of index.js.
window.pearlyStartGame=()=>{setLevel(1);initGame();gameState=GameState.PLAYING;gameTime=0;setMenu(null);resetKeys();zzfxX.resume();if(!localStorage['music-off'])playMusic(milkyWaySong,true)};
