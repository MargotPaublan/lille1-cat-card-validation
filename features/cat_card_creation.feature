Feature: Cat card creation
  Where creativity has no limits

  Background: Context for operations
    Given A browser is open
    And I go to "/" path of the application

  Scenario: Cat card creation page access
    When I click on the creation button
    Then I should see the cat card creation page
    And I should see an empty form
    And I should see the save button
    And I should not see the delete button

  Scenario: Cat card creation page header
    When I click on the creation button
    Then I should see the cat card creation page header

  Scenario: Application footer
    When I click on the creation button
    Then I should see the application's footer
    And It should contains current copyright informations

  Scenario: Go back to home page
    When I click on the creation button
    And I click on the header's back button
    Then I should see the home page header
    And I should see the card list content with 2 cat cards

  Scenario: Cat card creation with empty form
    When I click on the creation button
    And I click on the cat card creation save button
    Then I should see the cat card creation page
    And I should see the card title input in error
    And I should see an error message under card title input
    And I should see the card image input in error
    And I should see an error message under card image input
    And I should see the card description input as valid

  Scenario: Cat card creation without description
    When I click on the creation button
    And I fill the card title input with "card test"
    And I fill the card image input with "https://cataas.com/cat"
    And I click on the cat card creation save button
    Then I should see the home page header
    And I should see the card list content with 3 cat cards
    And I should see the last card title as "card test"

  Scenario: Cat card creation with description
    When I click on the creation button
    And I fill the card title input with "card test"
    And I fill the card image input with "https://cataas.com/cat"
    And I fill the card description input with "This is a cat card test"
    And I click on the cat card creation save button
    Then I should see the home page header
    And I should see the card list content with 3 cat cards
    And I should see the last card title as "card test"
    And I should see the last card description as "This is a cat card test"
