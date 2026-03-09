-- テーブル作成
CREATE TABLE public.yarns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand_name TEXT,
  color_name TEXT,
  color_code TEXT,
  lot_number TEXT,
  purchase_date DATE,
  purchase_place TEXT,
  price_per_ball NUMERIC,
  weight_g NUMERIC,
  length_m NUMERIC,
  material_text TEXT,
  current_quantity NUMERIC NOT NULL DEFAULT 0,
  memo TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT,
  category_text TEXT,
  started_at DATE,
  completed_at DATE,
  estimated_duration_text TEXT,
  other_materials_text TEXT,
  memo TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.work_yarns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
  yarn_id UUID NOT NULL REFERENCES public.yarns(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(work_id, yarn_id)
);

CREATE TABLE public.work_reference_urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
  title TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER yarns_updated_at BEFORE UPDATE ON public.yarns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER works_updated_at BEFORE UPDATE ON public.works FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER work_reference_urls_updated_at BEFORE UPDATE ON public.work_reference_urls FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS 有効化
ALTER TABLE public.yarns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_yarns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_reference_urls ENABLE ROW LEVEL SECURITY;

-- yarns ポリシー
CREATE POLICY "yarns_select" ON public.yarns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "yarns_insert" ON public.yarns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "yarns_update" ON public.yarns FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- works ポリシー
CREATE POLICY "works_select" ON public.works FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "works_insert" ON public.works FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "works_update" ON public.works FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- work_yarns ポリシー（親 works の user_id で制御）
CREATE POLICY "work_yarns_select" ON public.work_yarns FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_yarns.work_id AND works.user_id = auth.uid())
);
CREATE POLICY "work_yarns_insert" ON public.work_yarns FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_yarns.work_id AND works.user_id = auth.uid())
);
CREATE POLICY "work_yarns_delete" ON public.work_yarns FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_yarns.work_id AND works.user_id = auth.uid())
);

-- work_reference_urls ポリシー（親 works の user_id で制御）
CREATE POLICY "work_reference_urls_select" ON public.work_reference_urls FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_reference_urls.work_id AND works.user_id = auth.uid())
);
CREATE POLICY "work_reference_urls_insert" ON public.work_reference_urls FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_reference_urls.work_id AND works.user_id = auth.uid())
);
CREATE POLICY "work_reference_urls_update" ON public.work_reference_urls FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_reference_urls.work_id AND works.user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_reference_urls.work_id AND works.user_id = auth.uid())
);
CREATE POLICY "work_reference_urls_delete" ON public.work_reference_urls FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.works WHERE works.id = work_reference_urls.work_id AND works.user_id = auth.uid())
);

-- Storage バケット作成
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage ポリシー
CREATE POLICY "images_select" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "images_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "images_update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "images_delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
