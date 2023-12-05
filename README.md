
# Sample Grid Editor package project for hotkey action button

This repository contains a sample project for the Grid Editor Package system containing a hotkey action block. The project can be imported into the currently released Editor version. 

Enabling the package will add a new action block to the action picker dialog. When selected, this will enable the user to choose a hotkey for copy, paste and cut functionality.

## Overview

Packages for the Grid Editor generally consists of two parts:

 - The main JavaScript module containing the logic of the package. The code runs in a NodeJS environment with no special restrictions. The package can communicate with the Editor core through a special interface.
 - A preferences panel window shown in the Preferences pane. The code for the preferences **must** be a single HTML page. This is run in the renderer process of the Electron application. The preferences panel can request a MessagePort to communicate with the NodeJS part of the package.

## Installation

packages are run from the `plugins` folder of the Grid Editor user data folder (by default, found inside the 'Document' folder under `grid-userdata`). Each package can be found inside it's separate folder.

The sample project repository can be directly cloned into the plugins folder. The package should then be shown inside the plugins list in the Preferences window pane.

When developing a package, changes can be seen depending on what is being modified:

 - For the NodeJS module, changes are **only** applied after the Editor is restarted.
 - Changes in the preferences window can be seen after a package disable-enable cycle.

 

