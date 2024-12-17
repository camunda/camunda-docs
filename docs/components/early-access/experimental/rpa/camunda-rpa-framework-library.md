---
id: rpa-framework-library
title: RPA framework library
description: "Learn how Camunda offers a custom library for the RPA framework, providing out-of-the-box functionality to manipulate Camunda variables within RPA scripts."
---

Camunda offers a custom library for the **robotic process automation (RPA)** framework, that allows you to manipulate [Camunda variables](/components/concepts/variables.md) within RPA scripts.

## Import the Camunda library

To use Camunda-provided keywords, import the Camunda library into your **Robot** file. The Camunda library is only available within the [Camunda RPA runtime](/components/early-access/experimental/rpa/rpa-integration-with-camunda.md).

```robot
*** Settings ***
Library             Camunda

# More Libraries here ...
```

## Use keywords and set variables

To set a process variable in Camunda from within an RPA script, use the keyword `Set Output Variable`. This keyword sets an output variable to be returned from the RPA worker to Camunda. Learn more about [variable propagation](/components/concepts/variables.md#inputoutput-variable-mappings).

### Syntax

```robot
Set Output Variable	{variableName}	{value}
```

### Parameters

- \{variable_name}: The name of the variable you want to set or update.
- \{value}: The value you want to assign to the variable.

### Example

```robot
Set Output Variable	customerName	John Doe
```

This command sets a variable named `customerName` with the value `John Doe` in the current task [context](/components/concepts/variables.md). This will be available in the process scope after task completion.

## Example usage

The following example demonstrates a script that solves the first challenge at [rpachallenge.com](https://rpachallenge.com/) and returns the result message to Camunda:

```robot
*** Settings ***
Documentation       Robot to solve the first challenge at rpachallenge.com,
...                 which consists of filling a form that randomly rearranges
...                 itself for ten times, with data taken from a provided
...                 Microsoft Excel file. Return Congratulation message to Camunda.

Library             RPA.Browser.Playwright
Library             RPA.Excel.Files
Library             RPA.HTTP
Library             Camunda

*** Tasks ***
Complete the challenge
    Start the challenge
    Fill the forms
    Collect the results

*** Keywords ***
Start the challenge
    New Browser     headless=false
    New Page    http://rpachallenge.com/
    RPA.HTTP.Download
    ...    http://rpachallenge.com/assets/downloadFiles/challenge.xlsx
    ...    overwrite=True
    Click    button

Fill the forms
    ${people}=    Get the list of people from the Excel file
    FOR    ${person}    IN    @{people}
        Fill and submit the form    ${person}
    END

Get the list of people from the Excel file
    Open Workbook    challenge.xlsx
    ${table}=    Read Worksheet As Table    header=True
    Close Workbook
    RETURN    ${table}

Fill and submit the form
    [Arguments]    ${person}
    Fill Text    //input[@ng-reflect-name="labelFirstName"]    ${person}[First Name]
    Fill Text    //input[@ng-reflect-name="labelLastName"]    ${person}[Last Name]
    Fill Text    //input[@ng-reflect-name="labelCompanyName"]    ${person}[Company Name]
    Fill Text    //input[@ng-reflect-name="labelRole"]    ${person}[Role in Company]
    Fill Text    //input[@ng-reflect-name="labelAddress"]    ${person}[Address]
    Fill Text    //input[@ng-reflect-name="labelEmail"]    ${person}[Email]
    Fill Text    //input[@ng-reflect-name="labelPhone"]    ${person}[Phone Number]
    Click    input[type=submit]

Collect the results
    ${resultText}=      Get Text        selector=css=div.congratulations .message2
    Set Output Variable     resultText      ${resultText}
    Close Browser
```
