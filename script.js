// Bing Bong — theme toggle, hamburger menu, scroll-spy.
// Kanav Gupta (xguptak00)



const theme_toggle = document.getElementById("theme-toggle");
const html_element = document.documentElement;

// returns the opposite theme to the current one
function getNextTheme() {
    if (html_element.getAttribute("data-theme") === "dark") {
        return "light";
    } else {
        return "dark";
    }
}

function updateToggleLabel() {
    theme_toggle.setAttribute("aria-label", "Switch to " + getNextTheme() + " mode");
}

theme_toggle.addEventListener("click", function () {
    html_element.setAttribute("data-theme", getNextTheme());
    updateToggleLabel();
});

html_element.setAttribute("data-theme", "dark");
updateToggleLabel();


// Hamburger

const hamburger = document.querySelector(".hamburger");
const nav = document.getElementById("main-nav");

hamburger.addEventListener("click", function () {
    const is_open = nav.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", is_open);
    hamburger.setAttribute("aria-expanded", String(is_open));
});

// close the menu after a link is tapped
const nav_links = document.querySelectorAll(".nav-link");
nav_links.forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
    });
});


// Scroll-spy (active section in nav)

const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const section_id = entry.target.getAttribute("id");
            nav_links.forEach(function (link) {
                if (link.getAttribute("href") === "#" + section_id) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px", // threshold for trigger
    threshold: 0
});

sections.forEach(function (section) {
    observer.observe(section);
});
