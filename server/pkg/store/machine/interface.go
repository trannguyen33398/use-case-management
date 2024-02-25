package machine

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Machines) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Machines, error)
	Detail(db *gorm.DB, id string) (*model.Machines, error)
	Update(db *gorm.DB, id string, e *model.Machines) error
	Delete(db *gorm.DB, id string) error
}
