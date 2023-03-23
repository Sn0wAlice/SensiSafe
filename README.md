# SensiSafe

![](https://github.com/Sn0wAlice/SensiSafe/blob/main/public/banned.jpg?raw=true)

SensiSafe is an API for detecting inappropriate content on the Internet, specialized in detecting upload of pornographic content by users. It uses machine learning algorithms to analyze images uploaded to a website and identify those that contain inappropriate content. The SensiSafe API can be easily integrated into an existing website to enhance user security and protection from pornographic content. It also allows site owners to control their content and act quickly in the event of a breach of the site’s terms and conditions of use. SensiSafe is an innovative solution to improve online security and protect users of all ages from unwanted content.

## How to install 
- First, make sure that Node.js is installed on your system. To check if Node.js is already installed, open a console and type `node -v`. If you get a version of Node.js, you are ready to go to the next step. Otherwise, you will need to install Node.js.
- Once you have Node.js installed, open a console and navigate to your project directory.
- Then run the command `npm i' to initialize a new Node.jss project. This command will install the modules on your machine
- Set up your service: 
  - Change the port: in main.js (default: 3000)
  - Change the ban image `public/banned.jpg`

## Run
Use [pm2](https://pm2.io/docs/runtime/overview/) to run the script on your backend server

## API
| URL | Description | body |
| :-- | :---------- | :--- |
| `/api/detect` | Allows to recover a JSON in order to process the raw data of the api | "file -> picture_to_analyse"|
| `/api/cadre` | Allows to create a frame with a description of everything that is detected by the system | "file -> picture_to_analyse"|
| `/api/blur` | Returns the censored image if necessary or original if no censorship has been applied | "file -> picture_to_analyse"|
| `/api/ban` | Returns the "banned" image if needed or original if no pornographic content has been applied | "file -> picture_to_analyse"|

## Example
All example are available in `./examples/`


## Contributors
- [Sn0wAlice](https://github.com/Sn0wAlice)
- [Lemon 42](https://github.com/lemon-42)

> Script based on the MASTER PEACE OF [this code](https://github.com/vladmandic/nudenet) ❤️
