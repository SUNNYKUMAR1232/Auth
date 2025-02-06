import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, `../../.env.${env}`);

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Environment: ${env}`);
    console.log(`Loading environment variables from: ${envPath}`);
} else {
    console.error(`Environment file not found: ${envPath}`);
    process.exit(1); // Exit the process with an error code
}