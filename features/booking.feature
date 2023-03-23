Feature: Booking ticket
    Scenario: Should booking ticket
        Given user is on "/client/index.php" page
        When user click on ".page-nav a + a + a"
        When user click on ".movie-seances__list li + li + li a"
        When user click on ".buying-scheme__wrapper .buying-scheme__row span + span + span + span"
        When user click on ".acceptin-button"
        Then user sees the course suggested "Получить код бронирования"