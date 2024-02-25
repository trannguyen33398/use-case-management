package process

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Processes) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Processes, error)
	Detail(db *gorm.DB, id string) (*model.Processes, error)
	Update(db *gorm.DB, id string, e *model.Processes) error
	Delete(db *gorm.DB, id string) error
}
