# Case 2: Go.Data variable maps to a value

When a Go.Data variable has no matching variable in DHIS2, we can give the app a default value to be passed to the variable. This is a very useful tool that can serve to map a variable to some meaningful value, but it can also be used to pass important information to the app. Instead of mapping a DHIS2 variable to the Go.Data variable, we just map that variable to a default value that all the elements being sent from DHIS2 to Go.Data will have for that given variable.

### **Example - "OutbreakId" and "deleted"**

Let's take a look at an example of what it looks like when we want to pass constant values to Go.Data. The demo below shows how we can pass important information to the app, such as the case of "OutbreakId", or simply pass a meaningful default value to a variable such as "deleted".

Filling the Go.Data variable "outbreakId" correctly is very important in the case of Go.Data Case, Go.Data Contact, and Go.Data Contact of Contact mappings. In Go.Data, each case, contact, or contact of contact is linked to a given Outbreak through "outbreakId". In order for the app to know to which outbreak the cases we are passing from DHIS2 to Go.Data should go, we need to pass the correct "outbreakId" in the mapping.

The demo below shows how to find this outbreakId, and then, it shows how to add it as a "Constant" value in the mapping. After that, it also illustrates how to fill other variables with a default value, such as the Go.Data variable "deleted" being filled with the value "false". Take a look:

![Mapping-Case2\_outbreak\_deleted](https://user-images.githubusercontent.com/91990504/173615729-814ba837-3682-4f31-95b3-66b80efcf192.gif)

In this case, the "Conversion" value has automatically changed to "Constant" to remind us of what kind of conversion will take place!
