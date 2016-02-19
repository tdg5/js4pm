let bootConfig = {
  reveal: {
    controls: false,
    height: 720,
    history: true,
    keyboard: {
      //27: function() { console.log("ESC pressed"); return true },
      //37: function() { console.log("LEFT pressed"); return true },
      //38: function() { console.log("UP pressed"); return true },
      //39: function() { console.log("RIGHT pressed"); return true },
      //40: function() { console.log("DOWN pressed"); return true },
      //66: function() { console.log("b pressed"); return true },
      // disable overview
      27: function() { return false; },
      79: function() { return false; }
      //116: function() { console.log("F5 pressed"); return true }
    },
    transition: "convex",
    width: 1280
  },
};

export default bootConfig;
