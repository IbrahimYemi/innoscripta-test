export interface SliderProps<T> {
  data: T[];
  animationDuration: number;
  CardComponent: React.FC<T>;
  cardStyle: string;
}
