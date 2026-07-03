import "dotenv/config";
import { PrismaClient } from "../../prisma/generated/client/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
export declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../../prisma/generated/client/runtime/client.js").DefaultArgs>;
//# sourceMappingURL=prisma.d.ts.map