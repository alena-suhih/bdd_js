Feature: Booking ticket
    Scenario: Should booking ticket
        Given user is on "/client/index.php" page
        When user selects the date and time
        When user chooses seat on "3" row and "3" chair and click on Забронировать button
        Then user sees the ticket suggested "Получить код бронирования"