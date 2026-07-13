(() => {
    "use strict";

    const root = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector(".theme-icon");
    const resumeFrame = document.getElementById("resume-frame");
    const resumeLoading = document.getElementById("resume-loading");
    const resumeFallback = document.getElementById("resume-fallback");
    const currentYear = document.getElementById("current-year");

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem("resume-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    };

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        localStorage.setItem("resume-theme", theme);

        if (themeIcon) {
            themeIcon.textContent = theme === "dark" ? "☀" : "☾";
        }

        if (themeToggle) {
            const nextTheme = theme === "dark" ? "light" : "dark";
            themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
            themeToggle.setAttribute("title", `Switch to ${nextTheme} theme`);
        }
    };

    setTheme(getPreferredTheme());

    themeToggle?.addEventListener("click", () => {
        setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear().toString();
    }

    if (resumeFrame) {
        const source = resumeFrame.dataset.resumeSrc;

        if (source) {
            const [filePath, fragment = ""] = source.split("#");
            const cacheBustedPath = `${filePath}?updated=${Date.now()}`;
            resumeFrame.src = fragment
                ? `${cacheBustedPath}#${fragment}`
                : cacheBustedPath;
        }

        resumeFrame.addEventListener("load", () => {
            resumeLoading?.classList.add("is-hidden");
        });

        window.setTimeout(() => {
            if (!resumeLoading?.classList.contains("is-hidden")) {
                resumeLoading?.classList.add("is-hidden");
                resumeFallback?.classList.add("is-visible");
            }
        }, 12000);
    }

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }
})();
