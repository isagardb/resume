# Sagar D B — Resume Website

A responsive resume website built with HTML, CSS, and JavaScript. It embeds the current PDF and provides options to view, open, and download it.

## Required file

Keep this PDF in the repository root:

```text
Sagar_D_B_5_5YOE_Resume.pdf
```

## Publish at the root GitHub Pages URL

The repository must be named exactly:

```text
isagardb.github.io
```

Then open **Settings → Pages** and select **GitHub Actions** as the publishing source. After the workflow completes, the site will be available at:

```text
https://isagardb.github.io/
```

No custom domain is required.

## Update the resume later

Replace `Sagar_D_B_5_5YOE_Resume.pdf` with the updated PDF using the same filename, then commit and push. The site will deploy automatically and display the latest file without requiring HTML changes.

## Local preview

Run from the project directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.
