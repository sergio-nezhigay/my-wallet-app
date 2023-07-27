# My Wallet App

This repository contains the code for a simple web application called "My Wallet App." The app allows users to interact with the Ethereum blockchain, view their account balance, and perform money transfers. The application is built using React and integrates with the Ethereum blockchain using the Web3.js library.

## Getting Started

To use the "My Wallet App," you need to have MetaMask (a browser extension) installed in your Chrome browser or the equivalent mobile app installed on your mobile device. MetaMask allows the app to connect to the Ethereum blockchain and interact with your Ethereum accounts.

### Prerequisites

1. **Chrome Browser with MetaMask Extension**:

   - Install the MetaMask extension for Chrome by visiting the [Chrome Web Store](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) and following the installation instructions.

2. **Mobile Device with MetaMask App**:

   - If you prefer using a mobile device, install the MetaMask app from the [Google Play Store](https://play.google.com/store/apps/details?id=io.metamask) or the [Apple App Store](https://apps.apple.com/us/app/metamask/id1438144202) and set it up with your Ethereum accounts.

### Running the App

Once you have MetaMask installed and set up:

1. Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/sergio-nezhigay/my-wallet-app.git
   ```

2. Change into the project directory:

   ```
   cd my-wallet-app
   ```

3. Install the required dependencies using npm (Node Package Manager):

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

   The app will now be running on your local server at `http://localhost:3000`.

## Dependencies

The "My Wallet App" relies on the following external libraries and frameworks:

- `React`: A JavaScript library for building user interfaces.
- `Web3`: A JavaScript library that allows interaction with the Ethereum blockchain.
- `Connector`: A custom component to connect the app with the Ethereum blockchain.
- `MoneyTransferForm`: A custom component to handle money transfers.
- `AppContainer`, `Header`, and `Main`: Custom styled components for the app layout.
- `logoSvg`: An SVG image representing the app logo.

## Code Overview

The main functionality of the app is implemented in the `App` component, defined in `App.tsx`. For security reasons, the app relies on MetaMask to provide access to the Ethereum accounts and does not handle sensitive information like private keys.

## Additional Information

For more details about the app and its code, please refer to the source code and the [GitHub repository](https://github.com/sergio-nezhigay/my-wallet-app).

Please note that to use this app, you need to have MetaMask installed on your Chrome browser or the equivalent mobile app installed on your mobile device. MetaMask provides a secure and user-friendly way to manage Ethereum accounts and interact with decentralized applications (dApps) like "My Wallet App." Ensure you are connected to the Ethereum Mainnet or a supported test network within MetaMask to use the app effectively.
