export type Yarn = {
  id: string;
  user_id: string;
  name: string;
  brand_name: string | null;
  color_name: string | null;
  color_code: string | null;
  lot_number: string | null;
  purchase_date: string | null;
  purchase_place: string | null;
  price_per_ball: number | null;
  weight_g: number | null;
  length_m: number | null;
  material_text: string | null;
  current_quantity: number;
  memo: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Work = {
  id: string;
  user_id: string;
  name: string;
  image_url: string | null;
  category_text: string | null;
  started_at: string | null;
  completed_at: string | null;
  estimated_duration_text: string | null;
  other_materials_text: string | null;
  memo: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkYarn = {
  id: string;
  work_id: string;
  yarn_id: string;
  created_at: string;
};

export type WorkReferenceUrl = {
  id: string;
  work_id: string;
  title: string | null;
  url: string;
  created_at: string;
  updated_at: string;
};
