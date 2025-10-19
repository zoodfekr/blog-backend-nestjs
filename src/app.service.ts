import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './common/schema/blog.schema';
import { Model } from 'mongoose';
import { LogDto } from './blog/dto/log.dto';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Log.name) private readonly LogModel: Model<Log>,
  ) { }



  //? ذخیره لاگ ها در دیتابیس
  async log(prop: LogDto) {
    const newlog = new this.LogModel(prop)
    await newlog.save()
    return newlog
  }


}
