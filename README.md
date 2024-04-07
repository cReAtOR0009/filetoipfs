# Project Title

Uploading Files to IPFS With CREATOR

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [Usage](#usage)
  - [Uploading Files](#uploading-files)
  - [Obtaining the Public Link](#obtaining-the-public-link)
- [Additional Information](#additional-information)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project demonstrates how to upload files to IPFS (InterPlanetary File System) and obtain the public link to the pinned file. The project utilizes Express.js for the backend server, Multer for handling file uploads, and ThirdwebStorage for interacting with IPFS, it also uses vite for frontend, xhr for sending request to server and packages like react-toastify, react-dropzone were also used.

## Getting Started

Instructions for setting up and running the project on a local machine.

### Prerequisites

List of prerequisites required to run the project.

- Node.js installed on your machine
- npm or yarn package manager

### Installation

Clone the repository to your local machine:

`````npm install

Navigate to the project directory:
```cd <project-directory>
Install the dependencies:
```npm install
OR
```yarn install

### Installation

-Create a .env file in the root directory of the project.
-Add the following environment variables to the .env file:

```PORT=3000
```SECRET_KEY=<your-secret-key>

Replace <your-secret-key> with your secret key for ThirdwebStorage.

Running the Server
To run the server, execute the following command:
````npm start
or
````yarn start
The server will start running on port 3000 by default.
`````

Uploading Files
To upload a file to IPFS, send a POST request to the /upload endpoint with the file attached as form data. You can use tools like axios, raw HTTP or Postman for sending HTTP requests.

Example cURL command:

xhr.open("POST", "https://creatoz-ipfs.onrender.com/upload");


Obtaining the Public Link
Once the file is successfully uploaded, the server will respond with the public IPFS URL of the pinned file. You can then use this URL to access the file on IPFS by copying it on the frontend.

Additional Information
This project is for demonstration purposes and may require additional configuration or customization for a more custom use
For more information on IPFS, visit the official IPFS documentation.
