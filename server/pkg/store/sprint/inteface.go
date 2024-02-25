package sprint

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Sprints) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Sprints, error)
	Detail(db *gorm.DB, id string) (*model.Sprints, error)
	Update(db *gorm.DB, id string, e *model.Sprints) error
	Delete(db *gorm.DB, id string) error
}
