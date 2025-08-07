
CREATE TABLE IF NOT EXISTS services (
    slug VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    price VARCHAR(50),
    originalPrice VARCHAR(50),
    popular BOOLEAN DEFAULT FALSE,
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    metaKeywords TEXT,
    ogImage VARCHAR(255),
    contactButtonText VARCHAR(255),
    contactButtonLink VARCHAR(255),
    readMoreButtonText VARCHAR(255),
    readMoreButtonLink VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
