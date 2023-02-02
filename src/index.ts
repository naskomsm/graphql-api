import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { BookResolver } from "./resolvers/BookResolver";

const main = async () => {
    await createConnection();
    const schema = await buildSchema({ resolvers: [BookResolver], validate: false });
    const server = new ApolloServer({
        schema, formatError: (error) => {
            console.log(error);
            return error;
        }
    });
    await server.listen(4000);
    console.log("Server has started!");
}

main();