import { Controller, Get, Post, Body } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { PostJokeModel } from './model/post-joke-model';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  postJoke(@Body() postJokeModel: PostJokeModel) {
    return this.jokesService.postJoke(postJokeModel);
  }

  @Get()
  getJoke() {
    return this.jokesService.getJoke();
  }
}
