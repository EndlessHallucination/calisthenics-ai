
CREATE TABLE routines (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    skill_progress_id INTEGER NOT NULL,

    version INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (skill_progress_id)
        REFERENCES skill_progress(id)
);


CREATE TABLE routine_exercises (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    routine_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,

    order_index INTEGER NOT NULL,

    sets INTEGER,
    reps INTEGER,
    hold_time_seconds INTEGER,
    rest_seconds INTEGER,

    FOREIGN KEY (routine_id)
        REFERENCES routines(id),

    FOREIGN KEY (exercise_id)
        REFERENCES exercises(id),

    UNIQUE (routine_id, order_index)
);


CREATE TABLE workouts (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    skill_progress_id INTEGER NOT NULL,

    workout_date DATE NOT NULL,
    duration_minutes INTEGER,
    notes TEXT,

    FOREIGN KEY (skill_progress_id)
        REFERENCES skill_progress(id)
);

CREATE TABLE workout_exercises (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    workout_id INTEGER NOT NULL,
    routine_exercise_id INTEGER NOT NULL,

    actual_sets INTEGER,
    actual_reps INTEGER,
    actual_hold_time_seconds INTEGER,

    completed BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (workout_id)
        REFERENCES workouts(id),

    FOREIGN KEY (routine_exercise_id)
        REFERENCES routine_exercises(id),

    UNIQUE (workout_id, routine_exercise_id)
);