<p align="center">
  <img width="120" height="120" src="https://user-images.githubusercontent.com/91990504/156541241-1010994c-f809-4590-9ff6-635a80c55acd.png">
</p>


# Introduction
The Go.Data-DHIS2 Interoperability App enables metadata to be securely exchanged between [Go.Data](https://www.who.int/tools/godata) (an outbreak response tool developed by WHO) and [DHIS2](https://dhis2.org/) (a widely used system for national health information management developed by the University of Oslo). This includes bi-directional exchange of reference metadata used across both platforms (i.e. location hierarchies, facility lists); and case/contact data (cases being registered and investigated; and their contacts who are being listed and traced). Such an integration enables field teams to make use of additional visualizations for chains of transmission and contact tracing follow up in Go.Data during an acute outbreak scenario while ensuring key field intel gets reflected back into overarching DHIS2 system. 

# Requirements
## Which  are the minimum IT requirements for the app to be installed / worked?
The app requires one functioning instance of DHIS2 one of Go.Data from which to exchange data.

## What  versions of Go.Data and DHIS2 is it compatible with?
The current app is compatible with Go.Data V40.1 and above (testing to be performed for lower versions), and compatible with DHIS2 versions 2.34 and above.

## What DHIS2  modules is it compatible with?
The current app is compatible with the DHIS2 Tracker and Event Capture modules, across all types of Program Attributes and Data Elements.

# Installation 
## How do I install the app?
Until the app is made available on the DHIS2 App Hub, you can download the GitHub's repository .zip file directly from [WHO Github](https://github.com/WorldHealthOrganization/godata-dhis2-interop-app)'s page for the interoperability app. Then, a .zip file containing the app needs to be built using [Yarn](https://yarnpkg.com/). 

After building and locating the zip, go to the App Management app in your DHIS2 instance and upload the .zip file.

# App functionality
## What are the main functionalities within the app?
The app module consists of a main menu from which we can navigate to the four panels of the app where we can set our configuration and perform various actions.

![Screenshot_MainMenu](https://user-images.githubusercontent.com/91990504/161969701-ba9f8cf0-6f08-4cb0-963f-7154113b39b6.png)
*__Figure 1__. View of the main menu with the four different panels.*

1. **Go.Data Configuration panel**: used to configure the connection to the Go.Data server with which you want to exchange data with. The user's Go.Data credentials need to be introduced here.
2. **DHIS2 Configuration panel**: used to configure the connection to the DHIS2 server. By default, the URL placeholder '../../..' refers to the same server from which we are working, although we could potentially connect to other servers. The user's DHIS credentials need to be introduced here for the app to work.   
3. **Metadata Mapping panel**: used to create, modify, or delete metadata mappings. For all mappings, and throughout subsequent system development, dot notation is used (a way of accessing JSON objects of any depth).
4. **Interoperability Tasks panel**: used to add and manage tasks for data exchange across platforms.


## Does the app enable bi-directional data exchange?
No, at present data exchange is only from DHIS2 to Go.Data. However, two-way data exchange will be incorporated into subsequent versions soon.

# Configuring the app
The app configuration should only need to be done once, at installation time, by your DHIS2 administrator. The person configuring the mapping should be aware of use-cases and metadata collected by both DHIS2 and Go.Data.

Besides the connections to the Go.Data and DHIS2 instances, the app requires the configuration of two types of elements: Metadata Mappings, and Interoperability Tasks

## Metadata Mapping
### Mapping Overview
In the Metadata Mapping section's overview screen, we can add, edit, and delete metadata mappings.

Metadata Mappings represent the associations between DHIS2 and Go.Data entities, and they are used by the app to map the data elements from one software to the other. The mappings are built using JSON, a human-readable data format that uses key-value pairs and nested structures. This mapping is necessary because the schemas of DHIS2 and Go.Data can be similar, but not fully equivalent. For example, a DHIS2 "organization unit" is called a "Location" in Go.Data. 

![MetadataMappingOverview](https://user-images.githubusercontent.com/91990504/161981359-96d753bc-43e0-4bc7-924d-72a2bf01ded8.png)
*__Figure 3__. Metadata Mapping overview screen.*

We can load two built-in default mappings by clicking on the 'Load default config' button: one mapping for geographical metadata (Location Mapping), and one for outbreak metadata (Outbreak Mapping). Those two mappings can be seen in figure 3.

### Mapping Editor

When we add or or edit a mapping, the mapping editor is opened.  The mapping editor is built using a slightly modified version of React's JSON Viewer, and it enables flexible matching of metadata across the two platforms.

![MetadataMappingEditor](https://user-images.githubusercontent.com/91990504/161988280-67a42c60-124e-4988-bafb-7e84e7d68ceb.png)
*__Figure 4__. Mapping editor with the default Location mapping open.*

In the mapping editor we must assign a name to our mapping, and we can add, modify, and delete elements in the mapping by hovering the mouse over the different elements and clicking on the buttons that appear, as can be seen in figure 4.

<img
  align="right"
  width="278"
  height="412"
  src="https://user-images.githubusercontent.com/91990504/161992124-215878ae-5ddd-4b07-832e-78df9efb19b4.png">

A modified version of figure 4 can be consulted in the right. There, the different items have been highlighted to illustrate the structure of the mapping. Note that only a fraction of the mapping is shown.

The first item (labeled as 0, highlighted green) inside of the "Outbreak" element specifies the type of conversion we are performing. In the example in figure 4, the type "Go.Data Location" is specified. 

The second item (labeled as 1, highlighted in orange) contains a series of items with the elements that we want to convert/map between DHIS2 and Go.Data. For each of these items we want to convert (like the two items highlighted in yellow), we first specify the entity's name in Go.Data, then we specify the entity's name in DHIS2, and lastly we specify some properties (or "props") regarding this conversion.

#### The "props" element
Inside of the "props" element of each item, we can have two elements. The element "conversion" can be set to values "true" or "false" to tell the app if we need or not to convert this element, respectively. In some cases, "conversion" can be other than those two values to signal that we do want a conversion, but a conversion of a specific type. Sometimes, conversions require a more complex procedure, such as geographical conversions (DHIS2 and Go.Data use different geometries to represent). In these cases, a specific conversion can be set: in the case of geographical conversion, we set "conversion" to "geo".

<img
  align="right"
  width="278"
  height="246"
  src="https://user-images.githubusercontent.com/91990504/161996588-31672078-3f97-4f60-8291-2b2ff611485c.png">

Besides "conversion", inside of the "props" element we can also set a series of values under the "values" element. By doing this, we are not only mapping the names of the two softwares' schemas, but also modifying some of the values inside that schema. 

In the example in the right, we can see how when we map DHIS2's "level" to Go.Data's "geographicalLevelId", we need to map the element's names but also some of the values inside: while the root of the organization unit is labeled "1" in DHIS2, the same concept in Go.Data is labeled "Admin Level 0". By entering those values in the "values" element, we are telling the app to map the different "level" names  and not only the "level" element label.


## Interoperability Tasks
The Interoperability Tasks section is dedicated for managing the integration tasks. Tasks are composed of “name”, “conversionType”, “senderAPIEndpoint”, “receiverAPIEndpoint”, “converter”, “referenceModel”, “senderAPIParams” and “sender” elements. 

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

????? Will have to explain this better! How to get stuff from the api using the link and going from resources. 


# FAQ
## Is it possible to add new variables to be migrated between DIHS2 and Go.Data?
…..


## Do I need a highly IT trained team to implement and keep running the app?
….


## Could this app be used for other platforms besides DHIS2 and Go.Data?
…..

## Can a scheduler be configured to push data at certain intervals across systems?
Not yet implemented, but will be incorporated into subsequent versions.

## Approximately what volume of case/contact records would this work well for?
More testing is needed, but only limitation would be on side of browser and server capacity side.







