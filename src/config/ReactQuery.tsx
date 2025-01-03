import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    },
  },
});

export const ReactQueryWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
