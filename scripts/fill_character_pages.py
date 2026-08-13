from pathlib import Path

root = Path(r"C:\Users\mvk09\My_Stories\stories")
updated = 0

for file in sorted(root.rglob("assets/characters/*/index.html")):
    text = ""
    try:
        text = file.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        continue

    story_name = file.parents[2].name
    character_name = file.parent.name
    title = character_name.replace("_", " ")

    needs_update = (
        file.stat().st_size == 0
        or "character-gallery" not in text
        or "gallery-modal.js" not in text
        or "<h1>" not in text
    )

    if not needs_update:
        continue

    gallery_dir = file.parent / "gallery"
    gallery_files = []
    profile_file = "gallery/profilePicture.png"

    if gallery_dir.exists():
        items = sorted(gallery_dir.iterdir(), key=lambda p: p.name.lower())
        images = [
            p.name for p in items
            if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
        ]
        profile_candidates = [
            name for name in images if "profile" in name.lower()
        ]
        if profile_candidates:
            profile_file = "gallery/" + profile_candidates[0]
        gallery_files = [
            name for name in images if "profile" not in name.lower()
        ]
        if not gallery_files:
            gallery_files = ["1.png"]

    if not gallery_files:
        gallery_files = ["1.png"]

    gallery_html = "\n".join(
        f'      <img src="gallery/{img}" alt="{title}" />' for img in gallery_files[:18]
    )

    html = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../../../../../css/style.css" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>

    <section class="character-profile">
      <img src="{profile_file}" alt="{title}" class="character-image" />

      <div class="character-info">
        <h2>{title}</h2>
        <p class="character-description">
          A compelling character from {story_name}, introduced with a strong presence,
          memorable style, and a clear role in the story's world.
        </p>
      </div>
    </section>

    <section class="character-details">
      <ul>
        <li><strong>Role:</strong> Character</li>
        <li><strong>Hobbies:</strong> Story, style, presence</li>
        <li><strong>Friends:</strong> The cast of {story_name}</li>
        <li><strong>Notes:</strong> A key figure in the narrative.</li>
      </ul>
    </section>

    <section class="character-gallery">
{gallery_html}
    </section>

    <a href="../../../index.html" class="nav-back"> ← Back to {story_name} </a>
    <script src="../../../../../js/gallery-modal.js" defer></script>
  </body>
</html>
'''

    file.write_text(html, encoding="utf-8")
    updated += 1

print(f"Updated {updated} character pages.")
