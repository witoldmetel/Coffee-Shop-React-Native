import "../styles/globals.css";

import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import { DashboardLayout } from "~/components";
import { CartManagerProvider } from "~/contexts/CartManagerContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CartManagerProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </CartManagerProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
