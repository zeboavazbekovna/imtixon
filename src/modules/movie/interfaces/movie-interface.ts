export interface MovieInterface {
    id: number;
    title: string;
    description?: string;
    release_date?: string;
    duration: string;
    is_premium?: boolean;
    image?: Express.Multer.File;
    video?:  Express.Multer.File;
    category_id: string;
  }
  