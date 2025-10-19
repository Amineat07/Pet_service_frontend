import { atom } from "jotai";

export const isLoggedInAtom = atom(false);
export const bearertokenAtom = atom("");

export const firstnameAtom = atom("");
export const lastnameAtom = atom("");
export const user_emailAtom = atom("");
export const isCustomerAtom = atom(false);
export const isServiceProviderAtom = atom(false);

export const userAtom = atom<{
  first_name: string;
  last_name: string;
  email: string;
  is_customer: boolean;
  is_servive_provider: boolean;
} | null>(null);
