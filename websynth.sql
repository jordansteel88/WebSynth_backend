\echo 'Delete and recreate websynth db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE websynth;
CREATE DATABASE websynth;
\connect websynth

\i websynth-schema.sql
\i websynth-seed.sql

\echo 'Delete and recreate websynth_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE websynth_test;
CREATE DATABASE websynth_test;
\connect websynth_test

\i websynth-schema.sql
