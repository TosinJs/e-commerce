import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import dotenv from "dotenv";
import { User, UserSchema } from './users/schemas/user.schema';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    UsersModule, OrdersModule, ProductsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
