package serviceLine

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.ServiceLines) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.ServiceLines, error)
	Detail(db *gorm.DB, id string) (*model.ServiceLines, error)
	Update(db *gorm.DB, id string, e *model.ServiceLines) error
	Delete(db *gorm.DB, id string) error
}
