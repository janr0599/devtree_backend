import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin(requestOrigin, callback) {
        if (requestOrigin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
