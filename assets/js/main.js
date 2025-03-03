$(document).ready(function() {

    //Dark Mode Toggle
    $("#dark-mode-toggle").click(function() {
        $("body").toggleClass("bg-dark text-white");
        $(".navbar").toggleClass("bg-dark navbar-light navbar-dark");
        $("header").toggleClass("bg-primary bg-dark");
        $("section").toggleClass("bg-light bg-dark text-white");

        //Fix navbar text colors in dark mode
        $(".navbar-nav .nav-link, .navbar-brand").toggleClass("text-light");

        // Carousel text stays black
        $(".carousel-item p").toggleClass("text-dark");

        // Carousel arrows stay black
        $(".carousel-control-prev-icon, .carousel-control-next-icon").toggleClass("black-arrows");

        //Store user preference in localStorage
        if ($("body").hasClass("bg-dark")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    //Load Dark Mode Preference (Keeps the mode after refresh)
    if (localStorage.getItem("darkMode") === "enabled") {
        $("body").addClass("bg-dark text-white");
        $(".navbar").addClass("bg-dark navbar-light navbar-dark");
        $("header").addClass("bg-dark");
        $("section").addClass("bg-dark text-white");
        $(".navbar-nav .nav-link").addClass("text-light"); // Ensure links turn white

        // Carousel text stays black
        $(".carousel-item p").addClass("text-dark");

        // Carousel arrows stay black
        $(".carousel-control-prev-icon, .carousel-control-next-icon").addClass("dark-mode-arrows");
    }
});