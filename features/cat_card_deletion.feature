Feature: Cat card edition
  Where the final sentence is applied

  Background: Context for operations
    Given A browser is open
    And I go to "/" path of the application

  Scenario: Cat card deletion page access
    When I put the mouse hover the last card
    And I click on the edit button
    Then I should see the cat card edition page
    And I should see the card title input with text
    And I should see the card image input with text
    And I should see the card description input with text
    And I should see the save button
    And I should see the delete button

  Scenario: Cat card deletion
    When I put the mouse hover the last card
    And I click on the edit button
    And I click on the cat card deletion button
    Then I should see the home page header
    And I should see the card list content with 1 cat card
    And I should see the last card title as "Random cat card"
    And I should see the last card description as "That card shows a random cat image."