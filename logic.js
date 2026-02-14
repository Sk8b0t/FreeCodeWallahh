/**
 * FreeCourseFinder - Final Production Logic
 * Includes Python, C, C++, Java, JS, Rust, PHP, Perl, Go, Swift, and AI.
 */

const courseDatabase = [
    // --- PYTHON ---
    { type: 'yt', title: "Python Tutorials for Beginners", platform: "CodeWithHarry", visits: 25000000, url: "https://www.youtube.com/watch?v=aqvDTCpNRek&list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME", tags: ["python", "hindi"] },
    { type: 'web', title: "Scientific Computing with Python", platform: "freeCodeCamp", visits: 18000000, url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", tags: ["python", "data science"] },
    { type: 'web', title: "CS50's Intro to Programming with Python", platform: "Harvard University", visits: 15000000, url: "https://pll.harvard.edu/course/cs50s-introduction-programming-python", tags: ["python", "basics"] },

    // --- C & C++ ---
    { type: 'yt', title: "C Language Tutorials In Hindi", platform: "CodeWithHarry", visits: 12000000, url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR", tags: ["c", "hindi"] },
    { type: 'yt', title: "C Programming Full Course", platform: "freeCodeCamp", visits: 25000000, url: "https://www.youtube.com/watch?v=KJgsSFOSQv0", tags: ["c"] },
    { type: 'web', title: "CS50's Introduction to Computer Science", platform: "Harvard University", visits: 30000000, url: "https://pll.harvard.edu/course/cs50-introduction-computer-science", tags: ["c", "python", "algorithms", "basics"] },
    { type: 'yt', title: "C++ Tutorials for Beginners", platform: "CodeWithHarry", visits: 11000000, url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL", tags: ["c++", "cpp", "hindi"] },

    // --- JAVA & JAVASCRIPT ---
    { type: 'yt', title: "Java Tutorials for Beginners", platform: "CodeWithHarry", visits: 15000000, url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agS67Uits0UnJyrYiXhDS6q", tags: ["java", "hindi"] },
    { type: 'yt', title: "JavaScript Tutorials for Beginners", platform: "CodeWithHarry", visits: 14000000, url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL", tags: ["javascript", "js", "hindi"] },
    { type: 'web', title: "JS Algorithms & Data Structures", platform: "freeCodeCamp", visits: 22000000, url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", tags: ["javascript", "js", "dsa"] },

    // --- RUST, GO & PERL ---
    { type: 'web', title: "The Rust Programming Language (The Book)", platform: "Rust Foundation", visits: 5000000, url: "https://doc.rust-lang.org/book/", tags: ["rust", "systems"] },
    { type: 'yt', title: "Rust Course for Beginners", platform: "freeCodeCamp", visits: 8000000, url: "https://www.youtube.com/watch?v=BpPEoZW5IiY", tags: ["rust"] },
    { type: 'web', title: "A Tour of Go", platform: "Google/Go.dev", visits: 4000000, url: "https://go.dev/tour/", tags: ["go", "golang"] },
    { type: 'yt', title: "Perl Programming Tutorial", platform: "Derek Banas", visits: 2100000, url: "https://www.youtube.com/watch?v=fXvI9STXl6E", tags: ["perl"] },

    // --- PHP & SWIFT ---
    { type: 'yt', title: "PHP Tutorials in Hindi", platform: "CodeWithHarry", visits: 5000000, url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aikXkRE0WxDt1vozo3hnmtR", tags: ["php", "hindi"] },
    { type: 'web', title: "PHP For Beginners", platform: "Laracasts", visits: 3000000, url: "https://laracasts.com/series/php-for-beginners-2023-edition", tags: ["php"] },
    { type: 'web', title: "SwiftUI Foundations", platform: "Apple Developer", visits: 2800000, url: "https://developer.apple.com/tutorials/swiftui", tags: ["swift", "ios"] },

    // --- AI & SPECIALIZED ---
    { type: 'web', title: "Intro to AI with Python", platform: "Harvard University", visits: 12000000, url: "https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python", tags: ["ai", "python", "machine learning"] }
];

// UI Element Selectors
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsWrapper = document.getElementById('resultsWrapper');
const coursesGrid = document.getElementById('coursesGrid');
const resultTitle = document.getElementById('resultTitle');

// Event Listeners
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const rawQuery = searchInput.value.trim();
    const query = rawQuery.toLowerCase();
    
    if (!query) return;

    const filteredResults = courseDatabase.filter(item => {
        const title = item.title.toLowerCase();
        const platform = item.platform.toLowerCase();
        const tagsString = item.tags.join(" ").toLowerCase();

        // Specific Handling for C++ / C# / C
        if (query === "c++" || query === "cpp") return title.includes("c++") || tagsString.includes("cpp");
        if (query === "c#") return title.includes("c#");

        return title.includes(query) || platform.includes(query) || tagsString.includes(query);
    });

    // Ranking: Show most popular/highly-viewed courses first
    filteredResults.sort((a, b) => b.visits - a.visits);
    
    renderUI(filteredResults, rawQuery);
}

function renderUI(results, query) {
    coursesGrid.innerHTML = ''; 
    resultsWrapper.classList.remove('hidden');
    resultTitle.innerText = `Results for "${query}" (${results.length})`;

    if (results.length === 0) {
        coursesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Try searching "Rust", "PHP", or "Hindi".</p>';
        return;
    }

    results.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <span class="type-badge badge-${course.type}">${course.type.toUpperCase()}</span>
            <h3>${course.title}</h3>
            <p class="platform">${course.platform}</p>
            <div class="view-count">🔥 ${(course.visits / 1000000).toFixed(1)}M+ users</div>
            <a href="${course.url}" target="_blank" class="visit-btn">Start Learning</a>
        `;
        coursesGrid.appendChild(card);
    });

    resultsWrapper.scrollIntoView({ behavior: 'smooth' });
}

function clearSearch() {
    searchInput.value = '';
    resultsWrapper.classList.add('hidden');
    coursesGrid.innerHTML = '';
}