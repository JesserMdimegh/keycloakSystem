import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CreateAuthorUseCase } from "src/application/uses-cases/create-author.usecase";
import { ListAuthorUseCase } from "src/application/uses-cases/list-author.usecase";
import { GetAuthorByIdUseCase } from "src/application/uses-cases/get-author-by-id.usecase";
import { UpdateAuthorUseCase } from "src/application/uses-cases/update-author.usecase";
import { DeleteAuthorUseCase } from "src/application/uses-cases/delete-author.usecase";
import { CreateAuthorDto } from "../../application/dto/create-author.dto";
import { UpdateAuthorDto } from "../../application/dto/update-author.dto";
import { Author } from "src/domain/entities/Author.entity";

@Controller('authors')
export class AuthorController {
    constructor(
        private readonly createAuthorUseCase: CreateAuthorUseCase,
        private readonly listAuthorUseCase: ListAuthorUseCase,
        private readonly getAuthorByIdUseCase: GetAuthorByIdUseCase,
        private readonly updateAuthorUseCase: UpdateAuthorUseCase,
        private readonly deleteAuthorUseCase: DeleteAuthorUseCase,
    ) {}

    @Get()
    findAll(): Promise<Author[]> {
        return this.listAuthorUseCase.execute();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Author | null> {
        return this.getAuthorByIdUseCase.execute(id);
    }

    @Post()
    create(@Body() dto: CreateAuthorDto): Promise<Author> {
        return this.createAuthorUseCase.execute(dto.name);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateAuthorDto): Promise<Author> {
        return this.updateAuthorUseCase.execute(id, dto.name);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.deleteAuthorUseCase.execute(id);
    }
}
