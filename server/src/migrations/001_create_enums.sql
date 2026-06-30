CREATE TYPE skill_category AS ENUM ('pulling', 'pushing', 'handstand', 'misc');
CREATE TYPE skill_difficulty AS ENUM ('beginner', 'intermediate', 'advanced', 'elite');
CREATE TYPE skill_status AS ENUM ('active', 'paused', 'completed');
CREATE TYPE exercise_category AS ENUM ('pulling', 'pushing', 'handstand', 'core', 'mobility', 'misc');
CREATE TYPE exercise_difficulty AS ENUM ('beginner', 'intermediate', 'advanced', 'elite');
CREATE TYPE skill_exercise_purpose AS ENUM ('progression', 'accessory', 'mobility', 'strength', 'warmup');
