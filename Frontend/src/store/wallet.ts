import { createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
interface WalletState {
  address: string | undefined;
  gasFee: string | undefined;
  web3: Web3 | undefined;
}

const initialState: WalletState = {
  address: undefined,
  gasFee: undefined,
  web3: undefined,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action) {
      state.web3 = action.payload.web3;
      state.address = action.payload.address;
      state.gasFee = action.payload.gasFee;
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice.reducer;
