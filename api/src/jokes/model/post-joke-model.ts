import { Min, Max, Matches } from 'class-validator';
export class PostJokeModel {
  @Min(0, {
    message: 'Number should be greater then 0',
  })
  @Max(10, {
    message: 'Number should be less then 10',
  })
  number: number;

  @Matches(/^[a-zA-Z]{0,10}$/, {
    message: 'Replacement should only contain a-z A-Z',
  })
  replacement: string;
}
