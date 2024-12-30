import { http, createConfig } from "@wagmi/core";
import { optimismSepolia, neoxMainnet, neoxT4 } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [neoxT4, optimismSepolia, neoxMainnet],
  transports: {
    [neoxT4.id]: http(),
    [optimismSepolia.id]: http(),
    [neoxMainnet.id]: http(),
  },
});
