document.addEventListener("DOMContentLoaded", function () {
    // Dynamically insert the header
    const header = document.createElement("header");
    header.classList.add("main-header");
    header.innerHTML = `
        <button class="navigate" onclick="window.location.href='../index.html'">Back</button>
        <button class="navigate" disabled>Docs</button>
        <button class="navigate" disabled>About</button>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    // Dynamically insert the aside and tracker
    const aside = document.createElement("aside");
    aside.innerHTML = `
        <div class="tracker"></div>
    `;
    document.body.appendChild(aside);

    // Dynamically insert the footer
    const footer = document.createElement("footer");
    footer.classList.add("main-footer");
    footer.innerHTML = `
        <p>Made by the nerdiest of nerds</p>
        <p>
            <a href="#" class="popup-link" data-message="Privacy does not exist.">Privacy Policy</a> | 
            <a href="#" class="popup-link" data-message="Please don't be a pirate.">Terms of Service</a> | 
            <a href="#" class="popup-link" data-message="Contact is a myth.">Contact Us</a>
        </p>
        <p>&copy; 2023 UnCache. No rights reserved.</p>
    `;
    document.body.appendChild(footer);

    // Create a reusable popup element
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <p class="popup-message"></p>
        <button class="popup-close">Close</button>
    `;
    document.body.appendChild(popup);

    const popupMessage = popup.querySelector(".popup-message");
    const popupClose = popup.querySelector(".popup-close");

    // Close popup logic
    popupClose.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    // Add event listeners to footer links for custom popups
    document.querySelectorAll(".popup-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            popupMessage.textContent = link.dataset.message;
            popup.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const headers = {
        warning: "WARNING",
        note: "NOTE",
        disclaimer: "DISCLAIMER"
    };

    Object.keys(headers).forEach(className => {
        const divs = document.querySelectorAll(`div.${className}`);
        divs.forEach(div => {
            const header = document.createElement("strong");
            header.textContent = headers[className] + ": ";
            div.insertBefore(header, div.firstChild);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const tracker = document.querySelector(".tracker");
    const sections = document.querySelectorAll(".section-header");
    const warnings = document.querySelectorAll(".warning, .note, .disclaimer");

    if (!tracker || sections.length === 0) return;

    // Add heading above the tracker
    const trackerHeading = document.createElement("h2");
    trackerHeading.textContent = "Lesson Contents";
    trackerHeading.classList.add("tracker-heading");
    tracker.insertBefore(trackerHeading, tracker.firstChild);

    // Adjust tracker position on scroll
    const adjustTrackerPosition = () => {
        // Dynamically calculate the initial position of the tracker
        const initialTop = Array.from(warnings).reduce((maxBottom, warning) => {
            const warningBottom = warning.getBoundingClientRect().bottom + window.scrollY;
            return Math.max(maxBottom, warningBottom);
        }, 0);

        const scrollY = window.scrollY;
        const newTop = Math.max(initialTop - scrollY, 0); // Adjusted positioning
        tracker.style.top = `${newTop}px`;
    };

    window.addEventListener("scroll", adjustTrackerPosition);
    window.addEventListener("resize", adjustTrackerPosition); // Recalculate on resize
    adjustTrackerPosition(); // Initial call

    // Create tracker list
    const trackerList = document.createElement("ul");
    trackerList.style.listStyle = "none";
    trackerList.style.padding = "0";
    trackerList.style.margin = "0";

    sections.forEach((section, index) => {
        const listItem = document.createElement("li");
        listItem.style.marginBottom = "0.5rem";

        const link = document.createElement("a");
        link.textContent = section.textContent;
        link.href = `#section-${index}`;
        link.style.textDecoration = "none";
        link.style.color = "#007BFF";
        link.style.cursor = "pointer";
        link.style.transition = "color 0.3s ease";

        link.addEventListener("mouseover", () => (link.style.color = "#0056b3"));
        link.addEventListener("mouseout", () => (link.style.color = "#007BFF"));

        listItem.appendChild(link);
        trackerList.appendChild(listItem);

        // Add ID to section for navigation
        section.id = `section-${index}`;
    });

    tracker.appendChild(trackerList);

    // Smooth scrolling
    tracker.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            e.preventDefault();
            const targetId = e.target.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView();
                window.scrollBy(0, -window.innerHeight * 0.015);
            }
        }
    });

    // Highlight current section
    const highlightCurrentSection = () => {
        let currentSection = null;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const nextSection = sections[index + 1];
            const nextSectionTop = nextSection ? nextSection.getBoundingClientRect().top : Infinity;

            if (rect.top <= window.innerHeight / 2 && nextSectionTop > window.innerHeight / 10) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const activeLink = tracker.querySelector(`a[href="#${currentSection.id}"]`);
            if (activeLink) {
                tracker.querySelectorAll("a").forEach((link) => {
                    link.classList.remove("active");
                    link.style.color = "#ffffff"; // Reset color for inactive links
                    link.style.backgroundColor = "transparent"; // Reset background for inactive links
                });
                activeLink.classList.add("active");
                activeLink.style.color = "#ffffff"; // Set color for active link
                activeLink.style.backgroundColor = "#007BFF"; // Set background for active link
            }
        }
    };

    window.addEventListener("scroll", highlightCurrentSection);
    highlightCurrentSection(); // Initial call
});
