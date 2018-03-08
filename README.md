# ScienceBase Geographic Search for Alaska & Northwest Canada Landscape Conservation Cooperatives

## Purpose
This project provides a keyword and geographic search against [ScienceBase](https://www.sciencebase.gov/catalog/), 
a federal data catalog hosted by USGS.

This is a React version of the original page hosted within [Data Basin](https://aknwc.databasin.org/sciencebase),
which was developed in collaboration with the Alaska & Northwest Canada Landscape Conservation Cooperatives.

I reimplimented this functionality to give our LCC collaborators the freedom to host this application outside
Data Basin (nothing here requires Data Basin), and have the ability to maintain this application in the future.

## Configuration 
In addition to specific text content in `App.js` would could be customized for other applications, the primary
configuration parameters are stored in `src/config.js`.  These include the default map centerpoint (`MAP_DEFAULT_CENTER`),
default map zoom level (`MAP_DEFAULT_ZOOM`), which could be altered to fit a different geography.  These also include
the default folder ID in ScienceBase to search within (`SB_FOLDER_ID`) and default number of items per page (`ITEMS_PER_PAGE`).

While this project was not specifically designed with additional customization in mind, it should not be hard to customize.
