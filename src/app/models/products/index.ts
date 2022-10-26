import { FieldValue } from "firebase/firestore";
export interface Product {
  id:   number;
  description:   string;
  rich_description: string;
  image:     string;
  brand:        string;
  price:        number;
  category:     string;
  rating:       string;
  is_featured:  string;
  user_updated: string;
  date_created: FieldValue;
  date_updated: FieldValue;
  imageUrls: Images[];
}

export interface Images {
  url: string;
  description: string;
}
