# For Haziqah 🎂❤️

A birthday surprise + interactive date planner made just for Haziqah (August 20).

## How to open

1. Open `index.html` in a browser, **or**
2. Serve the folder locally:

```bash
# If you have Python
python -m http.server 5173

# Or with Node
npx --yes serve .
```

Then open the URL on your phone for the best experience.

## How you'll get her answers

When she taps **Lock It In**, her date, activity, place, vibe, and optional note are emailed to `firdausali1710@gmail.com`.

The first time this runs, FormSubmit will send you a confirmation email. Open it and click the activation link once. After that, every lock-in lands in your inbox.

The site still needs to be opened with internet (not only a fully offline file). Hosting on Netlify/GitHub Pages is the most reliable.

Landing → envelope → birthday letter + photos + music → one more question → date ask → planner → final reveal

## Customize

- **Photos** — drop `photo-1.jpg` through `photo-4.jpg` into `assets/photos/` and point `PHOTOS` in `js/app.js` at those files.
- **Song** — put your track at `assets/music/song.mp3`. It starts only after she taps Open Your Surprise.
- **Birthday letter** — edit the wish copy in `index.html`.
- **Closing letter** — edit `LETTER_LINES` in `js/app.js`.

## Share

Host the folder on [Netlify Drop](https://app.netlify.com/drop), GitHub Pages, or any static host, then send her the link.
