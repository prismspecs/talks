window.SLIDES = [
  { "kind": "cover", "title": "Creative Coding with p5.js",
    "subtitle": "Grayson Earle · Brussels 2026" },

  // ---- Why don't the cops fight each other? ----
  { "kind": "image", "src": "media/cops-screenshot.jpg",
    "caption": "Why don't the cops fight each other? (2022): an attempt to modify the relationships between police officers in Grand Theft Auto V." },
  { "kind": "image", "src": "media/cops-coding.jpg",
    "caption": "The programming environment for creating \"mods\" for the game." },
  { "kind": "video", "src": "https://player.vimeo.com/video/871904228",
    "caption": "Why don't the cops fight each other? (2022)" },
  { "kind": "image", "src": "media/cops-kw.jpg",
    "caption": "Installation view at KW Institute for Contemporary Art, Berlin." },

  // ---- Bail Bloc ----
  { "kind": "image", "src": "media/bailbloc-tray.png",
    "caption": "Bail Bloc (2017–2021) mined cryptocurrency in the background of everyday computer use. 100% of funds posted bail." },
  { "kind": "image", "src": "media/bailbloc-stats.png",
    "caption": "In the first month, Bail Bloc ran on ~4,000 computers and raised over $3,300." },

  // ---- Return to Sender (Braunschweig) ----
  { "kind": "image", "src": "media/rts-wide_shot_both.jpg",
    "caption": "Return to Sender vol. 2 (Braunschweig, Germany), 2026: a phone bought from Amazon, loaded with custom software, and returned." },
  { "kind": "image", "src": "media/rts-box_recording_equipment.jpg",
    "caption": "Inside the box: the phone records GPS, audio and motion as the package moves through Amazon's returns process." },
  { "kind": "image", "src": "media/rts-box_hand_bg.jpg",
    "caption": "The box sways and rotates on its armature, replaying the journey, while recorded transit audio plays from within." },
  { "kind": "video", "src": "https://www.youtube-nocookie.com/embed/jO8i0-ewvLY?rel=0",
    "caption": "Return to Sender vol. 2 (Braunschweig, Germany), 2026: video documentation." },

  // ---- Workshop ----
  { "kind": "section", "title": "Let's write some code" },
  { "kind": "image", "src": "media/languages.png",
    "caption": "Programming languages have families. Most of them descend from C." },
  { "kind": "code", "title": "Same idea, different languages",
    "blocks": [
      { "filename": "hello.c", "lang": "c", "code": "#include <stdio.h>\n\nint main() {\n  printf(\"hello\\n\");\n  return 0;\n}" },
      { "filename": "hello.py", "code": "print(\"hello\")" },
      { "filename": "hello.js", "lang": "js", "code": "console.log(\"hello\");" }
    ],
    "caption": "p5.js is JavaScript." },
  { "kind": "side", "src": ["media/ide-vscode.png", "media/ide-vim.png", "media/ide-pi.png"],
    "labels": ["VS Code", "vim", "pi"],
    "caption": "Where people write code: an editor, a terminal, an AI harness." },
  { "kind": "section", "title": "Writing code ≠ running code",
    "sub": "Usually you write in one place and run in another. The p5.js editor does both in the same window." },
  { "kind": "links", "title": "Open this and follow along",
    "items": [ { "label": "editor.p5js.org", "url": "https://editor.p5js.org" } ] },
  { "kind": "code", "title": "setup() and draw()", "filename": "sketch.js", "lang": "js",
    "code": "function setup() {\n  // runs once\n  createCanvas(windowWidth, windowHeight);\n}\n\nfunction draw() {\n  // runs every frame, forever\n  background(220);\n  rect(100, 200, 50, 50);\n}",
    "caption": "Then try rect(mouseX, mouseY, 50, 50);" },
  { "kind": "code", "title": "Variables", "filename": "sketch.js", "lang": "js",
    "code": "var x = 100;\nvar speed = 4;\n\nfunction draw() {\n  background(220);\n  rect(x, 200, 50, 50);\n  x += speed;\n}",
    "caption": "A variable is a name for a value that can change." },
  { "kind": "code", "title": "if statements", "filename": "sketch.js", "lang": "js",
    "code": "if (x > width) {\n  x = 0;\n}",
    "caption": "Only run this code when something is true." },
  { "kind": "code", "title": "Functions", "filename": "sketch.js", "lang": "js",
    "code": "function randomStart() {\n  xSpeed = random(-5, 5);\n  ySpeed = random(-5, 5);\n  x = random(0, width);\n  y = random(0, height);\n}",
    "caption": "When you repeat yourself, give the code a name." },
  { "kind": "video", "src": "sketch/index.html",
    "caption": "All together." }
];
