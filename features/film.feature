Feature: The first film
    Scenario: The first film
        Given user is on "/client/index.php" page
        When user sees the page title
        Then user sees the first movie "Train arrival"