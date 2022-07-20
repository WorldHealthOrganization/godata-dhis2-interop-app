# App Structure

The app consists of a main menu from which we can navigate to the four panels of the app where we can set our configuration and perform various actions.

![Screenshot\_MainMenu](https://user-images.githubusercontent.com/91990504/161969701-ba9f8cf0-6f08-4cb0-963f-7154113b39b6.png) _**Figure 1**. View of the main menu with the four different panels._

1. **Go.Data Configuration panel**: It's used to configure the connection to the Go.Data server with which you want to exchange data with. The user's Go.Data credentials need to be introduced here.
2. **DHIS2 Configuration panel**: It's used to configure the connection to the DHIS2 server. The user's DHIS credentials need to be introduced here for the app to work.
3. **Metadata Mapping panel**: It's used to create, modify, or delete metadata mappings. For all mappings, and throughout subsequent system development, dot notation is used (a way of accessing JSON objects of any depth).
4. **Interoperability Tasks panel**: It's used to add and manage tasks for data exchange across platforms.

### Metadata Mappings and Interoperability Tasks

The two different elements on which the app is built are Metadata Mappings and Interoperability Tasks. Their main functions and characteristics can be consulted in the following table.

|                              Metadata Mappings                             |                                     Interoperability Tasks                                    |
| :------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|         User-defined mappings between DHIS2 and Go.Data variables.         |                           Tasks are the executable bits of the app.                           |
| They allow the app to understand how to read, transform, and migrate data. | When run, they use a Metadata Mapping to read and transfer data from one software to another. |
|            Must be manually filled, tailored for each use case.            |                      Some parameters need to be set before running them.                      |

Each use case will require that some Metadata Mappings are created to map the elements of the DHIS2 instance in use to the corresponding elements present in Go.Data, and that some Interoperability Tasks are set up to send the data from one instance to another.

There are two sections of this documentation dedicated to explaining how to create and modify both [Broken link](broken-reference "mention") and [Broken link](broken-reference "mention").&#x20;
