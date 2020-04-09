const Settings = require('./utils/settings');
const ethers = require('./utils/ethers');

// const getBuyerSettings = () => Settings.getServerSettings('buyer');
// const getSupplier1Settings = () => Settings.getServerSettings('supplier1');
// const getSupplier2Settings = () => Settings.getServerSettings('supplier2');

const main = async () => {
  const senderSettings = await Settings.getServerSettings('sender');
  const recipientSettings = await Settings.getServerSettings('recipient');
  // const supplier2Settings = await Settings.getServerSettings('supplier2');

  await ethers.getProvider(process.env.RPC_PROVIDER);

  if (
    !senderSettings.addresses.OrgRegistry ||
    !senderSettings.addresses.ERC1820Registry ||
    !recipientSettings.addresses.OrgRegistry ||
    !recipientSettings.addresses.ERC1820Registry
  ) {
    console.log(`

      ❌  Note: You have not run the deployment script yet!
      ====================================================
      enter 'npm run deploy' from the radish root directory

    `);
    process.exit(1);
  } else {
    console.log(`

      ✅  Bootstrap deployment already established!
      ====================================================
      only do 'npm run deploy' if you want to refresh the contracts

    `);
    process.exit();
  }
};

main();
