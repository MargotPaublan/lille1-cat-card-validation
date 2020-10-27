Feature: Cat card edition
  Where adjustments can be done

  Background: Context for operations
    Given A browser is open
    And I go to "/" path of the application

  Scenario: Cat card edition page access
    When I put the mouse hover the last card
    And I click on the edit button
    Then I should see the cat card edition page
    And I should see the card title input with text
    And I should see the card image input with text
    And I should see the card description input with text
    And I should see the save button
    And I should see the delete button

  Scenario: Cat card edition page header
    When I put the mouse hover the last card
    And I click on the edit button
    Then I should see the cat card edition page header

  Scenario: Application footer
    When I put the mouse hover the last card
    And I click on the edit button
    Then I should see the application's footer
    And It should contains current copyright informations

  Scenario: Go back to home page
    When I put the mouse hover the last card
    And I click on the edit button
    And I click on the header's back button
    Then I should see the home page header
    And I should see the card list content with 2 cat cards

  Scenario: Cat card edition
    When I put the mouse hover the last card
    And I click on the edit button
    And I fill the card title input with "card test"
    And I fill the card image input with "https://cataas.com/cat"
    And I fill the card description input with "This is a cat card test"
    And I click on the cat card edition save button
    Then I should see the home page header
    And I should see the card list content with 2 cat cards
    And I should see the last card title as "card test"
    And I should see the last card description as "This is a cat card test"