import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (requestOrigin, callback) {
        const whitelist = [process.env.FRONTEND_URL];

        if (process.argv[2] === "--api") {
            whitelist.push(undefined);
        }

        if (whitelist.includes(requestOrigin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
