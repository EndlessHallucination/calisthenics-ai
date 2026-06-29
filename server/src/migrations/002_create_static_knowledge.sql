CREATE TABLE skills (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name TEXT NOT NULL UNIQUE,

    category skill_category NOT NULL,

    difficulty skill_difficulty NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE milestones (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    skill_id INTEGER NOT NULL,

    sequence INTEGER NOT NULL,
    -- defines progression order (1 → N)

    name TEXT NOT NULL,

    description TEXT,

    hold_time_seconds INTEGER,
    reps_required INTEGER,

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (skill_id) REFERENCES skills(id),

    UNIQUE (skill_id, sequence)
);

CREATE TABLE exercises (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name TEXT NOT NULL UNIQUE,

    category exercise_category NOT NULL,

    equipment TEXT,

    difficulty exercise_difficulty NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE skill_exercises (
    skill_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    purpose skill_exercise_purpose NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (skill_id) REFERENCES skills(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id),

    PRIMARY KEY (skill_id, exercise_id, purpose)
);