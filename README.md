
### Description

This is **`Difference generator`** - a program that determines the difference between two configuration files and provides it to the user in chosen format.

### Requirements

1. Node.js v17.6
2. Windows 10 with WSL / macOS 10.15+ / any Linux distributive.

### Features

* Accepts different configuration file extensions: **`.json`** / **`.yaml`** / **`.yml`**
* Outputs comparison result in different formats: **`stylish`** / **`plain`** / **`json`**

### Settings

Default output format is **`stylish`**
</br>
For another output format, use the flag *-f* or *--format* with values **`plain`** or **`json`**.

### Installation

1. Clone this repository to create a local copy on your computer;  
2. Open your local repository;  
3. Use **`npm install`** and **`sudo npm link`** commands.

## Usage

***
```
gendiff [-h] [-V] [-f] <filepath1> <filepath2>

    Options:
        -h, --help           output usage information
        -V, --version        output the version number
        -f, --format         output format (default: "stylish")
```
***

### Hexlet tests and linter status:

[![Actions Status](https://github.com/gendzmin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/gendzmin/frontend-project-46/actions)
[![Jest and ESLint](https://github.com/gendzmin/frontend-project-46/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/gendzmin/frontend-project-46/actions/workflows/main.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/fb75dbe8d1017952d092/maintainability)](https://codeclimate.com/github/gendzmin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fb75dbe8d1017952d092/test_coverage)](https://codeclimate.com/github/gendzmin/frontend-project-46/test_coverage)