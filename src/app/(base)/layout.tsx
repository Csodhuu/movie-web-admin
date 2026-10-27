import { Suspense, type ReactNode } from "react";
import { Account, AccountSkeleton } from "./_components/account";
import { Shell } from "./_components/shell";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <Shell
      account={
        <Suspense fallback={<AccountSkeleton />}>
          <Account />
        </Suspense>
      }
    >
      {children}
    </Shell>
  );
}
