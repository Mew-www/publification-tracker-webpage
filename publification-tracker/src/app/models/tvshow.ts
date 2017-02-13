import {Publification} from "../interfaces/publification";
import {PublificationType} from "../enums/publification-type";

export class Tvshow implements Publification {
  //Generic publification properties
  public type: PublificationType = PublificationType.TVSHOW;
  public name: string;
  public release_date: Date;
  public genres: Array<string>;
  //Tvshow (TMDB API) specific properties
  private themoviedb_id: Number;
  private original_title: string;
  private original_language: string;
  private overview: string;

  constructor(tmdb_result_object, tvshow_genremap: Array<any>) {
    this.themoviedb_id     = tmdb_result_object.id;
    this.name              = tmdb_result_object.name;
    this.original_title    = tmdb_result_object.original_name;
    this.original_language = tmdb_result_object.original_language;
    this.release_date      = new Date(tmdb_result_object.release_date);
    this.genres            = tmdb_result_object.genre_ids.map(genre_id => {
      return tvshow_genremap.find(x => x.id === genre_id).name;
    });
    this.overview          = tmdb_result_object.overview;
  }

  public getFullName = () => {
    return this.name + (this.original_title && this.name !== this.original_title ? ` (${this.original_title})` : "");
  };
}