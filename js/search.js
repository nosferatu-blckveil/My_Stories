// Stories database
const stories = [
    { title: 'The Purgatory', path: 'stories/The_Purgatory/index.html', cover: 'stories/The_Purgatory/assets/gallery/cover.jpg', description: 'A story about the purgatory.' },
    { title: 'Golden Era', path: 'stories/Golden_Era/index.html', cover: 'stories/Golden_Era/assets/gallery/cover.jpg', description: 'A story about the golden era.' },
    { title: 'Hollow', path: 'stories/Hollow/index.html', cover: 'stories/Hollow/assets/gallery/cover.jpg', description: 'A story about teens.' },
    { title: 'The Blessed Ones', path: 'stories/The_Blessed_Ones/index.html', cover: 'stories/The_Blessed_Ones/assets/gallery/cover.jpg', description: 'A story about the blessed ones.' },
    { title: 'Supernatural', path: 'stories/Supernatural/index.html', cover: 'stories/Supernatural/assets/gallery/cover.jpg', description: 'A story about the supernatural.' },
    { title: 'Skater Boys', path: 'stories/Skater_Boys/index.html', cover: 'stories/Skater_Boys/assets/gallery/cover.jpg', description: 'A story about skater boys.' },
    { title: 'Streamers', path: 'stories/Streamers/index.html', cover: 'stories/Streamers/assets/gallery/cover.jpg', description: 'A story about streamers.' },
    { title: 'Eve', path: 'stories/Eve/index.html', cover: 'stories/Eve/assets/gallery/cover.jpeg', description: 'The story of the murder of Eve Miller.' },
    { title: 'Survivors', path: 'stories/Survivors/index.html', cover: 'stories/Survivors/assets/gallery/cover.jpg', description: 'A story about survivors.' },
    { title: 'Sins of the West', path: 'stories/Sins_of_the_West/index.html', cover: 'stories/Sins_of_the_West/assets/gallery/cover.jpg', description: 'A story about the sins of the west.' },
    { title: 'ASTER', path: 'stories/ASTER/index.html', cover: 'stories/ASTER/assets/gallery/cover.jpg', description: 'A story about ASTER.' },
    { title: 'Big Brother', path: 'stories/Big_Brother/index.html', cover: 'stories/Big_Brother/assets/gallery/cover.jpg', description: 'A story about Big Brother.' },
    { title: 'Bound', path: 'stories/Bound/index.html', cover: 'stories/Bound/assets/gallery/cover.jpg', description: 'A story about Bound.' },
    { title: 'Herdeiros', path: 'stories/Herdeiros/index.html', cover: 'stories/Herdeiros/assets/gallery/cover.jpg', description: 'A story about Herdeiros.' },
    { title: 'NightTale', path: 'stories/NightTale/index.html', cover: 'stories/NightTale/assets/gallery/cover.jpg', description: 'A story about NightTale.' },
    { title: 'Reapers', path: 'stories/Reapers/index.html', cover: 'stories/Reapers/assets/gallery/cover.jpg', description: 'A story about Reapers.' },
    { title: 'Reset', path: 'stories/Reset/index.html', cover: 'stories/Reset/assets/gallery/cover.jpg', description: 'A story about Reset.' },
    { title: 'Starfall', path: 'stories/Starfall/index.html', cover: 'stories/Starfall/assets/gallery/cover.jpg', description: 'A story about Starfall.' },
    { title: 'St. Aurora', path: 'stories/St. Aurora/index.html', cover: 'stories/St. Aurora/assets/gallery/cover.jpg', description: 'A story about the hospital St. Aurora.' },
    { title: 'Top 10', path: 'stories/Top_10/index.html', cover: 'stories/Top_10/assets/gallery/cover.jpg', description: 'A story about Top 10.' },
    { title: 'Viper Rose', path: 'stories/Viper%20Rose/index.html', cover: 'stories/Viper%20Rose/assets/gallery/cover.jpg', description: 'A story about Viper Rose.' },
    { title: 'True Originals', path: 'stories/True Originals/index.html', cover: 'stories/True Originals/assets/gallery/cover.jpg', description: 'A story about True Originals.' }
];

// Render cards
function renderStories(storiesToRender) {
    const grid = document.getElementById('storiesGrid');
    const resultCount = document.getElementById('resultCount');

    grid.innerHTML = '';

    if (storiesToRender.length === 0) {
        resultCount.textContent = 'No stories found.';
        return;
    }

    resultCount.textContent = `Showing ${storiesToRender.length} of ${stories.length} stories`;

    storiesToRender.forEach(story => {
        const card = document.createElement('a');
        card.href = story.path;
        card.className = 'card';
        card.innerHTML = `
      <img src="${story.cover}" alt="${story.title}" loading="lazy" />
      <div class="card-content">
        <h2>${story.title}</h2>
        <p>${story.description}</p>
      </div>
    `;
        grid.appendChild(card);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            renderStories(stories);
        } else {
            const filtered = stories.filter(story =>
                story.title.toLowerCase().includes(query) ||
                story.description.toLowerCase().includes(query)
            );
            renderStories(filtered);
        }
    });

    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            renderStories(stories);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderStories(stories);
    setupSearch();
});
