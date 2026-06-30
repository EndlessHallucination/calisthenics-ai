CREATE TABLE profile (
    id INTEGER PRIMARY KEY DEFAULT 1,

    experience experience_level NOT NULL,

    height_cm INTEGER,
    weight_kg INTEGER,
    age INTEGER,

    days_per_week INTEGER NOT NULL,
    session_duration_minutes INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT single_profile CHECK (id = 1)
);

CREATE TABLE equipment (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE profile_equipment (
    profile_id INTEGER NOT NULL DEFAULT 1,
    equipment_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(id),

    PRIMARY KEY (profile_id, equipment_id)
);

CREATE TABLE skill_progress (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_id INTEGER NOT NULL,
    status skill_status NOT NULL DEFAULT 'active',
    -- active | completed | paused
    started_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);

CREATE TABLE user_milestones (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_progress_id INTEGER NOT NULL,
    milestone_id INTEGER NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    source TEXT,
    -- 'auto_detected' | 'manual_log' | 'ai_assisted'
    FOREIGN KEY (skill_progress_id) REFERENCES skill_progress(id),
    FOREIGN KEY (milestone_id) REFERENCES milestones(id),
    UNIQUE (skill_progress_id, milestone_id)
);