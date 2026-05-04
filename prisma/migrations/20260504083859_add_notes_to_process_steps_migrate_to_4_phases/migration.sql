BEGIN;

ALTER TABLE process_steps ADD COLUMN IF NOT EXISTS notes TEXT;

WITH processes_with_progress AS (
  SELECT DISTINCT process_id
  FROM process_steps
  WHERE step BETWEEN 3 AND 7
    AND status IN ('em_andamento', 'concluido')
),
deleted AS (
  DELETE FROM process_steps
  WHERE step BETWEEN 3 AND 7
  RETURNING process_id
),
inserted AS (
  INSERT INTO process_steps (id, process_id, step, status, created_at, updated_at)
  SELECT
    gen_random_uuid(),
    p.process_id,
    3,
    'em_andamento',
    now(),
    now()
  FROM processes_with_progress p
  ON CONFLICT (process_id, step) DO NOTHING
  RETURNING process_id
)
SELECT count(*) FROM inserted;

COMMIT;
