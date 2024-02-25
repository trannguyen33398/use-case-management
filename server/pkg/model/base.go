package model

import (
	"time"
)

// BaseModel base model for domain type
type BaseModel struct {
	ID        UUID            `sql:",type:uuid" json:"id" gorm:"default:uuid()"`
	CreatedAt time.Time       `sql:"default:now()" json:"createdAt"`
	UpdatedAt time.Time      `sql:"default:now()" json:"updatedAt"`
}

