# Metadata Mappings and Interoperability Tasks

The two different elements on which the app is built are Metadata Mappings and Interoperability Tasks. Their main functions and characteristics can be consulted in the following table.

|                              Metadata Mappings                             |                                     Interoperability Tasks                                    |
| :------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|         User-defined mappings between DHIS2 and Go.Data variables.         |                           Tasks are the executable bits of the app.                           |
| They allow the app to understand how to read, transform, and migrate data. | When run, they use a Metadata Mapping to read and transfer data from one software to another. |
|            Must be manually filled, tailored for each use case.            |                      Some parameters need to be set before running them.                      |

Each use case will require that some Metadata Mappings are created to map the elements of the DHIS2 instance in use to the corresponding elements present in Go.Data, and that some Interoperability Tasks are set up to send the data from one instance to another.

The following sections are dedicated to explaining how to create and modify both Metadata Mappings and Interoperability Tasks.&#x20;

##
