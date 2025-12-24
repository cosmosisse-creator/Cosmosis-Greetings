
export interface WishRequest {
  clientName: string;
  industry: string;
  tone: 'professional' | 'creative' | 'heartfelt' | 'witty';
  holidayType: 'New Year' | 'Holiday Season' | 'Thanksgiving';
}

export interface GeneratedWish {
  text: string;
  subjectLine: string;
}
