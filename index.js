var express = require("express"),
    expressGraphQL = require("express-graphql"),
    { buildSchema } = require("graphql");

const PORT = process.env.port || 1337;

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        message: String,
        passage: Float,
        cabbage: String
    }
`);

// Root Resolver
var rootResolver = {
    message: () => "Hello World! GraphQL is pretty awesome!",
    passage: () => 999.9999,
    cabbage: () => "MY CABBAGESSSSSSS!!! Reference - The Last Airbender"
};

// Setting up an Express server and associate GraphQL endpoint.
var app = express();
app.use(
    "/graphql",
    expressGraphQL({
        schema: schema,
        rootValue: rootResolver,
        graphiql: true
    })
);

app.listen(PORT, () =>
    console.log(`Express GraphQL server now running at *:${PORT}.`)
);
