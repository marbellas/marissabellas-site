# Site images

## marissa.jpg — the headshot

Drop a file named exactly `marissa.jpg` in this directory and it appears
automatically in two places: the About page rail, and the byline at the
foot of every article.

Both places check for the file at build time. While it is absent, About
simply starts its rail at the credential list and the byline shows an
"MB" monogram — nothing renders as a broken image.

Recommended: square, at least 480×480, JPEG. It is displayed at 176px on
About and 56px in bylines, so 480px covers retina in both.
