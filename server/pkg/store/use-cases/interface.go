package useCases

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.UseCases,) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.UseCases, error)
	Detail(db *gorm.DB, id string) (*model.UseCases, error)
	Update(db *gorm.DB, id string, e *model.UseCases) error
	Delete(db *gorm.DB, id string) error
}
