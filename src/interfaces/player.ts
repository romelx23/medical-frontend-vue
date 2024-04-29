export interface VideoPlaying {
  id: string;
  url: string;
  isPlaying: boolean;
}

export interface VideoList {
  id: string;
  videos: VideoPlaying[];
}
