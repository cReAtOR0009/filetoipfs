const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const fs = require("fs");
const dotEnv = require("dotenv").config();

const storage = new ThirdwebStorage({
    secretKey:process.env.SECRET_KEY
});

// console.log(process.env.SECRET_KEY)

(async () => {
  const upload = await storage.upload(fs.readFileSync("check.png"));
  console.log(`Gateway URL - ${storage.resolveScheme(upload)}`);
})();