import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [    
    MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.pre("save", async function(next) {
          try {
            if (!this.isModified("password")) {
              return next()
            }
            const hashedPassword = await bcrypt.hash(this["password"], 10);
            this["password"] = hashedPassword;
            return next()
          } catch (error) {
            return next(error)
          }
        })
        return schema;
      },
    },
  ])],
  exports: [MongooseModule]
})
export class UsersModule {}
