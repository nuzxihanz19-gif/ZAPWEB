# ZIYAD STUDIO

## Bio Page Configuration

The `bio` directory contains a Linktree-style profile page. You can access it at `/bio/index.html`.

### How to Edit Links

1.  Open `bio/index.html`.
2.  Search for the `href="#"` attributes inside the `<a>` tags.
3.  Replace the `#` with your actual URL.

**Example:**
Change:
```html
<a href="#" class="...">
```
To:
```html
<a href="https://your-blog-url.com" class="...">
```

### How to Edit Images

1.  Open `bio/index.html`.
2.  Locate the profile image tag:
    ```html
    <img src="https://via.placeholder.com/150" alt="Profile Picture" ...>
    ```
3.  Replace `https://via.placeholder.com/150` with the path to your image (e.g., `../public/profile.jpg` or a direct URL).

### Customization

The page uses [Tailwind CSS](https://tailwindcss.com/) for styling. You can modify the colors in the `tailwind.config` script block inside `bio/index.html`.
