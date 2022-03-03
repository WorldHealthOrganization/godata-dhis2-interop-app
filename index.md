# DHIS2-Go.Data Interoperability App <img src="assets/godata-dhis2-icon.png" align="right" height="260"/> 
A comprehensive guide for end-users.


## Introduction
The Go.Data-DHIS2 Interoperability App enables metadata to be securely exchanged between [Go.Data](https://www.who.int/tools/godata) (an outbreak response tool developed by WHO) and [DHIS2](https://dhis2.org/) (a widely used system for national health information management developed by the University of Oslo). This includes bi-directional exchange of reference medadata used across both platforms (i.e. location hierarchies, facility lists); and case/contact data (cases being registered and investigated; and their contacts who are being listed and traced). Such an integration enables field teams to make use of additional visualizations for chains of transmission and contact tracing follow up in Go.Data during an acute outbreak scenario while ensuring key field intel gets reflected back into overarching DHIS2 system. 

## Requirements
### Which  are the minimum IT requirements for the app to be installed / worked?
This app requires installation of the DHIS2 software and the Go.Data software (see version requirements above). 

### What  versions of Go.Data and DHIS2 is it compatible with?
The current app is compatible with Go.Data V40.1 and above [testing to be performed for lower versions], and compatible with DHIS2 version 2.34 and above.

### What DHIS2  modules is it compatible with?
The current app is compatible with DHIS2 Tracker and Event Capture, across all types of Program Attributes and Data Elements.

## Installation 
### How do I install the app?
Until the app is made available on the DHIS2 App Hub, you can download the .zip file directly from the WHO Github here: https://github.com/WorldHealthOrganization/godata-dhis2-interop-app

Then, go to the App Management app in your DHIS2 instance and upload the .zip file.

## Configuration
### What are the main functionalities within the app?
The app module consists of four main menu options to navigate and a main pane for performing and viewing various actions within the module.

![Imagen1](https://user-images.githubusercontent.com/91990504/156535570-6dc5450e-e2ae-4153-9b78-9e920c6fecfa.png)
*Figure 1. View of module menu system*

1. **Go.Data Server Configuration menu**: used for configuring the connection to the Go.Data server with which you want to exchange data.
2. **Metadata Configuration menu**: used to create, modify, or delete metadata mappings. For all mappings and throughout subsequent system development, dot notation is used (a way of accessing JSON objects of any depth).
3. **Interoperability Tasks menu**: used to add and manage tasks for data exchange across platforms.
4. **Scheduled Task menu**: used to set up and run scheduled tasks at given intervals.

### Does the app enable bi-directional data exchange?
No, at present, data exchange is moving only from DHIS2 to Go.Data. However, this additional functionality will be incorporated into subsequent versions soon.
 
### What is the basic infrastructure of the app?
At present, the entirety of the app configuration is within the “constant” table within the DHIS2 PostgreSQL database. This “constant” table has few columns, and most are designed for storing numeric value. However, the description column is of type “text” and can hold large amount of textual data. Here, the all objects used by module are stored stringified js object notation (JSON) and arrays. 

![Imagen2](https://user-images.githubusercontent.com/91990504/156534998-300c0095-616b-4d6c-aeb5-3abc02cf75d3.png)
*Figure 2. "constant" table of DHIS2 showing "description" column*

This approach provides significant flexibility while retaining a little overhead for validating objects on and from database read/writes. In this way, “description” column of table “constant” of DHIS2 becomes the “nano mongo DB”.  

In the same table, the column “value” was then used to group different object types. For example, value -1000000 is used for configuring Go.Data instance, -1000001 used for mapping of Go.Data metadata with DHIS2 metadata, -1000002 is used for creating tasks. Columns “name” and “shortName” are used for naming created entities. 

Of note,  this infrastructure will be soon moved to Data Store, which was introduced by DHIS2 development team for storing of configuration of a single app and accessible by users, which may be more desirable from an ongoing maintenance perspective.

### How does the app configuration work?
The app configuration should only need to be done once, at the outset, by your DHIS2 administrator. The person configuring the mapping should be aware of use-cases and metadata collected by both DHIS2 and Go.Data.

#### Metadata Configuration
The Metadata configuration section is built with slightly modified version of React JSON Viewer to enable flexible matting of metadata across the platforms regardless of metadata configuration. 

![Imagen3](https://user-images.githubusercontent.com/91990504/156535193-cad7db65-a8cc-46c0-8cff-01a1612dad1b.png)
*Figure 3. Mapping screen*

Pair values JSON are presented with commands. Each command in this editor has specific role of select/add/delete/edit. Select button opens modal with DHIS2 instance of the corresponding Go.Data object instance. While user selects corresponding DHIS2 attribute, it will be linked to pair elements of intermediary JSON object. 

**If there are cases of Go.Data metadata where no corresponding DHIS2 metadata available**, the user can simply add the required value by typing it in. In the example of Outbreak, element “caseIdMask” does not have corresponding DHIS2 element. In this case, user adds “9999999” as value for the “caseIDMask”. There are two types of values: byValue and byReference. ByValue instances simple read DHIS2 “dhis2” element value and byReference reads dot notation from “dhis2” and reads the value from actual object passing dot notation. Result is placed for new instance element. 

#### Scheduled Tasks
The Scheduled Tasks section is dedicated for managing the integration tasks. Tasks are composed of “name”, “conversionType”, “senderAPIEndpoint”, “receiverAPIEndpoint”, “converter”, “referenceModel”, “senderAPIParams” and “sender” elements. 

![Imagen4](https://user-images.githubusercontent.com/91990504/156535781-73d73b27-4d04-4bec-9418-7561c4da982e.png)
*Figure 4. Tasks screen*

- “name” – the  the name of the task
- “conversionType” – type of objects in the conversion (Outbreak, Case, Contact, ContactsOfContact, Location) 
- “senderAPIEndpoint” – API endpoint of sender (http://godata.org/locations) 
- “receiverAPIEndpoint” – API endpoint of sender (http://dhis2.org/locations) 
- “converter” – mapping created in mapping menu for conversion “godata” – “dhis2”
- “referenceModel” – JSON model accepted by the receiving endpoint
- “senderAPIParams” – parameters to be send to sender endpoint, filters=created.eq.”25/11/2021”&paging=false
- “sender” – determines which instance is sender (true – DHIS2, false – Go.Data)


### Is it possible to add new variables to be migrated between DIHS2 and Go.Data?
…..


### Do I need a highly IT trained team to implement and keep running the app?
….


### Could this app be used for other platforms besides DHIS2 and Go.Data?
…..

### Can a scheduler be configured to push data at certain intervals across systems?
Not yet implemented, but will be incorporated into subsequent versions.

### Approximately what volume of case/contact records would this work well for?
More testing is needed, but only limitation would be on side of browser and server capacity side.










