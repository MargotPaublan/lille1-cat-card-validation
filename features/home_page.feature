Feature: Home page
  Where the cat magic happen

  Background: Context for operations
    Given A browser is open

  Scenario: Display cat card list
    When I go to "/" path of the application
    Then I should see the home page header
    And I should see the card list content with 2 cat cards

  Scenario: Cat card creation available
    When I go to "/" path of the application
    Then I should see the creation button

  Scenario: Application footer
    When I go to "/" path of the application
    Then I should see the application's footer
    And It should contains current copyright informations

  Scenario: Cat card front content
    When I go to "/" path of the application
    Then I should see the card list content with 2 cat cards
    And I should see an image of cat in the last card front content
    And I should see a title in the last card front content

  Scenario: Cat card flip behavior
    When I go to "/" path of the application
    And I put the mouse hover the last card
    Then I should see the last card flip to show its back
    And I should see a title in the last card back content
    And I should see a description in the last card back content
    And I should see a button in the last card back content
