interface Alarm {
  notificationId: number;
  message: string;
  category: string;
  emergency: boolean;
  isCompleted: boolean;
  date: string;
  image: string | null;
}
