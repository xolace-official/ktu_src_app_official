select
  cast(postgres_logs.timestamp as datetime) as timestamp,
  event_message,
  parsed.error_severity,
  parsed.user_name,
  parsed.query,
  parsed.detail,
  parsed.hint
from
  postgres_logs
  cross join unnest(metadata) as metadata
  cross join unnest(metadata.parsed) as parsed
where
  regexp_contains(parsed.error_severity, 'ERROR|FATAL|PANIC')
  and parsed.sql_state_code = '42501'
order by timestamp desc
limit 100;
