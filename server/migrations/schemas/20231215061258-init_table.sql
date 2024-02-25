
-- +migrate Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS communication_streams (    
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    active BOOLEAN NOT NULL,
    responsible_person VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_case_cluster (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_use_case_cluster foreign key (parent_id) references use_case_cluster (id)
);

CREATE TABLE IF NOT EXISTS systems(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	parent_id UUID,
	category VARCHAR(100) NOT NULL,
	tool_name VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	active BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT FK_systems foreign key (parent_id) references systems (id)
);

CREATE TABLE  IF NOT EXISTS service_lines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    responsible_person VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_service_lines foreign key (parent_id) references service_lines (id)
);

CREATE TABLE IF NOT EXISTS risks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    priority integer NOT NULL,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_risks foreign key (parent_id) references risks (id)
);


CREATE TABLE IF NOT EXISTS processes(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    type VARCHAR(255) NOT NULL,
    focus_field BOOLEAN,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT PROCESSES_TYPE CHECK (type IN ('RUBBER' , 'METAL' , 'PLASTIC' , 'ASSEMBLY')),
    CONSTRAINT FK_processes foreign key (parent_id) references processes (id)
);

CREATE TABLE IF NOT EXISTS  plants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    operations_cluster VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    name_abbreviation VARCHAR(255) NOT NULL,
    segment TEXT[],
    zebra BOOLEAN,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT PLANTS_TYPE CHECK (type IN ('PLANT' , 'BUSINESS AREA')),
    CONSTRAINT SEGMENT CHECK(segment <@ ARRAY['TS', 'DTS','ERS', 'AVS','PSS']),
    CONSTRAINT FK_plants foreign key (parent_id) references plants (id)
);

CREATE TABLE IF NOT EXISTS machines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    priority integer,
    description VARCHAR(255),
    status VARCHAR(255),
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT MACHINES_STATUS CHECK (status IN ('NOT STARTED', 'STARTED', 'FINISHED','')),
    CONSTRAINT FK_machines foreign key (parent_id) references machines (id)
);

CREATE TABLE IF NOT EXISTS use_cases (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    standard_parent_id UUID,
    process_parent_id UUID,
    process_id UUID NOT NULL,
    plant_id UUID NOT NULL,
    priority integer,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description_rating VARCHAR(50) NOT NULL,
    responsible_person VARCHAR(255) NOT NULL,
    collected_at TIMESTAMP,
    target_definition TEXT NOT NULL,
    major_issue_definition TEXT NOT NULL,
    relevant_tags TEXT,
    blocking_points TEXT,
    comments TEXT,
    project_name VARCHAR(255),
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    CONSTRAINT USE_CASES_TYPE CHECK (type IN ('PLANT_PROCESS_GROUP', 'PLANT_STANDARD_GROUP', 'SINGLE_ELEMENT','STANDARD_GROUP', 'PROCESS_GROUP')),
    CONSTRAINT USE_CASES_CATEGORY CHECK (category IN ('CROSS_PROCESS', 'PER_PROCESS', 'UNIQUE','GROUP')),
    CONSTRAINT USE_CASES_DESCRIPTION_RATING CHECK (description_rating IN ('UNNECESSARY', 'SUFFICIENT', 'INSUFFICIENT')),
    CONSTRAINT FK_USE_CASES foreign key (standard_parent_id) references use_cases (id),
    CONSTRAINT FK_process_parent foreign key (process_parent_id) references processes (id ),
    CONSTRAINT FK_process foreign key (process_id) references processes (id),
    CONSTRAINT FK_plant foreign key (plant_id) references plants (id)
);

CREATE TABLE IF NOT EXISTS use_cases_to_systems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    system_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_system foreign key (system_id) references systems (id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_cases_to_use_case_clusters (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    use_case_cluster_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_use_case_cluster foreign key (use_case_cluster_id) references use_case_cluster (id ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_cases_to_risks (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    risk_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_risk foreign key (risk_id) references risks (id ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(use_cases_id,risk_id)
);


CREATE TABLE IF NOT EXISTS use_cases_to_machines (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    machine_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_machine foreign key (machine_id) references machines (id ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_cases_to_service_lines (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    service_line_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_service_line foreign key (service_line_id) references service_lines (id ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_cases_blocking_points_to_service_lines (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    service_line_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_service_line foreign key (service_line_id) references service_lines (id ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_cases_to_communication_streams ( 
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    communication_stream_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    use_cases_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ON DELETE CASCADE,
    CONSTRAINT FK_communication_stream foreign key (communication_stream_id) references communication_streams (id ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS benefit_categories(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    description TEXT NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_benefit_categories foreign key (parent_id) references benefit_categories (id)
);

CREATE TABLE IF NOT EXISTS benefits(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    type VARCHAR(4),
    sprint_id VARCHAR(36),
    sprint_status VARCHAR(50),
    calculation_input TEXT NOT NULL,
    savings FLOAT NOT NULL,
    comments TEXT,
    reliability TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_benefits foreign key (parent_id) references benefits (id),
    CONSTRAINT TYPE CHECK(type in ('HARD','SOFT')),
    CONSTRAINT RELIABILITY CHECK(reliability <@ ARRAY['ESTIMATION','EXPERIENCE','CALCULATION'])
);


CREATE TABLE IF NOT EXISTS benefits_to_use_cases (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    benefits_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    benefits_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id),
    CONSTRAINT FK_benefit foreign key (benefits_id) references benefits (id ) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS benefits_to_benefit_categories (
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    benefit_category_id UUID NOT NULL,
    benefits_id UUID NOT NULL,
    benefits_type VARCHAR(50),
    CONSTRAINT FK_BENEFIT_CATEGORIES foreign key (benefit_category_id) references benefit_categories (id),
    CONSTRAINT FK_benefit foreign key (benefits_id) references benefits (id ) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bundles(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bundles_to_use_cases(
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    bundles_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    bundles_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id) ,
    CONSTRAINT FK_bundle foreign key (bundles_id) references bundles (id ) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sprints (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bundle_Id UUID NOT NULL,
    planned_from TIMESTAMP NOT NULL,
    planned_to TIMESTAMP NOT NULL,
    step  INTEGER NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    development_status VARCHAR(50),
    iteration_status VARCHAR(50),
    implementation_status VARCHAR(50),
    handover_status VARCHAR(50),
    implemented_at TIMESTAMP,
    documents TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT STATUS CHECK (status IN ('NOT STARTED', 'STARTED', 'FINISHED')),
    CONSTRAINT DEVELOPMENT_STATUS CHECK (development_status IN ('NOT STARTED', 'STARTED', 'FINISHED','')),
    CONSTRAINT ITERATION_STATUS CHECK (iteration_status IN ('NOT STARTED', 'STARTED', 'FINISHED','')),
    CONSTRAINT HANDOVER_STATUS CHECK (handover_status IN ('NOT STARTED', 'STARTED', 'FINISHED',''))
);

CREATE TABLE IF NOT EXISTS sprints_to_use_cases(
    id UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
    sprints_id UUID NOT NULL,
    use_cases_id UUID NOT NULL,
    sprints_type VARCHAR(50),
    CONSTRAINT FK_USE_CASES foreign key (use_cases_id) references use_cases (id),
    CONSTRAINT FK_sprint foreign key (sprints_id) references sprints (id )ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- +migrate StatementBegin


-- +migrate StatementEnd

-- +migrate Down