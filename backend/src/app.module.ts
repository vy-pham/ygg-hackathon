import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { HttpStatus, Module } from '@nestjs/common'
import { GraphQLModule, registerEnumType } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { GlobalModule } from '@vypham0209/nestjs-common'
import GraphQLJSON from 'graphql-type-json'
import { join } from 'path'
import { PartnerModule } from './partner/partner.module'
import { PartnerService } from './partner/partner.service'
import { QuestManagerModule } from './quest-manager/quest-manager.module'
import { UserModule } from './user/user.module'
registerEnumType(HttpStatus, { name: 'HttpCode' });
@Module({
  imports: [
    MongooseModule.forRoot(global.Config.MONGODB_URI, {
      auth: {
        username: Config.MONGODB_USERNAME,
        password: Config.MONGODB_PASSWORD,
      },
      onConnectionCreate(connection) {
        console.log('connected database');
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: { JSON: GraphQLJSON },
    }),
    GlobalModule.register({
      async init(partnerService: PartnerService) {
        const tenants = await partnerService.partnerMethod.find({});
        console.log(tenants);
        global.tenants.push(...tenants.data.map((o) => o.domain));
      },
      imports: [PartnerModule],
      initInject: [PartnerService],
    }),
    UserModule,
    PartnerModule,
    QuestManagerModule,
  ],
})
export class AppModule {}
