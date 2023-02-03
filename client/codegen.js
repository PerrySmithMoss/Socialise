const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

module.exports = {
  overwrite: true,
  schema: `${process.env.SERVER_URL}/graphql`,
  documents: "graphql/*.graphql",
  generates: {
    "graphql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
      },
    },
    // "./graphql.schema.json": { plugins: ["introspection"] },
  },
};
