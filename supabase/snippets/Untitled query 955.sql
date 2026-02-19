ALTER TABLE public.listing_submissions
    ADD COLUMN reference_code text UNIQUE;

  CREATE OR REPLACE FUNCTION generate_submission_reference_code()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.reference_code := UPPER(SUBSTRING(REPLACE(NEW.id::text, '-', ''), 1, 8));
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trg_listing_submissions_set_reference_code
    BEFORE INSERT ON public.listing_submissions
    FOR EACH ROW EXECUTE FUNCTION generate_submission_reference_code();

  