import { Module } from '@nestjs/common';
import { CatsControllerController } from 'src/cats-controller/cats-controller.controller';
import { CatsServiceService } from 'src/cats-service/cats-service.service';
import { Cat } from 'src/interfaces/Cat.inteface';

@Module({
      controllers: [CatsControllerController],
      providers: [CatsServiceService]

})
export class CatModule {
}
