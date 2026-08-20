/**
 * Nillion SecretVault organisation configuration.
 *
 * The credentials come from the environment. The previous version of this file
 * carried a secret key literally, under a comment that said "in a production
 * environment, make sure to put your org's credentials in environment
 * variables" - advice the file itself did not follow, in a public repository.
 *
 * Copy .env.example to .env and fill it in. .env is gitignored.
 */

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is not set. Copy secretvault/.env.example to secretvault/.env and fill it in.`,
    );
  }

  return value;
}

export const orgConfig = {
  orgCredentials: {
    secretKey: required('NILLION_SECRET_KEY'),
    orgDid: required('NILLION_ORG_DID'),
  },
  // The node set is public infrastructure, not a credential.
  nodes: [
    {
      url: 'https://nildb-zy8u.nillion.network',
      did: 'did:nil:testnet:nillion1fnhettvcrsfu8zkd5zms4d820l0ct226c3zy8u',
    },
    {
      url: 'https://nildb-rl5g.nillion.network',
      did: 'did:nil:testnet:nillion14x47xx85de0rg9dqunsdxg8jh82nvkax3jrl5g',
    },
    {
      url: 'https://nildb-lpjp.nillion.network',
      did: 'did:nil:testnet:nillion167pglv9k7m4gj05rwj520a46tulkff332vlpjp',
    },
  ],
};
