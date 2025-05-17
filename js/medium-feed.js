// medium-feed.js

// Your Medium RSS feed URL
const originalMediumRssUrl = 'https://medium.com/feed/@imehboob';
const freeAPIKey = 'iewurc2zcxtfh3iv9umidcmuhzd1fqxihfr6hbud'
// rss2json.com API endpoint
// We pass the original RSS feed URL as a parameter to this service
const rssToJsonApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(originalMediumRssUrl)}&api_key=${freeAPIKey}`;

const postsContainer = document.getElementById('medium-posts-container');
const numberOfPostsToShow = 3; // How many recent posts you want to display

async function fetchAndDisplayMediumPosts() {
    if (!postsContainer) {
        console.error("Medium posts container not found!");
        return;
    }

    postsContainer.innerHTML = 'Loading Medium posts...'; // Show loading message

    try {
        // Fetch data from the rss2json.com API
        const response = await fetch(rssToJsonApiUrl);

        if (!response.ok) {
            // Handle HTTP errors from the proxy service
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Check if the proxy returned a successful status and has items
        if (data.status !== 'ok' || !data.items || data.items.length === 0) {
            postsContainer.innerHTML = '<p>Could not load Medium posts or no posts found.</p>';
            console.error("Error from rss2json.com or no items:", data);
            return;
        }

        // Clear the loading message
        postsContainer.innerHTML = '';

        // Loop through the JSON items and create HTML for each post
        // rss2json provides properties like 'title', 'link', 'pubDate', 'description'
        for (let i = 0; i < Math.min(data.items.length, numberOfPostsToShow); i++) {
            const item = data.items[i];

            // Extract data from the JSON item
            const title = item.title || 'No title'; // Use || '' for fallback
            const link = item.link || '#';
            // rss2json often provides ISO 8601 date, Date constructor handles it
            const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'No date';
            // Note: item.description often contains HTML. You might need sanitation
            // or extract plain text carefully if you display it. We'll stick to title/date/link for simplicity.

            // Create HTML elements for the post
            const postElement = document.createElement('div');
            postElement.classList.add('medium-post-item'); // Add class for styling

            postElement.innerHTML = `
                <h3><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h3>
                <p>${pubDate}</p>
                 <div class="post-link">
                     <a href="${link}" target="_blank" rel="noopener noreferrer">Read Post</a>
                </div>
            `;

            // Append the created post element to the container
            postsContainer.appendChild(postElement);
        }

    } catch (error) {
        console.error("Error fetching or processing Medium posts:", error);
        postsContainer.innerHTML = '<p>Failed to load Medium posts.</p>'; // Show error message
    }
}

// Call the function to fetch and display posts when the script loads
fetchAndDisplayMediumPosts();