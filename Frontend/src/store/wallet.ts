import { createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
interface WalletState {
  address: string | undefined;
  gasFee: string | undefined;
  web3: Web3 | undefined;
}
if (window.ethereum) {
  window.ethereum.request({ method: "eth_requestAccounts" });
}

const initialWalletState: WalletState = {
  address: undefined,
  gasFee: undefined,
  web3: new Web3(window.ethereum),
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletState,
  reducers: {
    setWallet(state, action) {
      state.address = action.payload.address;
      state.gasFee = action.payload.gasFee;
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice.reducer;
