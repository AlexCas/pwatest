
export interface IndicatorDto {
  id?: string;
  name?: string;
  interval: number;
  order: number;
}

export interface SlideTimeDto {
  name?: string;
  time: number;
}

export interface UpdateIndicatorDto {
  id: string;
  interval: number;
}
