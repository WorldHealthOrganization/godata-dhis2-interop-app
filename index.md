# Go.Data - DHIS2 Interoperability app

# Introduction
The Go.Data-DHIS2 Interoperability App enables metadata to be securely exchanged between [Go.Data](https://www.who.int/tools/godata), an outbreak response tool developed by WHO, and [DHIS2](https://dhis2.org/), a widely used system for national health information management developed by the University of Oslo. This includes bi-directional exchange of reference metadata used across both platforms (i.e., location hierarchies, facility lists); and case/contact data (cases being registered and investigated; and their contacts who are being listed and traced). Such an integration enables field teams to make use of additional visualizations for chains of transmission and contact tracing follow up in Go.Data during an acute outbreak scenario while ensuring key field intel gets reflected back into overarching DHIS2 system. 

# Requirements and compatibilities

The app requires one functioning instance of DHIS2 one of Go.Data from which to exchange data. The app is currently compatible with Go.Data V40.1 and above (testing to be performed for lower versions), and compatible with DHIS2 versions 2.34 and above. Also, it is currently compatible with the DHIS2 Tracker and Event Capture modules, across all types of Program Attributes and Data Elements.

# Installation 
## How to install the app
Until the app is made available on the DHIS2 App Hub, you can download the GitHub's repository .zip file directly from [WHO Github](https://github.com/WorldHealthOrganization/godata-dhis2-interop-app)'s page for the interoperability app. Then, a .zip file containing the app needs to be built using [Yarn](https://yarnpkg.com/). 

After building and locating the zip resulting from Yarn' build command, go to the App Management app in your DHIS2 instance and upload the .zip file.

# App functionality
## Main functionality
The app module consists of a main menu from which we can navigate to the four panels of the app where we can set our configuration and perform various actions.

![Screenshot_MainMenu](https://user-images.githubusercontent.com/91990504/161969701-ba9f8cf0-6f08-4cb0-963f-7154113b39b6.png)
*__Figure 1__. View of the main menu with the four different panels.*

1. **Go.Data Configuration panel**: It's used to configure the connection to the Go.Data server with which you want to exchange data with. The user's Go.Data credentials need to be introduced here.
2. **DHIS2 Configuration panel**: It's used to configure the connection to the DHIS2 server. The user's DHIS credentials need to be introduced here for the app to work.   
3. **Metadata Mapping panel**: It's used to create, modify, or delete metadata mappings. For all mappings, and throughout subsequent system development, dot notation is used (a way of accessing JSON objects of any depth).
4. **Interoperability Tasks panel**: It's used to add and manage tasks for data exchange across platforms.


## Bi-directional data exchange
At present data exchange is only from DHIS2 to Go.Data. However, two-way data exchange will be incorporated into subsequent versions soon.

# Configuring the app
The app configuration should only need to be done once, at installation time, by your DHIS2 administrator. The person configuring the mapping should be aware of use-cases and metadata collected by both DHIS2 and Go.Data.

Besides the connections to the Go.Data and DHIS2 instances, the app requires the configuration of two types of elements: Metadata Mappings, and Interoperability Tasks

## Connecting the app
### Go.Data Configuration
The app requires your Go.Data instance's URL, and the username and password for your Go.Data user. Take into account that the default port for Go.Data is 8000, but it may be different in your instance. The credentials are safely encrypted and stored in DHIS2's _userDataStore_ according to DHIS2's safety and cybersecurity requirements.

![ConfiguringGoData](https://user-images.githubusercontent.com/91990504/172189552-fffafa9b-c1fc-4857-b06f-688b4616ed0d.png)



### DHIS2 Configuration
The app requires the username and password for your DHIS2 user. If the DHIS2 instance from which you want to transfer data is the one in which the app is installed, you don't need to modify anything else. By default, the app keeps '../../..' as a URL placeholder, referring to the same instance. 

However, as a legacy function that will soon be deprecated, the possibility to introduce the URL for a second DHIS2 instance exists, using the DHIS2 instance with the app installed as middleware. In any case, the credentials are safely encrypted and stored in DHIS2's _userDataStore_.

![ConfiguringDHIS2](https://user-images.githubusercontent.com/91990504/172189045-f972b7bf-36cc-4aaa-80f2-714b14fa8ac7.png)



## Metadata Mapping
### Mapping Overview
In the Metadata Mapping section's overview screen, we can add, edit, and delete metadata mappings.

Metadata Mappings contain the associations between DHIS2 and Go.Data entities, and they are used by the app to map the data elements from one software to the other. This mapping is necessary because the schemas of DHIS2 and Go.Data can be similar, but they are not fully equivalent. For example, a DHIS2 "organization unit" is called a "Location" in Go.Data. These differences and others need to be addressed in a case-by-case manner to integrate both schemas as much as possible.

![MetadataMappingOverview](https://user-images.githubusercontent.com/91990504/161981359-96d753bc-43e0-4bc7-924d-72a2bf01ded8.png)
*__Figure 3__. Metadata Mapping overview screen.*

In the Mappings overview screen, we can load four built-in default mappings by clicking on the "Load default config" button. These mappings have been specifically created for the DHIS2 COVID-19 standardized programs and allow automatised transfer of data from DHIS2 instances using those programs to Go.Data without further modifications. Any other DHIS2 programs would require the creation of a new mapping. 

### Mapping Editor

When we add or or edit a mapping, the Mappings setup page is opened, as can be seen in figure 4.  The mapping editor enables flexible and customizable matching of metadata across the two platforms.

![MetadataMappingAdd](https://user-images.githubusercontent.com/91990504/172192676-9a8c37c7-58d5-4cf5-be09-efa445bf85f6.png)
*__Figure 4__. Mapping editor with the default Location mapping open.*

Before getting our hands on the mapping itself, we need to tune some settings. 

#### Configuring the mapping

##### Selecting the Type, Program, and Name

First, we need we need to select the type of mapping in the "Type" drop-down menu. The type of the mapping refers to which Go.Data element we will be creating a mapping for: _Outbreak, Case, Contact, Contact of Contact, Location,_ or _event._ 

Then, we need to select the DHIS2 program in the "Program" drop-down menu. We want to select the DHIS2 program whose variables we want to match to the variables of the Go.Data element of our selected type. As explained later on, when we get to map DHIS2 variables to Go.Data variables, the app will offer us a set of DHIS2 data elements, attributes, or properties. The set of elements that we are offered will depend on which DHIS2 program we have selected in this drop-down menu. If you need to map the elements of more than one DHIS2 Program in the same program, don't worry. The "Program" drop-down is a dynamic element, and as we change it, the set of DHIS2 attributes that the app offers changes too. We'll talk about this later.

Having selected the type of mapping and chosen a DHIS2 program to extract elements from, we need to give our mapping a meaningful name. 

##### Selecting the Go.Data and DHIS2 models

<img
  align="right"
  width="330"
  height="300"
  src="https://user-images.githubusercontent.com/91990504/172196104-70f10b45-6867-4d47-91f0-897f1d151275.png">

Lastly, we need to define a Go.Data model from which we want to create the mapping by clicking on the "Select Go.Data Model" button. This will open a pop-up with a text box. If your Go.Data instance is version 2.40 or higher, you can automatically fetch the Go.Data model by clicking on the "Autogenerate model" button. 

If your Go.Data instance is 2.39 or lower, don't despair: you can still manually find the model and copy it into the text box. To do so, you will need to browse the API explorer of your Go.Data instance (by typing "/explorer" after your Go.Data instance's URL), find the type of mapping that you are creating (remember: _outbreak, location, case,_ etc.) and click on it. This expands the explorer with a set of elements: you'll need to open the generic element's POST operation, click on it, and copy the contents of the light yellow box containing the Model with example values. This is what you need to paste back into the interoperability app text box. After this, you need to click submit to close the pop-up and save the Go.Data model.

Optionally, we can also introduce a custom DHIS2 model by clicking on the "Select DHIS2 Model" button. This option is there just to guarantee maximum flexibility. It allows us to introduce some custom DHIS2 variable names to select from in case we needed to select something that was not present among the data elements, attributes, and program properties of our program. 

#### Filling the mapping

After we have introduced a Go.Data model (either automatically or manually), a set of rows with each of the Go.Data variables in the introduced model will appear in the table in the bottom of the page.


##### The Go.Data mapping scaffold
The Go.Data column of the mapping is automatically filled by the app using the Go.Data model that we introduced when configuring the mapping, and it contains the name of each Go.Data variable that we want to map. It's the scaffold on which we will build the mapping.

We can remove and add rows at our will (by using the thrash can button or the "Add Row" button, respectively), which gives the end user more flexibility when creating new mappings. 

##### Mapping DHIS2 variables to the scaffold

The DHIS2 column of the mapping must be filled with the variables and/or user-defined values that will be mapped to the Go.Data elements in the Go.Data column. It needs to be filled manually by the end user, and for each of the Go.Data variables that we map, we may find one of three cases. 

In the first case, we know that a DHIS2 variable can be mapped to the Go.Data variable (for example, we know that Go.Data's variable "dob" maps to DHIS2's variable "Date of birth"). 

In the second case, we can't find a DHIS2 variable that maps to the Go.Data variable, but we can think of a simple text value that makes sense (for example, we can map Go.Data's variable "deleted" to the text value "false" when we transfer cases from DHIS2 to Go.Data). 

In the third case, no DHIS2 variable or simple text value can be mapped to a Go.Data element (for example, we need to map Go.Data's variable "deletedAt", but we won't be transferring deleted elements: it doesn't make sense to have any kind of value being mapped for this variable!).

Let's see how to deal with each of these cases:

##### Mapping Case 1: It's a match! Go.Data variable maps to DHIS2 variable



When there's a DHIS2 variable that we can match to the Go.Data variable, we need to go to that Go.Data variable's row in the table and click on the blank cell under the DHIS2 column. This will make a pop-up menu appear.

###### Navigating the pop-up
<img
  align="right"
  width="430"
  height="430"
  src="https://user-images.githubusercontent.com/91990504/172206744-0e5c5a85-fb38-4264-b06d-b6f4f6e1c8ae.png">

After clicking on the cell and opening the pop-up menu (like the one in the figure in the right) we need to navigate the choices we are given. 

The drop-down menu on top of the pop-up allows us to choose what kind of mapping we want, giving us three choices: "DHIS2 entities", "DHIS2 properties", and "Constant". Selecting each of these choices will change the set of values we can choose from. "DHIS2 entities" will give us a table containing all the DHIS2 variables that are linked to the type of mapping we selected before (Outbreak, Locations, Cases, etc.). "DHIS2 properties" will contain any variables that we specified in the "Select DHIS2 model" button, if we specified any. "Constant" will give us a text box where we can introduce a text value that we want to map. 

When we have a matching DHIS2 variable, we will want to select "DHIS2 entities" in the first drop-down menu. When "DHIS2 entities" is selected, a second drop down and a table with different DHIS2 variables appear in the pop-up. The second drop down allows us to select what kind of DHIS2 variables we want to see in the table: "Metadata properties" will give us a set of DHIS2 variables related to DHIS2's metadata, "Data elements" will give us the set of DHIS2 Data Elements that are related to the type of mapping we are working on, and "Attributes" will too give us the set of DHIS2 Attributes that are linked to the type of mapping we are working on.

###### Example - "dob"

Let's address the example we spoke about before: The demo GIF below shows how we must proceed when we want to map Go.Data's "dob" variable to DHIS2's "Date of birth" variable, which in DHIS2 is of the Data Element kind. We click on the DHIS2 cell, select "DHIS2 entities" and "Attributes" in the drop-down menus, and then we just click on the desired variable. 

![Mapping-Case1_Itsamatch](https://user-images.githubusercontent.com/91990504/173567298-dc9f6ee6-cf71-45b7-9918-d83180e5c7c9.gif)

###### The Program and Conversion columns

Notice how the "Program" and "Conversion" column values change automatically when we select a DHIS2 variable. 

The value under "Program" indicates us what DHIS2 program was selected when the the DHIS2 variable was chosen. Although this may seem redundant information, the app has been built to ensure maximum flexibility. If a user wanted to create a mapping where variables are taken from two different programs, it would be possible. The "Program" drop-down menu works in a dynamic manner: after filling a part of the mapping with variables from a given DHIS2 program, we can select a different program and keep filling the mapping with variables from this second program. This may not be the most common use case, but it is allowed.

The "Conversion" column indicates what kind of conversion will be performed by the app, also reminding us which kind of  element we introduced in the mapping (a Constant, or a DHIS2 Data Element, Attribute, or Metadata Property).

###### The Values column

The last column of the mapping table is the "Values" column. This is column is designed so that users can pass a dictionary of values for the app to create an intra-variable mapping: sometimes we will find a variable in DHIS2 that can be mapped to a Go.Data variable, but the values inside of the DHIS2 variable need to be transformed so they map the values of the Go.Data variable. 

This dictionary has a JSON format, where the keys correspond to the Go.Data values that we want to modify, and the values assigned to those keys correspond to the DHIS2 values that we want to match with their keys.

We can use the "values" element to pass a series of values that we want to map, and the app will perform a transformation values of the variable.

For example, Go.Data's variable "geographicalLevelId" maps to DHIS2's variable "level". However, there are some values of this variable that we need to map between the two softwares. The location levels in Go.Data are called "Admin Level 0", "Admin Level 1", etc. while in DHIS2 they're called "1", "2", etc. 

To map these values and transform them so that they are compatible within each of the softwares, we need to create a set of key-value pairs where the key of the pair is Go.Data's value to modify, and the value of the pair is the DHIS2 value to modify. This way, when the app finds "0" in DHIS2's "level" variable and it maps it to Go.Data's "geographicalLevelId" variable, it will automatically transform it to "Admin Level 1". This intra-variable mapping is illustrated in figure 5.

![image](https://user-images.githubusercontent.com/91990504/173690183-fb5e7c3e-b504-4e3e-85ff-fec6470b86a0.png)
*__Figure 5__. Diagram illustrating how the Values column serves as a intra-variable mapping to transform the values of a DHIS2 variable to modified values in Go.Data.*

##### Mapping Case 2: Go.Data variable can be mapped to a value

When a Go.Data variable has no matching element in DHIS2, we can give the app a default value to be passed to the variable. This is a very useful tool that can serve to map a variable to some meaningful value, but it can also be used to pass important information to the app. Instead of mapping a DHIS2 variable to the Go.Data variable, we just map that variable to a default value that all the elements being sent from DHIS2 to Go.Data will have for that given variable.

###### Example - "OutbreakId" and "deleted"

Let's take a look at an example of what it looks like when we want to pass constant values to Go.Data. The demo below shows how we can pass important information to the app, such as the case of "OutbreakId", or simply pass a meaningful default value to a variable such as "deleted". 

Filling the Go.Data variable "outbreakId" correctly is very important in the case of Go.Data Case, Go.Data Contact, and Go.Data Contact of Contact mappings. In Go.Data, each case, contact, or contact of contact is linked to a given Outbreak through "outbreakId". In order for the app to know to which outbreak the cases we are passing from DHIS2 to Go.Data should go, we need to pass the correct "outbreakId" in the mapping. 

The demo below shows how to find this outbreakId, and then, it shows how to add it as a "Constant" value in the mapping. After that, it also illustrates how to fill other variables with a default value, such as the Go.Data variable "deleted" being filled with the value "false". Take a look:

![Mapping-Case2_outbreak_deleted](https://user-images.githubusercontent.com/91990504/173615729-814ba837-3682-4f31-95b3-66b80efcf192.gif)

In this case, the "Conversion" value has automatically changed to "Constant" to remind us of what kind of conversion will take place!

##### Mapping Case 3: No DHIS2 variable or Constant value match

Sometimes we will find that no correct DHIS2 variable or constant value can match a Go.Data variable. Some Go.Data variables don't have any kind of equivalent in DHIS2, and at the same time they are not trivial: we can't simply map a constant value to them. 

In this case we can choose a default value to point out that a variable is missing, such as "Unknown" or "Undefined", to remind the user that will work with the Go.Data instance we are creating that a given variable's values are not available. Alternatively, we can leave the DHIS2 completely empty, and instead of a default value, the Go.Data variable will be left blank. 

## Interoperability Tasks
The Interoperability Tasks section is dedicated for managing the data integration tasks. Interoperability Tasks use Metadata Mappings to fetch data from the sender instance, transform it if necessary, and send it to and load it into the receiver instance following the transformations and equivalences set in the mapping. 

Tasks have a series of items that need to be filled before running: “name”, “conversionType”, “senderAPIEndpoint”, “receiverAPIEndpoint”, “converter”, “referenceModel”, “senderAPIParams”, and “sender” elements. 

![Imagen4](https://user-images.githubusercontent.com/91990504/156535781-73d73b27-4d04-4bec-9418-7561c4da982e.png)
*Figure 8. Tasks screen*

### Name
Name with which the task will be saved

### conversionType
Type of the objects in the conversion: Outbreak, Location, Case, Contact, ContactOfContact.

### senderAPIEndpoint
API endpoint of the sender instance. Here we need to introduce the link to the API URL where the data object we want to draw our data from is located. For example, when we want to migrate locations from DHIS2 to Go.Data, we need to introduce the following URL: _host:port/dhis/api/organisationUnits.json_, where we substitute _host_ and _port_ with our DHIS2 instance's host and port. The available data objects in your DHIS2 instance can be consulted by navigating to host:port/dhis/api/resources. 

### receiverAPIEndpoint
API endpoint of the receiver instance. 

- “name” – the  the name of the task
- “conversionType” – type of objects in the conversion (Outbreak, Case, Contact, ContactsOfContact, Location) 
- “senderAPIEndpoint” – API endpoint of sender (http://godata.org/locations) 
- “receiverAPIEndpoint” – API endpoint of sender (http://dhis2.org/locations) 
- “converter” – mapping created in mapping menu for conversion “godata” – “dhis2”
- “referenceModel” – JSON model accepted by the receiving endpoint
- “senderAPIParams” – parameters to be send to sender endpoint, filters=created.eq.”25/11/2021”&paging=false
- “sender” – determines which instance is sender (true – DHIS2, false – Go.Data)









