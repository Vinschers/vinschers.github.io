document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // 1. Find the parent container
            const container = button.closest(".tabs-container");

            // 2. Deactivate all buttons and content in this container
            container
                .querySelectorAll(".tab-btn")
                .forEach((btn) => btn.classList.remove("active"));
            container
                .querySelectorAll(".tab-content")
                .forEach((content) => content.classList.remove("active"));

            // 3. Activate the clicked button
            button.classList.add("active");

            // 4. Activate the target content
            const targetId = button.getAttribute("data-target");
            container.querySelector(`#${targetId}`).classList.add("active");
        });
    });
});
