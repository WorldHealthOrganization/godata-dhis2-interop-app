# Introduction
The Go.Data-DHIS2 Interoperability App enables metadata to be securely exchanged between [Go.Data](https://www.who.int/tools/godata), an outbreak response tool developed by WHO, and [DHIS2](https://dhis2.org/), a widely used system for national health information management developed by the University of Oslo. This includes bi-directional exchange of reference metadata used across both platforms (i.e. location hierarchies, facility lists); and case/contact data (cases being registered and investigated; and their contacts who are being listed and traced). Such an integration enables field teams to make use of additional visualizations for chains of transmission and contact tracing follow up in Go.Data during an acute outbreak scenario while ensuring key field intel gets reflected back into overarching DHIS2 system. 

# Requirements and compatibilities

The app requires one functioning instance of DHIS2 one of Go.Data from which to exchange data. The app is currently is compatible with Go.Data V40.1 and above (testing to be performed for lower versions), and compatible with DHIS2 versions 2.34 and above. Also, it is currently compatible with the DHIS2 Tracker and Event Capture modules, across all types of Program Attributes and Data Elements.

# Installation 
## How to install the app
Until the app is made available on the DHIS2 App Hub, you can download the GitHub's repository .zip file directly from [WHO Github](https://github.com/WorldHealthOrganization/godata-dhis2-interop-app)'s page for the interoperability app. Then, a .zip file containing the app needs to be built using [Yarn](https://yarnpkg.com/). 

After building and locating the zip resulting from Yarn' build command, go to the App Management app in your DHIS2 instance and upload the .zip file.

# App functionality
## Main functionaty
The app module consists of a main menu from which we can navigate to the four panels of the app where we can set our configuration and perform various actions.

![Screenshot_MainMenu](https://user-images.githubusercontent.com/91990504/161969701-ba9f8cf0-6f08-4cb0-963f-7154113b39b6.png)
*__Figure 1__. View of the main menu with the four different panels.*

1. **Go.Data Configuration panel**: It's used to configure the connection to the Go.Data server with which you want to exchange data with. The user's Go.Data credentials need to be introduced here.
2. **DHIS2 Configuration panel**: It's used to configure the connection to the DHIS2 server. The user's DHIS credentials need to be introduced here for the app to work.   
3. **Metadata Mapping panel**: It's used to create, modify, or delete metadata mappings. For all mappings, and throughout subsequent system development, dot notation is used (a way of accessing JSON objects of any depth).
4. **Interoperability Tasks panel**: It's used to add and manage tasks for data exchange across platforms.


## Bi-directional data schange
At present data exchange is only from DHIS2 to Go.Data. However, two-way data exchange will be incorporated into subsequent versions soon.

# Configuring the app
The app configuration should only need to be done once, at installation time, by your DHIS2 administrator. The person configuring the mapping should be aware of use-cases and metadata collected by both DHIS2 and Go.Data.

Besides the connections to the Go.Data and DHIS2 instances, the app requires the configuration of two types of elements: Metadata Mappings, and Interoperability Tasks

## Connecting the app
### Go.Data Configuration
The app requires your Go.Data instance's URL, and the username and password for your Go.Data user. The credentials are safely encripted and stored in DHIS2's _userDataStore_ according to DHIS2's safety and cybersecurity requirements.

### DHIS2 Configuration
The app requires the username and password for your DHIS2 user. By default, the app keeps '../../..' as a URL placeholder. This placeholder refers to the same server from which we are working, although we could potentially connect to other servers if we want to: the app enables it. In any case, the DHIS2 user and password of the instance that will be used for data transfer need to be introduced. Again, the credentials are safely encripted and stored in DHIS2's _userDataStore_.

## Metadata Mapping
### Mapping Overview
In the Metadata Mapping section's overview screen, we can add, edit, and delete metadata mappings.

Metadata Mappings contain the associations between DHIS2 and Go.Data entities, and they are used by the app to map the data elements from one software to the other. The mappings are built using JSON, a human-readable data format based in key-value pairs. This mapping is necessary because the schemas of DHIS2 and Go.Data can be similar, but they are not fully equivalent. For example, a DHIS2 "organization unit" is called a "Location" in Go.Data. These differences and others need to be addressed in a case-by-case manner.

![MetadataMappingOverview](https://user-images.githubusercontent.com/91990504/161981359-96d753bc-43e0-4bc7-924d-72a2bf01ded8.png)
*__Figure 3__. Metadata Mapping overview screen.*

However, we can load four built-in default mappings, specifically created for the DHIS2 COVID-19 programs, and should allow for automatised transfer. We can load the COVID-19 default programs by clicking on the 'Load default config' button. Any other DHIS2 programs would require the creation of a new mapping.

### Mapping Editor

When we add or or edit a mapping, the mapping editor is opened.  The mapping editor is built using a slightly modified version of React's JSON Viewer, and it enables flexible matching of metadata across the two platforms.

![MetadataMappingEditor](https://user-images.githubusercontent.com/91990504/168812677-09544e36-8978-4049-b2fe-8295f9595c2e.png)
*__Figure 4__. Mapping editor with the default Location mapping open.*

When we create a new mapping, we need to select the type of mapping in the "Form" drop-down menu. Then, we need to give our mapping a meaningful name. When we select the type of mapping that we want to create, the app automatically fetches the Go.Data mapping template for the selected type of mapping from the Go.Data instance. It serves as a scaffold, on top of which which we can add the mapping between each relevant/available Go.Data variable and its equivalent DHIS2 element when possible.

_Note: For creating new Cases and Contacts mappings, the app currently requires that a case or contact exist in the Go.Data instance (respectively). Future versions of the app will avoid this, but for now, before creating a new Cases or Contacts mapping, it's necessary to create a dummy case and/or contact. Make sure to fill all possible case/contact Go.Data attributes when creating the dummies, since the app will only fetch those attributes for which a value has been set._

<img
  align="right"
  width="278"
  height="412"
  src="https://user-images.githubusercontent.com/91990504/161992124-215878ae-5ddd-4b07-832e-78df9efb19b4.png">

A modified version of figure 4 can be consulted in the right. There, the different items have been highlighted to illustrate the structure of the mapping. Note that only a fraction of the mapping is shown. The screenshot reflects a part of the Outbreaks default mapping, which we will use as an example.

The first item (labeled as 0, highlighted green) specifies the type of conversion we are performing. It's automatically set once we have selected the type of mapping in the "Form" drop-down, as explained before. In the example in figure 4, the type "Go.Data Outbreak" is specified. 

The second item (labeled as 1, highlighted in orange) contains a series of items with the elements that we want to convert/map between DHIS2 and Go.Data. This is where the action is. For each of the items in the Go.Data scaffold fetched by the app, we will find three main elements: "godata", "dhis2", and "props". From now on, we will refer to these individual items as mapping items, or items in the mapping.

#### The "godata" element
The "godata" element of each item in the mapping is filled automatically by the app, and it refers to the name of the Go.Data variable that we need to map. 

#### The "dhis2" element, and the "conversion" element
The "dhis2" element behaves in a slightly more complex manner. For each of the mapping items in the scaffold, we need to search for an equivalent DHIS2 field. However, in some cases, there's no adequate match between both software's schemas. For this, the "dhis2" element acts in a dual manner, depending on whether we have an equivalent field or not. Let's look into its two behaviors in the two possible cases:

##### Case 1: It's a match!
When there's a DHIS2 variable that we can match to the Go.Data variable, we need to hover our mouse pointer over the "dhis2" element, and click on the little clipboard icon with an incoming arrow, as indicated in figure 5. In the example in the figure we have a mapping of type "cases", and we will work on mapping the Go.Data mapping item "dob", which stands for date of birth.

![MetadataSelectAVariable](https://user-images.githubusercontent.com/91990504/168819714-3c3e472c-20ca-45cb-a662-7825d72edef8.png)
*__Figure 5__. Mapping a Go.Data variable to DHIS2 variable in the mapping editor.*


Clicking on the clipboard icon will open a pop-up with all the DHIS2 elements that we can map. The contents of this pop-up depend on which kind of mapping we have. We need to locate the DHIS2 variable that we can map to the "godata" element for the item we're currently working on. In this case, we, our DHIS2 instance has an _attribute_ called "Date of birth". By using the browsers' ctrl+F we quickly can locate it quickly. Once located, we need to hover over the "dhis2" element, which contains DHIS2's ID for the _attribute_. This will make the little clipboard icon appear again: we click it, and the DHIS2 element's ID will be copied into the mapping item's "dhis2" element. That's it!

The "conversion" element inside inside of the "props" element will have changed now. When the DHIS2 element that we select is of type _attribute_, the "conversion" element will change to "attr". When the DHIS2 element that we select is of type _data element_, the "conversion" element will change to "delm".

_Note: In some cases, more complex conversions can be carried out by the app. The mapping of Organization Units/Locations involves the use of the "geo" conversion, for example, which transforms the DHIS2's organization unit polygon geometries to point geometries, compatible with Go.Data._

##### Case 2: No variable match
When there is no matching element in DHIS2, we can use the "dhis2" element to give the app a default value for the Go.Data variable. This is a very useful tool that we can use to pass some important information to the app, but it also allows us to introduce empty values in the mapping when there is no logical transformation. 

To introduce a default value, we can hover over the "dhis2" element of the mapping item, and click on the little notepad-with-pencil icon, right by the clipboard icon we spoke about before. This will open a small box in which we can type the value that we want to introduce. 

There are three possible types of values here: a meaninful default value when possible, an empty string when there is no other choice, or an important piece of information. Let's dive into them.

In the first case, we may run into Go.Data items such as "deleted", which have no equivalent in DHIS2's schema, and require us to enter a meaningful default value. In the case of the "deleted" Go.Data variable appearing in the "cases" and "contacts" mapping scaffolds, we need to pass "false" as the default value, since all the cases/contacts that we pass to Go.Data should be taken into account.In the second case, we may run into Go.Data items that have no equivalence, but are not important for our needs. In this case, we can keep the value as an empty string, "". Both cases are illustrated in figure 6.

![MappingMeaningful-emptyDefaults.png](https://user-images.githubusercontent.com/91990504/168836675-0641bde8-3128-461d-a577-2c870216fe26.png)
*__Figure 6__. When no match is possible between Go.Data and DHIS2 variables, three options are available. This figure demonstrates how to carry out the first two options.*

Regardless of what of the cases we're looking at, when we want to use the "dhis2" element to introduce a default value, we need to manually change the "conversion" element to "false", in order to tell the app that there's no match between Go.Data and DHIS2 for the given item, and that we want the value in the "dhis2" element to be used as a default value.

In the third case, we're mostly speaking a very particular element in the mapping: the Go.Data variable "outbreakID" of the "cases" and "contacts" mappings. When cases or contact instances are transferred from DHIS2 to Go.Data, they need to go under an specific outbreak. To tell the app which is the outbreak we want the cases to be transferred to, we need to go to our Go.Data instance and copy the ID of the outbreak we want to fill. 

To get the outbreak ID, go to your Go.Data instance, enter your Outbreaks menu, and open the your outbreak of interest by clicking on "View". The ID is in the link found in your browser bar: it's the alphanumeric, 36-character code containing hyphens right between "...../outbreaks/" and "/view", as highlighted in red in figure 7.

![MappingsOutbreakID](https://user-images.githubusercontent.com/91990504/168828839-5015b276-9e5a-4240-8d51-3a43cfbf2d7b.png)
*__Figure 7__. The Go.Data OutbreakID, located in the browser bar when viewing an specific outbreak.*

Once we have the ID, we need to introduce it in the "outbreakID" mapping item, following the same procedure as in figure 6 (see the "Meaningful default value" section). Don't forget to set the value of "conversion" to "false" too!

#### The "values" element
Inside of the "props" element of each item, and besides the "conversion" element, we also have the "values" element. When we have a matching variable that we can map from Go.Data to DHIS2, sometimes this variable will require some changes to the values that it contains. 

We can use the "values" element to pass a series of values that we want to map, and the app will perform a transformation values of the variable. 

<img
  align="right"
  width="278"
  height="246"
  src="https://user-images.githubusercontent.com/91990504/161996588-31672078-3f97-4f60-8291-2b2ff611485c.png">

To illustrate it, we can look at the example in the right: Go.Data's variable "geographicalLevelId" maps to DHIS2's variable "level". However, there are some values of this variable that we need to map between the two softwares. The location levels in Go.Data are called "Admin Level 0", "Admin Level 1", etc. while in DHIS2 they're called "1", "2", etc. 

To map these values and transform so that they are compatible within each of the softwares, we need to create a set of key-value pairs where the key of the pair is Go.Data's value to modify, and the value of the pair is the DHIS2 value to modify. This way, when the app finds "0" in DHIS2's "level" variable and it maps it to Go.Data's "geographicalLevelId" variable, it will automatically transform it to "Admin Level 1".

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









