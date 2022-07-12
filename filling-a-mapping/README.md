# Filling a Mapping

After we have introduced a Go.Data model (either automatically or manually), a set of rows with each of the Go.Data variables in the introduced model will appear in the table in the bottom of the page.

## **The Go.Data mapping scaffold**

The Go.Data column of the mapping is automatically filled by the app using the Go.Data model that we introduced when configuring the mapping, and it contains the name of each Go.Data variable that we want to map. It's the scaffold on which we will build the mapping.

We can remove and add rows at our will (by using the thrash can button or the "Add Row" button, respectively), which gives the end user more flexibility when creating new mappings.

## **Mapping DHIS2 variables to the scaffold**

The DHIS2 column of the mapping must be filled with the variables and/or user-defined values that will be mapped to the Go.Data elements in the Go.Data column. It needs to be filled manually by the end user, and for each of the Go.Data variables that we map, we may find one of three cases.

In the first case, we know that a DHIS2 variable can be mapped to the Go.Data variable (for example, we know that Go.Data's variable "dob" maps to DHIS2's variable "Date of birth").

In the second case, we can't find a DHIS2 variable that maps to the Go.Data variable, but we can think of a simple text value that makes sense (for example, we can map Go.Data's variable "deleted" to the text value "false" when we transfer cases from DHIS2 to Go.Data).

In the third case, no DHIS2 variable or simple text value can be mapped to a Go.Data element (for example, we need to map Go.Data's variable "deletedAt", but we won't be transferring deleted elements: it doesn't make sense to have any kind of value being mapped for this variable!).

The following subpages illustrate how to deal with each of these cases.
