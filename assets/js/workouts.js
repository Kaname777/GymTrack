$(document).ready(function() {
    // Load localStorage
    loadWorkouts();
    
    // Form Submission
    $("#workout-form").submit(function(event) {
        event.preventDefault(); // Prevent from refresh

        // Get values
        let exercise = $("#exercise").val().trim();
        let sets = $("#sets").val();
        let reps = $("#reps").val();
        let weight = $("#weight").val() || "Bodyweight"; // Default "Bodyweight" if empty

        // Ensure exercise name is provided
        if (exercise === "") {
            alert("Please enter an exercise name.");
            return;
        }

        // Workout object
        let workout = { exercise, sets, reps, weight, completed: false };

        // Save to localStorage
        saveWorkout(workout);

        // Append to  list
        addWorkoutToTable(workout);

        // Remove "No workouts logged yet." message if it exists
        $("#workout-list tr:contains('No workouts logged yet.')").remove();

        // Clears fields after submission
        $("#workout-form")[0].reset();
    });

    // Delete Button
    $(document).on("click", ".delete", function() {
        let row = $(this).closest("tr");
        let exerciseName = row.find("td:first").text();

        // Remove from localStorage
        deleteWorkout(exerciseName);

        // Remove 
        row.remove();

        // If no workouts show placeholder 
        if ($("#workout-list tr").length === 0) {
            $("#workout-list").append('<tr><td colspan="5" class="text-center">No workouts logged yet.</td></tr>');
        }
    });

    // Complete Button
    $(document).on("click", ".complete", function() {
        let row = $(this).closest("tr");
        let exerciseName = row.find("td:first").text();

        let isCompleted = row.hasClass("table-success"); // Check if completed
        let newCompletedStatus = !isCompleted; // Toggle the status

        row.toggleClass("table-success");
        updateWorkoutCompletion(exerciseName, newCompletedStatus); // Save updated status
    });

    // Load Workouts from localStorage
    function loadWorkouts() {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        
        $("#workout-list").empty();

        if (workouts.length === 0) {
            $("#workout-list").append('<tr><td colspan="5" class="text-center">No workouts logged yet.</td></tr>');
        } else {
            workouts.forEach(addWorkoutToTable);
        }
    }

    // Save a Workout to localStorage
    function saveWorkout(workout) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.push(workout);
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    //Update Workout Completion Status
    function updateWorkoutCompletion(exerciseName, isCompleted) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

        workouts.forEach(workout => {
            if (workout.exercise === exerciseName) {
                workout.completed = isCompleted; // Update the completed status
            }
        });

        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    // Delete a Workout from localStorage
    function deleteWorkout(exerciseName) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts = workouts.filter(workout => workout.exercise !== exerciseName);
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    // Add a Workout to the Table
    function addWorkoutToTable(workout) {
        $("#workout-list tr:contains('No workouts logged yet.')").remove();

        let completedClass = workout.completed ? "table-success" : ""; // Apply class if completed

        let newRow = `
            <tr>
                <td>${workout.exercise}</td>
                <td>${workout.sets}</td>
                <td>${workout.reps}</td>
                <td>${workout.weight} kg</td>
                <td>
                    <button class="btn btn-success btn-sm complete">Complete</button>
                    <button class="btn btn-danger btn-sm delete">Delete</button>
                </td>
            </tr>
        `;
        $("#workout-list").append(newRow);
    }

    // Filter Workouts by Exercise Name
    $("#filter-exercise").on("input", function() {
        let filterText = $(this).val().toLowerCase();

        $("#workout-list tr").each(function() {
            let exerciseName = $(this).find("td:first").text().toLowerCase();

            if (exerciseName.includes(filterText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    //Sorting Workouts
    $("#sort-workouts").change(function() {
        let sortBy = $(this).val();
        let rows = $("#workout-list tr").get(); // Gets all table rows converts jQuery elements into a standard JavaScript array

        rows.sort(function(a, b) {
            let valA = $(a).find("td:first").text().toLowerCase();
            let valB = $(b).find("td:first").text().toLowerCase();

            if (sortBy === "sets") {
                valA = parseInt($(a).find("td:nth-child(2)").text());
                valB = parseInt($(b).find("td:nth-child(2)").text());
            } else if (sortBy === "reps") {
                valA = parseInt($(a).find("td:nth-child(3)").text());
                valB = parseInt($(b).find("td:nth-child(3)").text());
            } else if (sortBy === "weight") {
                valA = parseFloat($(a).find("td:nth-child(4)").text());
                valB = parseFloat($(b).find("td:nth-child(4)").text());
            }

            return valA > valB ? 1 : -1;
        });

        $("#workout-list").append(rows);
    });

    // Reset Filters Button
    $("#reset-filters").click(function() {
        $("#filter-exercise").val("");
        $("#sort-workouts").val("name");
        $("#workout-list tr").show();
    });

});