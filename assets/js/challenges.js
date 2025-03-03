$(document).ready(function() {
    let defaultChallenges = [
        { id: 1, name: "100 Push-ups Challenge", status: "Not Joined" },
        { id: 2, name: "30-Day Squat Challenge", status: "Not Joined" },
        { id: 3, name: "5K Running Challenge", status: "Not Joined" }
    ];

    loadChallenges(); // Load challenges localStorage

    // Load Challenges Check Status Exists
    function loadChallenges() {
        let savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];

        if (savedChallenges.length === 0) {
            savedChallenges = defaultChallenges;
        } else {
            savedChallenges.forEach(challenge => {
                if (!challenge.status) {
                    challenge.status = "Not Joined"; // Set default status if missing
                }
            });
        }

        $("#challenges-list").empty(); // Clear the list

        savedChallenges.forEach(challenge => {
            let joinIcon = challenge.status !== "Not Joined" ? "✅" : ""; // Show checkmark if joined
            let buttonClass = challenge.status === "Completed" ? "btn-success" : "btn-primary";

            let challengeCard = `
                <div class="col-md-4">
                    <div class="card p-3 shadow text-center">
                        <h4>${challenge.name} <span class="status-icon">${joinIcon}</span></h4>
                        <button class="btn ${buttonClass} join-challenge mt-2" data-id="${challenge.id}">${challenge.status === "Not Joined" ? "Join" : "Joined"}</button>
                        <button class="btn btn-outline-success complete-challenge mt-2" data-id="${challenge.id}" ${challenge.status === "Completed" ? "disabled" : ""}>Complete</button>
                    </div>
                </div>
            `;

            $("#challenges-list").append(challengeCard);
        });

        // Save the corrected list to localStorage
        localStorage.setItem("challenges", JSON.stringify(savedChallenges));
    }

    // Join Challenge Button
    $(document).on("click", ".join-challenge", function() {
        let challengeId = $(this).data("id");
        let savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];

        savedChallenges.forEach(challenge => {
            if (challenge.id === challengeId && challenge.status === "Not Joined") {
                challenge.status = "Joined";
            }
        });

        localStorage.setItem("challenges", JSON.stringify(savedChallenges));
        loadChallenges(); // Reload UI
    });

    // Complete Challenge Button
    $(document).on("click", ".complete-challenge", function() {
        let challengeId = $(this).data("id");
        let savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];

        savedChallenges.forEach(challenge => {
            if (challenge.id === challengeId && challenge.status === "Joined") {
                challenge.status = "Completed";
            }
        });

        localStorage.setItem("challenges", JSON.stringify(savedChallenges));
        loadChallenges(); // Reload UI
    });
});
