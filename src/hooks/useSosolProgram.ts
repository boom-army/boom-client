import { useAccountsContext } from "./../contexts/accounts";

export function useSosolProgram() {
  const context = useAccountsContext();
  return {
    sosolProgram: context.sosolProgram,
  };
}
