# Running a Task

A task has been configured, it can be run from the main Interoperability Tasks page as figured below.

![](<../.gitbook/assets/image (1).png>)

The different types of Interoperability Tasks need to be run in a specific order: this is because some of the elements being transfered from DHIS2 to Go.Data are interconnected. For example, Go.Data Outbreaks reference Go.Data Locations, for which Locations need to be passed to the Go.Data instance before any Outbreak is created.

To know in which order the different the different tasks need to be executed, please read the[data-interoperability-pipeline.md](../quick-user-guide/data-interoperability-pipeline.md "mention") section, a quick end-user guide that explains in which order we need to run Interoperability Tasks once they have been configured, together with their respective Metadata Mappings.&#x20;
