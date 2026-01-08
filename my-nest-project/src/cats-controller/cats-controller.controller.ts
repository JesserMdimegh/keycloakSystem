import { Controller, Get, Post } from '@nestjs/common';
import { CatsServiceService } from 'src/cats-service/cats-service.service';
import { Cat } from 'src/interfaces/Cat.inteface';

@Controller('cats')
export class CatsControllerController {
    private readonly catsService: CatsServiceService;
    constructor(catsService: CatsServiceService) {
        this.catsService = catsService;
    }
    @Get()
    getCats(): Cat[] {
        return this.catsService.getCats();
    }

    @Post('add')
    addCat(): void {
        const newCat: Cat = { name: 'Whiskers', age: 2, breed: 'Tabby' };
        this.catsService.addCat(newCat);
    }
}
