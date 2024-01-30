export interface Category {
  category?: string;
  _id?: string;
  categoryImage?: string;
  categoryRank?: number;
  createdAt?: string;
  status?: string;
}

export interface SubCategory {
  topicName?: string;
  _id?: string;
}

export interface headerMain {
  showHeaderClass?: string;
  categories?: Category[];
}
