const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const fs = require("fs");

const storage = new ThirdwebStorage({
    secretKey:process.env.SECRET_KEY
});

(async () => {
  const upload = await storage.upload(fs.readFileSync("check.png"));
  console.log(`Gateway URL - ${storage.resolveScheme(upload)}`);
})();