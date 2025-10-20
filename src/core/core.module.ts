import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../app.service';
import { Log, LogSchema } from '../common/schema/blog.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema,
      },
    ]),
  ],
  providers: [AppService],
  exports: [AppService, MongooseModule],
})
export class CoreModule {}


