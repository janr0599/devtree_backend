import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin(requestOrigin, callback) {
        if (requestOrigin === "http://localhost:5173") {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
