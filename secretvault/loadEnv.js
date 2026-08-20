/**
 * Loads secretvault/.env into process.env.
 *
 * This is its own module and imported before nillionOrgConfig because ES module
 * imports are hoisted: calling dotenv.config() inline at the top of an entry
 * point would still run *after* the config module had already been evaluated
 * and thrown for missing credentials.
 */
import 'dotenv/config';
