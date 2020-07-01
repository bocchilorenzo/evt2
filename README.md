# EVT 2.0 (evt-viewer)
[EVT (Edition Visualization Technology)](http://evt.labcd.unipi.it/) is a light-weight, open source tool specifically designed to create digital editions from texts encoded according to the [TEI XML schemas and Guidelines](http://www.tei-c.org/Guidelines/P5/), freeing the scholars from the burden of web programming and enabling the final users to browse, explore and study digital editions by means of a user-friendly interface.

Below you can find some instructions to install and configure the development framework for EVT 2.0 (evt-viewer).
If you need to know *how to use* an EVT Release please read `USER_README.md` instead.

## Dev Environment Prerequisites

You need to preinstall NodeJS (see official documentation). 
Everything works properly with versions up to v8.17.0 (you can use `nvm` in order to have multiple versions of node installed in your device),

## Environment setup

EVT has also dependencies that require ruby and ruby-compass. Below you'll see some instructions that will guide you through the installation of those dependencies. Unfortunately they cannot cover all different operating systems. Thus, if you run into problems try to google them or contact us for help.

### Linux [apt baset distribution]
The following commands assume that you are runinng a distribution with the *apt* package manager.

1. Update the package database (just to be sure that everything's ok)
    ```bash
    sudo apt-get update
    ```
2. Install ruby
    ```bash
    sudo apt-get install ruby-compass build-essential curl
    sudo gem install compass
    ```
[the last one is to do in any case to avoid CSS compilation problems]


### Windows

1. Install ruby. 
Install the latest Ruby version at http://rubyinstaller.org/.
*IMPORTANT: in the installer window select the "Add Ruby executables" options*
Open a shell as administrator, then type:
    ```bash
    gem install compass
    gem install susy
    ```

### OS X
1. Install Homebrew [to do only if you haven't already installed homebrew]

Follow installation instructions at [https://brew.sh](https://brew.sh)

2. Install ruby
    ```bash
    brew install ruby
    sudo gem update --system
    sudo gem install compass
    ```

## Starting the application
1. Clone the repository from github
    ```bash
    git clone https://github.com/evt-project/evt-viewer.git
    ```
2. Move into `evt-viewer` folder
    ```bash
    cd evt-viewer
    ```
3. Install grunt and bower globally (bower v. 1.8.0 is recommended)
    ```bash
    npm install -g bower
    npm install -g grunt-cli
    ```
4. Install dependendencies and devDependencies
    ```bash
    npm install
    ```
    ignore any WARN message, they are harmless
    
    ```bash
    npm install bower
    bower install
    ```
    choose the angular.js version recommended for evt-viewer.

## Start EVT

Before starting EVT check if you have a *data* folder inside *app* where to put you XML file(s); otherwise create it. Then check if in the *app/config/config.json* the property *dataUrl* is pointing to your edition file. If you need, you can also change some of the other configuration parameters.
If you need information about the configuration file, please check the *README.md* within the *app* folder, or use the beta [EVT2-Config-Generator](http://evt.labcd.unipi.it/evt2-config/) to set your preferences and download a ready to use JSON file.
You can also use some ready-to-use xml files and configurations we've added to https://github.com/evt-project/evt-sample-documents (EVT2js folder).

To start EVT use *grunt*
``` bash
grunt dev
```

### Every time you install a new package
Stop *grunt dev* (*CTRL/CMD+C*) then:
```bash
bower install
grunt dev
```

### Every time you checkout to a different branch
If you need to work on a different branch, we recommend that you stop *grunt dev* (*CTRL/CMD+C* in the bash terminal), repeat the steps of dependencies and devDependencie installations and launch again *grunt dev*:
```bash
npm install
bower install
grunt dev
```

## Generate EVT Development Documentation

``` bash
grunt docs
```
This will create a *devDocs* folder.
Open the *index.html* inside this folder in a browser that allows Cross origin requests and navigate the documentation.

## Troubleshooting

### In case of CSS compilation error (especially on Linux)
``` bash
sudo gem install rubygems-update
sudo update_rubygems
sudo apt-get install ruby-dev
sudo gem install compass susy
```

### In case of visualization problems
```bash
grunt dev --force
```

## Build a new EVT release
``` bash
grunt build
```
This will create a *build* folder containing the built package.
Add a *data* folder with the XML files you need and open the index.html file to see your digital edition.
NB: in this case, in order to make EVT work properly in a local environment, you need to use a browser that allows Cross origin requests.

## Branch description

### master
This is the main branch.

### develop
This is the main development branch.

### critical-edition
Branch dedicated to the initial development of functionalities to support critical edition.
This is a closed branch.

### dipl-mobile
Branch dedicated to the development of support for mobile devices.
This is an abandoned branch.

### BRANCHES USED FOR INTERNISHIPS
#### feature/dipl-interp-edLevel
Branch dedicated to the development of functionalities to support diplomatic and interpretative edition levels.

#### feature/msDescription
Branch dedicated to the development of functionalities to support manuscript description access.

#### feature/place-names-map
Branch dedicated to the development of functionalities to support an interactive map of places appearing in Named Entities Places List.

#### feature/search
Branch dedicated to the development of an internal Search Engine.

#### feature/verses
Branch dedicated to the development of the support of prose/verse visualization.

#### feature/viewer-ITL
Branch dedicated to the development of a new Image Viewer and the support for Image Text Linking feature.

### STANBY FEATURE
#### feature/3DHOP-support
Branch dedicated to the test the integration of the tool 3DHOP.
This is a temporarily abandoned branch.

### CLOSED FEATURE
#### feature/bibliography
Branch dedicated to the development of functionalities to support bibliography.
This is a closed branch.

#### feature/critical-edition-2
Branch dedicated to the development of functionalities to support critical edition.
This is a closed branch.

#### feature/documentation
Branch dedicated to the documentation management.
This is a closed branch.

#### feature/localization
Branch dedicated to the development of UI localization.
This is a closed branch.

#### feature/named-entities
Branch dedicated to the development of functionalities to support Named Entities.
This is a closed branch.