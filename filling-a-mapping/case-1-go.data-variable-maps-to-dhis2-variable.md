# Case 1: Go.Data variable maps to DHIS2 variable

When there's a DHIS2 variable that we can match to the Go.Data variable, we need to go to that Go.Data variable's row in the table and click on the blank cell under the DHIS2 column. This will make a pop-up menu appear.

## **Navigating the pop-up**

![](https://user-images.githubusercontent.com/91990504/172206744-0e5c5a85-fb38-4264-b06d-b6f4f6e1c8ae.png)

After clicking on a cell in the mapping and opening the pop-up menu (like the one in the figure in the right) we need to navigate the choices we are given.

The drop-down menu on top of the pop-up allows us to choose what kind of mapping we want, giving us three choices: "DHIS2 entities", "DHIS2 properties", and "Constant". Selecting each of these choices will change the set of values we can choose from. "DHIS2 entities" will give us a table containing all the DHIS2 variables that are linked to the type of mapping we selected before (Outbreak, Locations, Cases, etc.). "DHIS2 properties" will contain any variables that we specified in the "Select DHIS2 model" button, if we specified any. "Constant" will give us a text box where we can introduce a text value that we want to map.

When we have a matching DHIS2 variable, we will want to select "DHIS2 entities" in the first drop-down menu. When "DHIS2 entities" is selected, a second drop down and a table with different DHIS2 variables appear in the pop-up. The second drop down allows us to select what kind of DHIS2 variables we want to see in the table: "Metadata properties" will give us a set of DHIS2 variables related to DHIS2's metadata, "Data elements" will give us the set of DHIS2 Data Elements that are related to the type of mapping we are working on, and "Attributes" will too give us the set of DHIS2 Attributes that are linked to the type of mapping we are working on.

### **Example - "dob"**

Let's address the example we spoke about before: The demo GIF below shows how we must proceed when we want to map Go.Data's "dob" variable to DHIS2's "Date of birth" variable, which in DHIS2 is of the Data Element kind. We click on the DHIS2 cell, select "DHIS2 entities" and "Attributes" in the drop-down menus, and then we just click on the desired variable.

![Mapping-Case1\_Itsamatch](https://user-images.githubusercontent.com/91990504/173567298-dc9f6ee6-cf71-45b7-9918-d83180e5c7c9.gif)

## **The Program and Conversion columns**

Notice how the "Program" and "Conversion" column values change automatically when we select a DHIS2 variable.

The value under "Program" indicates us what DHIS2 program was selected when the DHIS2 variable was chosen. Although this may seem redundant information, the app has been built to ensure maximum flexibility. If a user wanted to create a mapping where variables are taken from two different programs, it would be possible. The "Program" drop-down menu works in a dynamic manner: after filling a part of the mapping with variables from a given DHIS2 program, we can select a different program and keep filling the mapping with variables from this second program. This may not be the most common use case, but it is allowed.

The "Conversion" column indicates what kind of conversion will be performed by the app, also reminding us which kind of element we introduced in the mapping (a Constant, or a DHIS2 Data Element, Attribute, or Metadata Property).

## **The Values column**

The last column of the mapping table is the "Values" column. This is column is designed so that users can pass a dictionary of values for the app to create an intra-variable mapping: sometimes we will find a variable in DHIS2 that can be mapped to a Go.Data variable, but the values inside of the DHIS2 variable need to be transformed so they map the values of the Go.Data variable.

This dictionary has a JSON format, where the keys correspond to the Go.Data values that we want to modify, and the values assigned to those keys correspond to the DHIS2 values that we want to match with their keys.

We can use the "values" element to pass a series of values that we want to map, and the app will perform a transformation values of the variable.

For example, Go.Data's variable "geographicalLevelId" maps to DHIS2's variable "level". However, there are some values of this variable that we need to map between the two softwares. The location levels in Go.Data are called "Admin Level 0", "Admin Level 1", etc. while in DHIS2 they're called "1", "2", etc.

To map these values and transform them so that they are compatible within each of the softwares, we need to create a set of key-value pairs where the key of the pair is Go.Data's value to modify, and the value of the pair is the DHIS2 value to modify. This way, when the app finds "0" in DHIS2's "level" variable and it maps it to Go.Data's "geographicalLevelId" variable, it will automatically transform it to "Admin Level 1". This intra-variable mapping is illustrated in figure 5.

![image](https://user-images.githubusercontent.com/91990504/174273584-fe5a4f0d-f6be-480c-82b5-a0a7fee03893.png)

_**Figure 5**. Diagram illustrating how the Values column serves as a intra-variable mapping to transform the values of a DHIS2 variable to modified values in Go.Data._
