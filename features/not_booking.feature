Feature: Not booked ticket
    Scenario: Shouldn't booking ticket
        Given user is on "/client/index.php" page
        When user selects the date and time
        When user clicks on Забронировать button
        Then user didn't go to booking confirmation page, stayed on current page and sees " Свободно VIP ("