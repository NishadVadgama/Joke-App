import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PostJokeModel } from './model/post-joke-model';
import { APIJokeModel } from './model/api-joke-model';
import { GetJokeModel } from './model/get-joke-model';

@Injectable()
export class JokesService {
  constructor(private readonly httpService: HttpService) {}

  // Post joke
  async postJoke(postJokeModel: PostJokeModel): Promise<GetJokeModel> {
    // Fetch joke from API
    const jokeFromAPI: APIJokeModel = await this.fetchJoke();
    console.log(jokeFromAPI);

    // Split joke in to array by space
    const joke = `${jokeFromAPI.question} ${jokeFromAPI.punchline}`.split(' ');

    // Replace/Remove joke word on given position
    joke[postJokeModel.number] = postJokeModel.replacement;

    // Return joke
    return {
      joke: joke
        .reduce((accumulator, currentValue) => {
          if (currentValue !== '') {
            return `${accumulator} ${currentValue}`;
          }
          return accumulator;
        })
        .trim(),
    };
  }

  // Get joke
  async getJoke(): Promise<GetJokeModel> {
    const jokeFromAPI: APIJokeModel = await this.fetchJoke();
    return { joke: `${jokeFromAPI.question} ${jokeFromAPI.punchline}` };
  }

  // Fetch joke
  async fetchJoke(): Promise<APIJokeModel> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<APIJokeModel[]>(
          'https://backend-omega-seven.vercel.app/api/getjoke',
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data.shift();
  }
}
