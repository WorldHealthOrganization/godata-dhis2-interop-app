# Case 3: No DHIS2 variable or Constant value match

Sometimes we will find that no correct DHIS2 variable or constant value can match a Go.Data variable. Some Go.Data variables don't have any kind of equivalent in DHIS2, and at the same time they are not trivial: we can't simply map a constant value to them.

In this case we can choose a default value to point out that a variable is missing, such as "Unknown" or "Undefined", to remind the user that will work with the Go.Data instance we are creating that a given variable's values are not available. Alternatively, we can leave the DHIS2 completely empty, and instead of a default value, the Go.Data variable will be left blank.
