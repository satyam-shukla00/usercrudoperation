import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Report } from "./reports/report.entity";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/users.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';


@Module({
    imports:[TypeOrmModule.forRoot({
        type:'sqlite',
        database:'db.sqlite',
        entities:[User,Report],
        synchronize:true,
    }),
    UsersModule,
    ReportsModule,
    ],
    controllers:[],
    providers:[],
})


export class AppModule{}